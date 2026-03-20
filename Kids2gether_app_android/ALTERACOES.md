# Alterações (Kids2Gether)

Este arquivo documenta mudanças feitas no app, incluindo o problema observado e como foi corrigido.

---

## 2025-12-15 — Imagem do card de Novidades não aparecia

### Sintoma
- Na Home, na seção **Novidades**, o card renderizava o texto (título do post), mas a imagem de fundo não aparecia.

### Causa
- O card estava usando a URL do Yoast (`yoast_head_json.og_image[0].url`) como fonte da imagem.
- Para alguns posts, o Yoast retornava uma URL com host em IP (ex.: `https://35.169.214.188/...`).
- Em Android/React Native, esse tipo de URL frequentemente falha (ex.: mismatch de certificado/host, bloqueios de rede), então o `ImageBackground` não conseguia baixar a imagem.

### Como foi diagnosticado
- Confirmamos via WordPress REST API que existiam duas URLs possíveis para a mesma imagem:
  - `yoast_head_json.og_image[0].url` apontando para o host em IP.
  - `_embedded['wp:featuredmedia'][0].source_url` apontando para `https://www.kids2gether.com.br/...`.

### Correção
- Mudamos a origem da imagem do card para **preferir featured media** vindo do `_embed=1`:
  1. Primeiro tenta `_embedded['wp:featuredmedia'][0].source_url`.
  2. Se não existir, cai para `yoast_head_json.og_image[0].url`.

### Arquivo alterado
- src/screens/Home/components/news.jsx

### Observações
- Para garantir que `_embedded['wp:featuredmedia']` exista, o endpoint de posts na Home precisa incluir `_embed=1` (o app já usa `_embed=1` na busca das Novidades).
- Se a imagem continuar em branco após a correção, limpar cache do Metro/Expo costuma resolver (ex.: iniciar com cache limpo).

---

## 2025-12-18 — Destinos (Praia/Neve/Urbano…) abriam “vazio”

### Sintoma
- Ao clicar em **Destinos → Praia/Neve/Urbano/…**, a tela não mostrava nenhum conteúdo (tela “vazia”).

### Causa
- O app ainda buscava “locais” (destinos internos) pelo endpoint antigo do WordPress:
  - `GET /wp-json/wp/v2/local?filter[meta_key]=tipo&filter[meta_value]=...`
- Esse endpoint/modelo antigo não retornava mais os dados necessários (mudança estrutural no WordPress).
- Além disso, a tela só renderizava a lista quando `data.length > 0`, então quando a API vinha vazia o usuário via uma tela em branco (sem estado vazio/carregando).

### Modelo atual no WordPress (como o app passa a interpretar)
- **Categorias (taxonomy `category`)** representam os “tipos” de destino: Praia, Neve, Urbano, etc.
  - Exemplos de IDs (WordPress): Praia=130, Neve=121, Urbano=127, Exótico=139, Resort=133, Parque=146, Aventura=128, Viagem Virtual=143.
- **Tags (taxonomy `post_tag`)** representam os “locais” (ex.: Búzios, Caraíva, Miami…).

Ou seja, dentro de uma categoria (ex.: Praia), os posts são “artigos” e as tags desses posts representam os locais que precisam aparecer na lista.

### Como foi diagnosticado
- Validamos que os posts existem por categoria usando o header `X-WP-Total` do WordPress REST:
  - `GET /wp-json/wp/v2/posts?categories=<id>&per_page=1&_embed=1` retorna totais > 0 para várias categorias.
- Validamos que filtrar por `local=` não funciona, mas por `tags=` funciona:
  - `...&local=<tagId>` retorna total 0
  - `...&tags=<tagId>` retorna total > 0

### Correção (implementação)

#### 1) Tela de categoria (ex.: Praia)
Arquivo: `src/screens/Category/index.jsx`

**Objetivo:** mostrar a lista de locais (tags) existentes dentro da categoria.

**Passos de implementação:**
1. **Mapear IDs antigos → IDs do WordPress**
   - O app ainda navega passando IDs “legados” (`2=Praia`, `3=Neve` etc.).
   - Implementamos um mapeamento interno para converter para os IDs reais do WP.

2. **Buscar posts por categoria (novo modelo)**
   - Requisição base:
     - `GET /wp-json/wp/v2/posts?categories=<wpCategoryId>&per_page=100&page=<n>&_embed=1`
   - Foi implementada paginação (até um limite de páginas) porque algumas categorias têm muitos posts.
   - `_embed=1` é importante para podermos obter:
     - Featured media: `_embedded['wp:featuredmedia'][0].source_url`
     - Termos (categorias/tags): `_embedded['wp:term']`

3. **Extrair “locais” a partir das tags embutidas**
   - Para cada post retornado:
     - Lemos `_embedded['wp:term']`
     - Encontramos o grupo com `taxonomy === 'post_tag'`
     - Cada termo desse grupo vira um “local” (id + name).

4. **Construir a lista única (deduplicada) de locais**
   - Usamos um `Map` (chave = `tag.id`) para não repetir locais.
   - Para cada local, salvamos também uma imagem de fallback (a primeira imagem encontrada nos posts daquele local), usando:
     - featured media (`_embedded['wp:featuredmedia']`) como prioridade
     - fallback para Yoast (`yoast_head_json.og_image`) se necessário

5. **Renderizar no layout já existente do app**
   - A lista de locais é renderizada usando `CategoryCard` (cards com imagem + título), mantendo o estilo esperado.
   - Adicionamos estados de UI:
     - `Carregando destinos...` durante fetch
     - `Nenhum destino encontrado.` quando a lista está vazia

6. **Navegação para a próxima etapa (lista de artigos do local)**
   - Ao clicar em um local, navegamos para `categories-routes → trips` com:
     - `id_local` = id da tag (post_tag)
     - `id_category` = id da categoria do WordPress
     - `local_name` e `local_imagen`

#### 2) Tela de artigos do local (Trips)
Arquivo: `src/screens/Trips/index.jsx`

**Objetivo:** listar posts dentro da categoria escolhida, filtrando pelo local (tag).

**Mudança-chave:** trocar o filtro `local=` por `tags=`.

Requisição final:
- `GET /wp-json/wp/v2/posts?categories=<categoryId>&tags=<tagId>&per_page=100&_embed=1`

Também passamos a preferir imagem via featured media embutida:
- `_embedded['wp:featuredmedia'][0].source_url` (fallback para Yoast se necessário)

### Arquivos alterados
- src/screens/Category/index.jsx
- src/screens/Trips/index.jsx

### Observações
- A categoria **Parque (146)** está retornando total 0 no momento; isso parece ser conteúdo ausente no WordPress, não bug do app.
- Essa solução mantém o app funcionando com o modelo atual: **categoria = tipo** e **tag = local**.

---

## 2025-12-18 — “Nossas Dicas” mostrava conteúdo errado (corrigido para a lista da Home)

### Sintoma
- A seção **Nossas Dicas** estava exibindo um conteúdo diferente do esperado.
- O esperado (confirmado) era a lista com os textos curtos, por exemplo:
  - “VIAJANDO COM BEBÊS.”
  - “FERIADÃO NO RIO!”
  - “CARNAVAL EM FAMÍLIA.”
  - “VIAJAR É PRECISO!”
  - “RESORTS PARA FERIADOS.”
  - “FÉRIAS DE JULHO!”
  - “HOTÉIS PARA O FERIADO NA SERRA.”
  - “CRIE SEU ROTEIRO PERSONALIZADO.”
  - “FAZENDA CAPOAVA.”
  - “PÉ NA ESTRADA NO RIO DE JANEIRO.”
  - “PÉ NA ESTRADA EM SÃO PAULO.”

### Causa
- O app estava buscando “Nossas Dicas” por um critério que não correspondia à curadoria exibida no design.
- Na prática, esses itens não estavam sendo retornados de forma confiável por uma única categoria/tag pública.

### Como foi diagnosticado
- Procuramos pelos títulos/termos da lista na API do WordPress usando busca por `posts?search=...`.
- Encontramos os posts correspondentes e seus IDs.
- Confirmamos que a API consegue retornar exatamente esses itens na ordem correta usando `include` + `orderby=include`.

### Correção (implementação)

#### 1) Buscar “Nossas Dicas” como lista curada de posts
- Em vez de depender de categoria/tag, passamos a buscar exatamente os posts que compõem a lista.

Endpoint usado:
- `GET /wp-json/wp/v2/posts?include=<ids>&orderby=include&per_page=100&_embed=1`

Lista curada (IDs dos posts):
- `73910` (Viajando com Bebês)
- `59759` (Feriadão no Rio)
- `6847` (Carnaval em família)
- `6469` (Viajar é preciso)
- `130114` (Resorts para feriados)
- `5048` (Férias de julho)
- `130166` (Hotéis para o feriado na serra)
- `130079` (Roteiro personalizado)
- `5997` (Fazenda Capoava)
- `17607` (Pé na estrada – RJ)
- `32565` (Pé na estrada – SP)

#### 2) Manter o layout, mas ajustar os textos exibidos
- No card/lista horizontal, o título exibido passa a ser um rótulo curto (em caixa alta) associado ao ID.
- A navegação continua usando o `id` real do post (ao clicar, abre o detalhe daquele post).

#### 3) Imagens
- Mantivemos a lógica robusta de imagem:
  - Prioriza `_embedded['wp:featuredmedia'][0].source_url`
  - Fallback para `yoast_head_json.og_image[0].url`
- Também deixamos os componentes tolerantes a `uri` nulo, evitando warnings quando algum post não tiver imagem.

### Arquivos alterados
- src/screens/Home/index.jsx
- src/screens/Home/components/tips.jsx
- src/screens/Tips/index.jsx
- src/components/TipsCard/index.jsx
- src/components/PostCard/index.jsx

### Observações
- Essa solução é propositalmente “curada” (lista fixa), porque foi o único jeito de garantir que a lista exibida no app seja exatamente a da Home.
- Se no futuro a curadoria mudar no WordPress, será preciso atualizar a lista de IDs e/ou os rótulos.

---

## 2025-12-18 — Mapa ficava “em branco” sem login (loader preso)

### Sintoma
- Ao abrir a tela **Mapa** sem estar logado, “nada aparecia” (tela aparentemente em branco), mesmo com o Google Maps instalado/configurado.

### Causa raiz
- A tela do mapa ligava o **loader global** (`loaderController`) ao entrar.
- Esse loader só era desligado no `onLayout` do **último marker** de conteúdo (pins do Kids2Gether).
- Quando a lista de markers vinha vazia (ou não carregava), esse `onLayout` **nunca disparava**, então o loader ficava eterno, cobrindo a tela toda.

O principal motivo de `contentMarkers` não carregar foi a falha na origem dos dados:
- O app tentava buscar markers em `GET https://www.kids2gether.com.br/wp-json/k2g/map`, mas esse endpoint estava retornando **404**.

### Como foi diagnosticado
- Confirmamos no código que `setLoaderController(false)` dependia de `onLayout` do último `MarkerContent`.
- Testamos o endpoint de markers (`/wp-json/k2g/map`) e ele retornou **404**, impedindo o preenchimento de `contentMarkers`.
- Como o loader é renderizado globalmente nas rotas, ele cobria a tela inteira.

### Correção (implementação)

#### 1) Desacoplar o loader do layout dos markers
Arquivo: `src/screens/Map/index.jsx`

- O loader passa a:
  - ligar ao entrar na tela;
  - desligar assim que a localização é resolvida (ou usando fallback);
  - desligar também por **timeout de segurança** (8s), para nunca ficar preso.
- Foi removida a lógica de desligar loader dentro do `onLayout` do último marker.

#### 2) Garantir que o estado de markers não fique “nulo”
Arquivos:
- `src/reducer/mapReducer.js`
- `src/contexts/FontsContext.jsx`

- `contentMarkers` passa a iniciar como `[]` (array vazio), em vez de `null`.
- Se o fetch dos markers falhar (ex.: endpoint 404), o app agora faz `dispatch(setContentMarkers([]))` para manter o estado consistente.

### Arquivos alterados
- src/screens/Map/index.jsx
- src/reducer/mapReducer.js
- src/contexts/FontsContext.jsx

### Observações
- Mesmo com o endpoint `/wp-json/k2g/map` fora do ar, o mapa volta a renderizar e a tela deixa de ficar “travada no loader”.
- Os pins de conteúdo do Kids2Gether podem continuar vazios enquanto esse endpoint não voltar (ou até ajustarmos para uma nova fonte), mas a tela fica utilizável.

---

## 2025-12-18 — Remoção do popup de login/marketing “Paris durante as Olimpíadas”

### Sintoma
- Um popup de marketing/login com o texto **“Paris durante as Olimpíadas”** aparecia automaticamente no app, interrompendo a navegação.

### Causa
- O popup era controlado por um estado global (`popUpController`) e renderizado nas rotas como um `OffCanvas` com `variant='popup'`.
- Existiam gatilhos automáticos que ligavam esse estado com `setTimeout(...)`, fazendo o popup aparecer mesmo sem o usuário pedir.

### Correção (implementação)

#### 1) Identificar o componente do popup
- O conteúdo do popup está em `src/components/PopUp/index.jsx`.
- Ele é exibido via `src/components/OffCanvas/index.jsx` quando `variant == 'popup'`.

#### 2) Desativar os gatilhos automáticos (não mostrar mais o popup)
- Mantivemos o componente no projeto, mas impedimos que ele seja aberto automaticamente:

1. **AppContext**: desativado o `handleShowMembershipPopUp`
  - Ele era o principal responsável por agendar `setPopUpController(true)`.
  - Agora a função retorna imediatamente (no-op), e também não é mais acionada no `onFirstModalClose`.

2. **Rotas (boot do app)**: removida chamada que disparava o popup
  - Em `src/routes/index.jsx`, havia um `useEffect` que, após verificar `TOUR_OPENED`, chamava `handleShowMembershipPopUp(user)`.
  - Essa chamada foi removida.

3. **Cadastro**: removido `setTimeout` que abria o popup após registrar
  - Em `src/screens/Register/FormAuth/index.jsx`, havia um `setTimeout(() => setPopUpController(true), 50000)` após concluir o cadastro.
  - Esse agendamento foi removido.

### Arquivos alterados
- src/contexts/AppContext.jsx
- src/routes/index.jsx
- src/screens/Register/FormAuth/index.jsx

### Observações
- Com esses gatilhos desativados, o popup não deve mais aparecer automaticamente em nenhum fluxo (primeiro acesso/boot/cadastro).
