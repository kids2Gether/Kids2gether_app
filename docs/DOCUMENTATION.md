# Kids2gether — Documentação Técnica Completa

> **Versão:** 2.1.3 (Android) | 1.4.9 (iOS)
> **Última atualização:** Março 2026
> **Mantido por:** Pedro Henrique Ferreira
>
> **Credenciais e Logins:** Todos os logins de serviços (Firebase, Google Cloud Console, Pagar.me, Apple Developer, Google Play Console, WordPress) estão disponíveis no **mural da equipe**. Consulte-o antes de configurar qualquer serviço.

---

## Sumário

1. [Visão Geral](#1-visão-geral)
2. [Stack Tecnológica](#2-stack-tecnológica)
3. [Arquitetura do App](#3-arquitetura-do-app)
4. [Estrutura de Pastas](#4-estrutura-de-pastas)
5. [Setup do Projeto](#5-setup-do-projeto)
6. [Executando o App](#6-executando-o-app)
7. [Integrações Externas](#7-integrações-externas)
8. [Variáveis de Ambiente](#8-variáveis-de-ambiente)
9. [Fluxos do Aplicativo](#9-fluxos-do-aplicativo)
10. [Boas Práticas e Padrões](#10-boas-práticas-e-padrões)
11. [Debug e Troubleshooting](#11-debug-e-troubleshooting)
12. [Build e Deploy](#12-build-e-deploy)
13. [Melhorias Futuras](#13-melhorias-futuras)
14. [Contribuição](#14-contribuição)

---

## 1. Visão Geral

### O que é o Kids2gether

O **Kids2gether** é um aplicativo mobile (Android e iOS) concebido como um **diário de bordo familiar** para registrar, organizar e compartilhar viagens e experiências de férias. Idealizado por **Nathalia Gomes de Lima**, o app nasceu da necessidade de documentar as aventuras da família: seu marido **Pedro**, os gêmeos **Mateus** e **Gabriel**, e o bebê **João Miguel**.

Mais do que um diário pessoal, o Kids2gether evoluiu para uma **plataforma completa** que ajuda famílias a descobrir destinos, dicas de viagem e experiências pensadas para crianças de todas as idades.

**Site oficial:** [https://www.kids2gether.com.br/](https://www.kids2gether.com.br/)

### Objetivo

- Registrar e organizar memórias de viagens familiares
- Oferecer dicas e conteúdo editorial sobre destinos kid-friendly
- Disponibilizar um mapa interativo com pins de destinos visitados e planejados
- Conectar famílias a parceiros e serviços relevantes via Marketplace
- Oferecer conteúdo premium exclusivo para assinantes

### Público-alvo

- Famílias com crianças que viajam com frequência
- Pais que buscam destinos e experiências adequadas para crianças
- Famílias que desejam registrar e compartilhar memórias de viagens

### Principais Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Mapa Interativo** | Google Maps com pins personalizados de destinos visitados, planejados e filtráveis por categoria |
| **Feed de Conteúdo** | Dicas, novidades e conteúdo editorial integrado via WordPress |
| **Kids in Rio** | Seção dedicada a experiências no Rio de Janeiro |
| **EcoTurismo** | Conteúdo focado em ecoturismo e sustentabilidade |
| **Marketplace** | Vitrine de parceiros e serviços para famílias viajantes |
| **Perfil & Premium** | Área de perfil com gestão de assinatura premium via Pagar.me |
| **Categorias de Viagem** | Praias, Neve, Parques, Cidades e Aventuras |
| **Busca** | Pesquisa de destinos e conteúdo |

---

## 2. Stack Tecnológica

### Frontend (Aplicativo Mobile)

| Tecnologia | Versão (Android / iOS) | Justificativa |
|---|---|---|
| **React Native** | 0.79.6 / 0.81.5 | Framework cross-platform para mobile com performance nativa |
| **React** | 19.0.0 / 19.1.0 | Biblioteca de UI declarativa |
| **Expo SDK** | 53 / 54 | Facilita build, deploy e acesso a APIs nativas |
| **Redux Toolkit** | ^2.2.6 | Gerenciamento de estado global previsível e performático |
| **React Navigation v7** | 7.x | Navegação robusta com suporte a deep linking |
| **React Native Maps** | 1.20.1 | Integração nativa com Google Maps |
| **React Native Paper** | ^5.9.1 | Biblioteca de componentes Material Design |
| **Axios** | ^1.6.8 | Cliente HTTP com interceptors e tratamento de erros |
| **React Hook Form** | ^7.45.1 | Formulários performáticos com validação |
| **Lottie React Native** | 7.2.2 / 7.3.4 | Animações vetoriais de alta qualidade |
| **Cheerio** | ^1.0.0-rc.12 | Parsing de HTML para renderização de conteúdo |

### Backend (Cloud Functions)

| Tecnologia | Versão | Justificativa |
|---|---|---|
| **Firebase Functions v2** | ^7.0.5 | Serverless functions escaláveis |
| **Firebase Admin** | ^13.6.0 | Acesso administrativo ao Firestore e Auth |
| **Express.js** | ^5.2.1 | Framework HTTP para estruturar endpoints |
| **Pagar.me SDK** | ^4.35.2 | Processamento de pagamentos e assinaturas |
| **Node.js** | v20 | Runtime JavaScript server-side |
| **CORS** | ^2.8.6 | Controle de acesso cross-origin |

### Serviços e Infraestrutura

| Serviço | Uso |
|---|---|
| **Firebase Authentication** | Login com e-mail/senha e Facebook |
| **Firestore** | Banco de dados NoSQL em tempo real |
| **Firebase Cloud Functions** | Backend serverless |
| **Pagar.me** | Pagamentos e assinaturas (cartão de crédito) |
| **WordPress REST API** | CMS para conteúdo editorial |
| **Google Maps Platform** | Mapas e geolocalização |
| **Expo Application Services (EAS)** | Build e distribuição |
| **RevenueCat** | Gerenciamento de compras in-app (integrado via `react-native-purchases`) |

### Bibliotecas Complementares

| Biblioteca | Uso |
|---|---|
| `@react-native-async-storage/async-storage` | Armazenamento local persistente |
| `react-native-gesture-handler` | Gestos nativos (swipe, drag, etc.) |
| `react-native-reanimated` | Animações de alto desempenho |
| `react-native-safe-area-context` | Respeito às áreas seguras (notch, barra de status) |
| `react-native-screens` | Otimização de performance de navegação |
| `expo-notifications` | Push notifications |
| `expo-location` | Serviços de geolocalização |
| `expo-font` | Carregamento de fontes customizadas |
| `react-native-render-html` | Renderização de HTML no app |
| `react-native-snap-carousel` | Carrosséis de conteúdo |
| `react-native-vector-icons` | Ícones vetoriais |
| `patch-package` | Patches em dependências de terceiros |

---

## 3. Arquitetura do App

### Organização Geral

O projeto segue uma **arquitetura monorepo** com três módulos independentes:

```
Kids2gether_app/
├── Kids2gether_app_android/    → App Android (React Native / Expo)
├── Kids2gether_app_ios/        → App iOS (React Native / Expo)
└── Kids2gether_app_functions/  → Cloud Functions Firebase (API Backend)
```

> **Nota:** Os apps Android e iOS compartilham a mesma base de código `src/`, com pequenas diferenças de configuração e versões de dependências. O código é mantido separadamente para permitir ajustes específicos de plataforma.

### Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                      APLICATIVO MOBILE                          │
│                                                                 │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────────┐    │
│  │  Screens  │──│  Components  │  │    Context Providers    │    │
│  │ (25 telas)│  │ (14 módulos) │  │ App / User / Fonts     │    │
│  └─────┬─────┘  └──────────────┘  └───────────┬────────────┘    │
│        │                                       │                │
│  ┌─────▼─────────────────────────────────────▼──────────┐      │
│  │              Redux Store (Toolkit)                     │      │
│  │  news │ tips │ user │ map │ locals │ ecoturismo       │      │
│  └─────────────────────┬─────────────────────────────────┘      │
│                        │                                        │
│  ┌─────────────────────▼─────────────────────────────────┐      │
│  │              Services Layer (Axios)                    │      │
│  │  firebase.js │ API calls │ AsyncStorage               │      │
│  └─────────────────────┬─────────────────────────────────┘      │
└─────────────────────────┼───────────────────────────────────────┘
                          │ HTTPS
┌─────────────────────────▼───────────────────────────────────────┐
│                    FIREBASE CLOUD FUNCTIONS                      │
│                                                                 │
│  ┌──────────┐ ┌──────────────┐ ┌─────────────┐ ┌────────────┐ │
│  │  users   │ │ subscriptions│ │   payment   │ │ usermarkers│ │
│  └──────────┘ └──────────────┘ └─────────────┘ └────────────┘ │
│  ┌──────────┐ ┌──────────────┐                                 │
│  │ wpProxy  │ │pagarmeWebhook│                                 │
│  └──────────┘ └──────────────┘                                 │
│                        │                                        │
│  ┌─────────────────────▼─────────────────────────────────┐      │
│  │           Firestore    │    Pagar.me    │   WordPress  │      │
│  └───────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

### Separação de Responsabilidades

| Camada | Responsabilidade | Localização |
|---|---|---|
| **Screens** | Lógica de tela, layout e interação do usuário | `src/screens/` |
| **Components** | UI reutilizável, sem lógica de negócio | `src/components/` |
| **Contexts** | Estado compartilhado entre componentes (UI state) | `src/contexts/` |
| **Redux Store** | Estado global da aplicação (dados de domínio) | `src/store/` + `src/reducer/` |
| **Services** | Comunicação com APIs externas | `src/services/` |
| **Hooks** | Lógica reutilizável encapsulada | `src/hooks/` |
| **Utils** | Funções utilitárias puras | `src/utils/` |
| **Routes** | Definição de navegação e roteamento | `src/routes/` |

### Fluxo de Dados

```
Ação do Usuário
    │
    ▼
Screen captura evento
    │
    ├──▶ Dispatch Redux Action (dados de domínio)
    │       │
    │       ▼
    │    Reducer atualiza Store
    │       │
    │       ▼
    │    useSelector re-renderiza componentes
    │
    └──▶ Context setState (estado de UI)
            │
            ▼
         useContext re-renderiza componentes
```

### Comunicação com APIs

Todas as chamadas de API são feitas via **Axios** ou diretamente pelo **Firebase SDK**:

- **Cloud Functions:** Endpoints REST acessados via Axios com token Firebase no header `Authorization`
- **WordPress:** Conteúdo editorial acessado via proxy autenticado (`wpProxy`)
- **Pagar.me:** Processamento de pagamentos via Cloud Functions (nunca diretamente do app)
- **Google Maps:** Integração nativa via `react-native-maps`

---

## 4. Estrutura de Pastas

### Raiz do Monorepo

```
Kids2gether_app/
│
├── Kids2gether_app_android/    # App Android — principal plataforma de desenvolvimento
├── Kids2gether_app_ios/        # App iOS — espelho com ajustes de plataforma
├── Kids2gether_app_functions/  # Backend Firebase Cloud Functions
├── docs/                       # Documentação técnica
└── README.md                   # Visão geral do projeto
```

### App Android (e iOS — estrutura idêntica)

```
Kids2gether_app_android/
│
├── android/                    # Código nativo Android (gerado pelo Expo)
│   ├── app/                    # Módulo principal do Gradle
│   ├── build.gradle            # Configuração do Gradle (projeto)
│   └── gradle/                 # Wrapper do Gradle
│
├── assets/                     # Recursos estáticos do app
│   ├── animations/             # Arquivos Lottie (.json) para animações
│   ├── fonts/                  # Fontes customizadas (.ttf/.otf)
│   ├── logo/                   # Logotipos e variações da marca
│   ├── map/                    # Ícones e assets do mapa
│   ├── nav/                    # Ícones da barra de navegação
│   └── popup/                  # Imagens para popups e modais
│
├── patches/                    # Patches para dependências (via patch-package)
│
├── src/                        # CÓDIGO-FONTE PRINCIPAL
│   │
│   ├── components/             # Componentes reutilizáveis de UI
│   │   ├── CategoryCard/       # Card para exibição de categorias
│   │   ├── CustomButton/       # Botão customizado com variantes
│   │   ├── ErrorModal/         # Modal genérico de erro
│   │   ├── Header/             # Cabeçalho do app
│   │   ├── InitialModal/       # Modal de boas-vindas (primeiro acesso)
│   │   ├── Loader/             # Indicador de carregamento
│   │   ├── LoadingScreen/      # Tela de loading inicial
│   │   ├── Modal/              # Modal genérico com múltiplas variantes
│   │   ├── NavBar/             # Barra de navegação superior
│   │   ├── OffCanvas/          # Painel lateral deslizante
│   │   ├── Permissions/        # Componente de permissões do app
│   │   ├── PostCard/           # Card para exibição de posts
│   │   ├── TipsCard/           # Card para dicas de viagem
│   │   └── TypeIcon/           # Ícone por tipo de destino
│   │
│   ├── contexts/               # React Context Providers
│   │   ├── AppContext.jsx      # Estado global de UI (modais, loaders, filtros)
│   │   ├── FontsContext.jsx    # Carregamento e disponibilização de fontes
│   │   └── UserContext.jsx     # Estado do usuário (auth, assinatura, perfil)
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   └── useLink.jsx         # Hook para abrir links externos
│   │
│   ├── reducer/                # Redux Reducers (slices)
│   │   ├── ecoturismoReducer.js  # Estado de conteúdo de ecoturismo
│   │   ├── localsReducer.js      # Estado de locais/destinos
│   │   ├── mapReducer.js         # Estado do mapa e marcadores
│   │   ├── newsReducer.js        # Estado de notícias/novidades
│   │   ├── tipsReducer.js        # Estado de dicas
│   │   └── userReducer.js        # Estado do usuário logado
│   │
│   ├── routes/                 # Estrutura de Navegação
│   │   ├── index.jsx           # Componente raiz de rotas + overlays (modais, off-canvas)
│   │   ├── tab.routes.jsx      # Definição das tabs inferiores (Bottom Tab Navigator)
│   │   ├── styles.js           # Estilos de navegação
│   │   └── stack/              # Stack Navigators por seção
│   │       ├── stack.home.routes.jsx         # Stack: Home → News → Trip → Trips
│   │       ├── stack.map.routes.jsx          # Stack: Map → detalhes de pin
│   │       ├── stack.marketplace.routes.jsx  # Stack: Marketplace → detalhes → busca
│   │       ├── stack.categorie.routes.jsx    # Stack: Categories → Category
│   │       ├── stack.tips.routes.jsx         # Stack: Tips → Tip individual
│   │       ├── stack.profile.routes.jsx      # Stack: Profile → Premium → assinatura
│   │       └── stack.offers.routes.jsx       # Stack: Ofertas (comentado/desativado)
│   │
│   ├── screens/                # Telas do Aplicativo (25 módulos)
│   │   ├── Categories/         # Listagem de categorias de viagem
│   │   ├── Category/           # Detalhes de uma categoria
│   │   ├── EcoTurismo/         # Seção de ecoturismo
│   │   ├── Home/               # Tela principal / feed
│   │   │   ├── assets/         # Assets específicos da Home
│   │   │   ├── components/     # Componentes internos da Home
│   │   │   └── utils/          # Utilitários da Home
│   │   ├── KidsInRio/          # Seção Kids in Rio
│   │   ├── Lobby/              # Tela para usuários não autenticados
│   │   ├── Map/                # Mapa interativo
│   │   │   └── components/     # Sub-componentes do mapa
│   │   │       ├── CreatePin/      # Criação de novo pin
│   │   │       ├── InsertPin/      # Formulário de inserção/edição de pin
│   │   │       ├── MapInfo/        # Informações do mapa
│   │   │       ├── MapTip/         # Dica no mapa
│   │   │       ├── MarkerContent/  # Conteúdo de um marcador
│   │   │       ├── MarkerFilter/   # Filtros de marcadores
│   │   │       ├── MarkerVisited/  # Marcador de local visitado
│   │   │       └── MarkerWant/     # Marcador de "quero visitar"
│   │   ├── Marketplace/        # Tela do marketplace
│   │   ├── MarketplaceDetails/ # Detalhes de um item do marketplace
│   │   ├── MarketplaceSearch/  # Busca no marketplace
│   │   ├── Marketplaces/       # Listagem de marketplaces
│   │   ├── News/               # Detalhes de uma notícia
│   │   ├── Offer/              # Detalhes de uma oferta
│   │   ├── Offers/             # Listagem de ofertas
│   │   │   └── PremiumInfo/    # Informações sobre o plano premium
│   │   ├── Premium/            # Fluxo de assinatura premium
│   │   │   ├── Confirmacao/    # Tela de confirmação de pagamento
│   │   │   ├── CreditCard/     # Formulário de cartão de crédito
│   │   │   ├── PaymentConfirm/ # Confirmação final de pagamento
│   │   │   └── util/           # Utilitários de pagamento
│   │   ├── PrivacyPolicy/      # Política de privacidade
│   │   ├── Profile/            # Perfil do usuário
│   │   │   ├── DeleteModal/    # Modal de exclusão de conta
│   │   │   ├── Subscription/   # Gestão de assinatura
│   │   │   └── UserInfo/       # Informações do usuário
│   │   ├── Recovery/           # Recuperação de senha
│   │   │   ├── FormAuth/       # Formulário de recuperação
│   │   │   └── RecoveryModal/  # Modal de confirmação
│   │   ├── Register/           # Cadastro de novo usuário
│   │   │   └── FormAuth/       # Formulário de cadastro
│   │   ├── Search/             # Busca global
│   │   ├── SignIn/             # Login
│   │   │   ├── FormAuth/       # Formulário de login (e-mail)
│   │   │   └── FormFacebook/   # Login via Facebook
│   │   ├── Tip/                # Detalhes de uma dica
│   │   ├── Tips/               # Listagem de dicas
│   │   ├── Trip/               # Detalhes de uma viagem
│   │   └── Trips/              # Listagem de viagens
│   │
│   ├── services/               # Serviços e configurações de API
│   │   └── firebase.js         # Configuração e inicialização do Firebase
│   │
│   ├── store/                  # Configuração do Redux Store
│   │   └── index.js            # Criação do store com todos os reducers
│   │
│   └── utils/                  # Utilitários gerais
│       ├── htmlStyles.js       # Estilos para renderização de HTML
│       ├── mapHtml.js          # Utilitários de HTML para o mapa
│       └── normalizeAuthResponse.js  # Normalização de respostas de auth
│
├── App.jsx                     # Componente raiz — providers e navegação
├── index.js                    # Entry point do React Native
├── app.json                    # Configuração do Expo (nome, versão, ícones, splash)
├── app.config.js               # Configuração dinâmica do Expo (variáveis de ambiente)
├── babel.config.js             # Configuração do Babel
├── eas.json                    # Configuração do EAS Build e Submit
├── package.json                # Dependências e scripts
└── .env                        # Variáveis de ambiente (NÃO comitar)
```

### Cloud Functions (Backend)

```
Kids2gether_app_functions/
│
├── index.js                    # Todas as Cloud Functions (users, subscriptions,
│                               #   payment, usermarkers, wpProxy, pagarmeWebhook)
├── package.json                # Dependências do backend
├── firebase.json               # Configuração do Firebase (hosting, functions)
├── .firebaserc                 # Mapeamento de projeto Firebase
└── package-lock.json           # Lock de versões
```

---

## 5. Setup do Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

| Ferramenta | Versão Mínima | Obrigatória | Como verificar | Instalação |
|---|---|---|---|---|
| **Node.js** | v20+ | Sim | `node --version` | [nodejs.org](https://nodejs.org/) |
| **npm** | v9+ | Sim | `npm --version` | Incluído com Node.js |
| **Git** | Qualquer | Sim | `git --version` | [git-scm.com](https://git-scm.com/) |
| **Expo CLI** | Última | Sim | `npx expo --version` | `npm install -g expo-cli` |
| **EAS CLI** | >= 4.1.2 | Sim | `eas --version` | `npm install -g eas-cli` |
| **Android Studio** | Última | Para build local Android | — | [developer.android.com](https://developer.android.com/studio) |
| **Xcode** (apenas macOS) | 15+ | **Não** (build iOS via nuvem) | `xcode-select --version` | Mac App Store |
| **Firebase CLI** | Última | Para deploy de Cloud Functions | `firebase --version` | `npm install -g firebase-tools` |

> **Importante:** O Xcode e o macOS **NÃO são obrigatórios**. Todas as builds iOS podem ser feitas na nuvem via EAS Build, diretamente do Windows ou Linux. Veja a seção [Build e Deploy](#12-build-e-deploy) para detalhes.

### Configuração do Android Studio

1. Abra o Android Studio → **SDK Manager**
2. Instale:
   - Android SDK Platform 34 (ou superior)
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools
3. Configure a variável de ambiente `ANDROID_HOME`:
   ```bash
   # Linux/macOS — adicione ao ~/.bashrc ou ~/.zshrc
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools

   # Windows — adicione nas Variáveis de Ambiente do Sistema
   # ANDROID_HOME = C:\Users\<seu-usuario>\AppData\Local\Android\Sdk
   ```
4. Crie um emulador (AVD Manager) com a imagem **Google APIs** (necessário para Google Maps)

### Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd Kids2gether_app
```

### Instalar Dependências

#### App Android
```bash
cd Kids2gether_app_android
npm install
```

> **Nota:** O `postinstall` executa automaticamente `patch-package` para aplicar patches em dependências. Se houver erros de patch, verifique a pasta `patches/`.

#### App iOS
```bash
cd Kids2gether_app_ios
npm install

# Instalar pods nativos do iOS (apenas macOS)
cd ios
pod install
cd ..
```

#### Cloud Functions
```bash
cd Kids2gether_app_functions
npm install
```

### Configurar Variáveis de Ambiente

#### App (Android/iOS)

Crie um arquivo `.env` na raiz do app (ex.: `Kids2gether_app_android/.env`):

```env
EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000000
EXPO_PUBLIC_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxxxx
```

> **Como obter esses valores:** As credenciais do projeto já existem e estão disponíveis no **mural da equipe**. Alternativamente, acesse o [Console do Firebase](https://console.firebase.google.com/) com a conta do projeto → Configurações do projeto → seção "Seus apps" → copie as configurações do app web. O login do Firebase Console está no mural.

#### Cloud Functions

As variáveis sensíveis são gerenciadas via Firebase Secrets:

```bash
# Definir secrets
firebase functions:secrets:set WP_BASIC_USER
firebase functions:secrets:set WP_BASIC_PASS
```

A chave do Pagar.me é configurada diretamente no código (ver seção [Integrações Externas](#7-integrações-externas)).

### Configuração do Firebase

> **O projeto Kids2gether já possui uma conta Firebase totalmente configurada.** Não é necessário criar um novo projeto. Todas as credenciais e logins de serviços (Firebase, Google Cloud Console, Pagar.me, etc.) estão disponíveis no **mural da equipe**.

Para vincular o projeto Firebase na sua máquina local:

```bash
cd Kids2gether_app_functions
firebase login
# Faça login com a conta do projeto (credenciais no mural)

firebase use kids2gether-4ca94
# Seleciona o projeto Firebase existente
```

> **Nota para novos desenvolvedores:** Peça acesso ao mural da equipe para obter todos os logins e chaves de API. Não crie projetos novos — use sempre o projeto existente.

### Login no Expo/EAS

```bash
npx eas login
# ou
eas login
```

---

## 6. Executando o App

### Desenvolvimento Local

#### Iniciar o Metro Bundler (Dev Client)

```bash
cd Kids2gether_app_android   # ou Kids2gether_app_ios
npm start
```

Isso executa `expo start --dev-client`, que inicia o Metro Bundler com suporte a módulos nativos customizados.

#### Scripts Disponíveis

| Script | Comando | Descrição |
|---|---|---|
| `npm start` | `expo start --dev-client` | Inicia o dev server com dev client |
| `npm run android` | `expo run:android` | Compila e roda no Android |
| `npm run ios` | `expo run:ios` | Compila e roda no iOS |
| `npm run web` | `expo start --web` | Inicia versão web (experimental) |

### Rodar no Android

#### Emulador

1. Abra o Android Studio → AVD Manager → Inicie um emulador
2. Execute:
   ```bash
   cd Kids2gether_app_android
   npm run android
   ```
3. O app será compilado e instalado automaticamente no emulador

#### Dispositivo Físico

1. Ative o **Modo Desenvolvedor** no dispositivo:
   - Configurações → Sobre o telefone → Toque 7x no "Número da versão"
2. Ative **Depuração USB** nas Opções do Desenvolvedor
3. Conecte o dispositivo via USB e confirme a autorização
4. Verifique conexão:
   ```bash
   adb devices
   # Deve listar seu dispositivo
   ```
5. Execute:
   ```bash
   npm run android
   ```

> **Dica:** Se o dispositivo não aparecer, tente `adb kill-server && adb start-server`.

### Rodar no iOS

#### Opção 1: Com Xcode (macOS)

Se você tem um Mac com Xcode instalado:

**Simulador:**
```bash
cd Kids2gether_app_ios
npm run ios
```

**Dispositivo Físico:**
1. Conecte o iPhone via cabo
2. Abra o projeto em `ios/kids2gether.xcworkspace` no Xcode
3. Selecione seu dispositivo como target
4. Configure o **Team** de assinatura em Signing & Capabilities
5. Rode pelo Xcode ou via terminal:
   ```bash
   npm run ios -- --device
   ```

#### Opção 2: Sem Xcode — Build na Nuvem via EAS (qualquer SO)

**Você NÃO precisa de um Mac para testar no iOS.** O EAS Build compila o app na nuvem, e você instala o resultado diretamente no iPhone.

1. Gere um build de desenvolvimento na nuvem:
   ```bash
   cd Kids2gether_app_ios
   eas build --platform ios --profile development
   ```
2. O EAS compila o app nos servidores da Expo (leva alguns minutos)
3. Ao finalizar, você recebe um **link para download** ou um **QR code**
4. Abra o link no Safari do iPhone → instale o app
5. Inicie o dev server na sua máquina (Windows/Linux/Mac):
   ```bash
   npm start
   ```
6. O app no iPhone se conecta ao Metro Bundler via rede local

> **Pré-requisitos para build iOS na nuvem:**
> - Conta Apple Developer ativa (login no mural da equipe)
> - Certificados configurados no EAS (na primeira vez, o EAS oferece para criar automaticamente)
> - O iPhone precisa estar na mesma rede Wi-Fi que o computador rodando o dev server

#### Opção 3: Build de Preview — Instalar no iPhone sem Dev Server

Para testar uma versão independente (sem precisar do Metro Bundler rodando):

```bash
cd Kids2gether_app_ios
eas build --platform ios --profile preview
```

Isso gera um IPA ad-hoc que pode ser instalado via link direto no iPhone, sem precisar de Mac ou Xcode.

### Testar a Versão iOS no Android (e vice-versa)

Como o Kids2gether usa **React Native com Expo**, o mesmo código-fonte roda em ambas as plataformas. Para testar o comportamento de uma plataforma na outra:

#### Testar o app iOS usando um dispositivo Android

O código `src/` é compartilhado entre as versões. Para validar a lógica e a interface no Android:

```bash
cd Kids2gether_app_ios
npm install
npm run android
```

> **Nota:** Componentes nativos específicos de iOS (ex.: `DateTimePicker` com estilo iOS) serão renderizados com a versão Android, mas toda a lógica, navegação e fluxos funcionam igualmente. Isso é útil para validar funcionalidades sem precisar de um iPhone.

#### Testar o app Android usando um dispositivo iOS

Da mesma forma, você pode rodar o projeto Android em um dispositivo iOS:

```bash
cd Kids2gether_app_android
npm install

# Via Xcode (se tiver Mac)
npm run ios

# Ou via build na nuvem (qualquer SO)
eas build --platform ios --profile development
```

> **Por que isso funciona:** Ambos os projetos compartilham a mesma estrutura `src/`. As diferenças ficam apenas nas configurações nativas (`app.json`, versões de dependências). Rodar o código de uma pasta na outra plataforma é uma forma rápida de validar o app sem o dispositivo alvo.

### Cloud Functions (Local)

Para testar as funções localmente:

```bash
cd Kids2gether_app_functions
npm run serve
# Inicia: firebase emulators:start --only functions
```

O emulador sobe em `http://localhost:5001` e simula todas as Cloud Functions localmente.

---

## 7. Integrações Externas

### Firebase

**Uso:** Autenticação, banco de dados (Firestore) e Cloud Functions.

| Serviço | Configuração |
|---|---|
| Authentication | Email/Senha + Facebook habilitados no Console Firebase |
| Firestore | Banco NoSQL com collections: `users`, `usersProfiles`, `usermarkers` |
| Cloud Functions | 6 funções HTTP (v2) em `Kids2gether_app_functions/index.js` |

**Onde ficam as chaves:** Arquivo `.env` no app mobile (prefixadas com `EXPO_PUBLIC_FIREBASE_*`). Os valores estão no **mural da equipe**.

**Configuração:**
- O projeto Firebase já está criado e configurado — **NÃO crie um novo projeto**
- O login do Firebase Console está no **mural da equipe**
- As chaves Firebase são públicas (API Key) e seguras para o app mobile — a segurança é feita via Firebase Security Rules
- Nunca exponha o Firebase Admin Service Account no app mobile

### Pagar.me (Pagamentos)

**Uso:** Processamento de pagamentos por cartão de crédito e gerenciamento de assinaturas premium.

| Plano | Preço | ID |
|---|---|---|
| Mensal | R$ 9,90 | Configurado no Pagar.me |
| Semestral | R$ 49,90 | Configurado no Pagar.me |
| Anual | R$ 98,90 | Configurado no Pagar.me |

**Onde ficam as chaves:**
- `PAGARME_API_KEY` — Chave secreta (sk_*) configurada nas Cloud Functions
- `PAGARME_ENCRYPTION_KEY` — Chave de encriptação (pk_*) configurada nas Cloud Functions
- O login do dashboard Pagar.me está no **mural da equipe**

**Boas práticas de segurança:**
- **NUNCA** coloque chaves do Pagar.me no app mobile
- Todo processamento de pagamento acontece via Cloud Functions
- Use o ambiente de sandbox do Pagar.me para testes (`sk_test_*`)
- O webhook `pagarmeWebhook` recebe atualizações de status de pagamento

### WordPress REST API

**Uso:** CMS para conteúdo editorial (notícias, dicas, posts sobre destinos).

**Configuração:**
- O acesso é feito via proxy autenticado (`wpProxy` Cloud Function)
- Credenciais WordPress são armazenadas como Firebase Secrets:
  - `WP_BASIC_USER` — Usuário do WordPress
  - `WP_BASIC_PASS` — Senha do WordPress
- O app mobile **nunca** acessa o WordPress diretamente

**Como configurar:**
```bash
firebase functions:secrets:set WP_BASIC_USER
# Digite o usuário e pressione Enter

firebase functions:secrets:set WP_BASIC_PASS
# Digite a senha e pressione Enter
```

### Google Maps Platform

**Uso:** Mapa interativo com marcadores customizados.

**Configuração:**
- A API Key do Google Maps já está configurada em `app.json` dentro da seção `android.config.googleMaps`
- As APIs já estão habilitadas no Google Cloud Console do projeto (Maps SDK for Android, Maps SDK for iOS)
- O login do Google Cloud Console está no **mural da equipe**

**Boas práticas:**
- Restrinja a API Key por app (package name / bundle ID)
- Configure cotas de uso no Google Cloud Console
- Não crie novas API Keys — use as existentes no projeto

### RevenueCat (Compras In-App)

**Uso:** Gerenciamento de compras in-app (via `react-native-purchases`).

**Configuração:**
- Configure o projeto no [RevenueCat Dashboard](https://app.revenuecat.com/)
- Vincule as contas da Play Store e App Store

---

## 8. Variáveis de Ambiente

### App Mobile (.env)

| Variável | Descrição | Obrigatória | Exemplo |
|---|---|---|---|
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Chave pública da API Firebase | Sim | `AIzaSy...` |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Domínio de autenticação Firebase | Sim | `projeto.firebaseapp.com` |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | ID do projeto Firebase | Sim | `kids2gether-xxxxx` |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Bucket de armazenamento Firebase | Sim | `projeto.appspot.com` |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ID do sender para push notifications | Sim | `786445331555` |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | ID do app Firebase | Sim | `1:786...:web:b56...` |

> **Prefixo `EXPO_PUBLIC_`:** Obrigatório para que as variáveis sejam acessíveis no runtime do Expo. Variáveis sem esse prefixo não estarão disponíveis no app.

### Cloud Functions (Secrets / Config)

| Variável | Descrição | Tipo |
|---|---|---|
| `WP_BASIC_USER` | Usuário do WordPress | Firebase Secret |
| `WP_BASIC_PASS` | Senha do WordPress | Firebase Secret |
| `PAGARME_API_KEY` | Chave secreta do Pagar.me | Hardcoded (mover para Secret) |
| `PAGARME_ENCRYPTION_KEY` | Chave de encriptação do Pagar.me | Hardcoded (mover para Secret) |

### Exemplo de .env

```env
# ==========================================
# Kids2gether — Variáveis de Ambiente
# ==========================================
# Copie este arquivo para .env e preencha os valores

# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy_________________________
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000000
EXPO_PUBLIC_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxx
```

> **IMPORTANTE:** O arquivo `.env` **NÃO deve ser comitado** no repositório. Adicione-o ao `.gitignore`.

---

## 9. Fluxos do Aplicativo

### 9.1 — Fluxo de Autenticação

```
┌────────────┐     ┌──────────────┐     ┌────────────────┐
│   Lobby    │────▶│   SignIn      │────▶│   Home (auth)  │
│ (não auth) │     │ Email/Facebook│     │   Feed + tabs  │
└────────────┘     └──────┬───────┘     └────────────────┘
                          │
                   ┌──────▼───────┐
                   │   Register   │
                   │ (novo user)  │
                   └──────┬───────┘
                          │
                   ┌──────▼───────┐
                   │   Recovery   │
                   │ (esqueci a   │
                   │    senha)    │
                   └──────────────┘
```

**Detalhes:**
1. Usuário não autenticado vê a tela **Lobby** com opção de login
2. Pode logar via **e-mail/senha** ou **Facebook**
3. Após login, o Firebase retorna um token JWT
4. O token é verificado nas Cloud Functions via middleware `verifyToken`
5. Dados do usuário são armazenados no Redux (`userReducer`) e contexto (`UserContext`)
6. O `authRedirectIntent` no `AppContext` permite redirecionar o usuário para a tela que ele tentou acessar antes do login (ex.: Mapa)

### 9.2 — Fluxo do Mapa Interativo

```
┌──────────┐     ┌───────────────┐     ┌────────────────┐
│   Map    │────▶│ MarkerContent │────▶│   Detalhes do  │
│ (Google  │     │ (info do pin) │     │   destino      │
│  Maps)   │     └───────────────┘     └────────────────┘
└────┬─────┘
     │
     ├──── Long press ──▶ ┌─────────────┐     ┌──────────────┐
     │                    │  CreatePin   │────▶│  InsertPin   │
     │                    │ (off-canvas) │     │ (formulário) │
     │                    └─────────────┘     └──────────────┘
     │
     └──── Filtro ──────▶ ┌──────────────┐
                          │ MarkerFilter │
                          │ (por tipo)   │
                          └──────────────┘
```

**Funcionalidades do Mapa:**
- Visualização de pins de destinos (conteúdo editorial + marcadores pessoais)
- Filtros: mostrar/ocultar marcadores de conteúdo, visitados e "quero ir"
- Criação de pin pessoal via long press no mapa → formulário off-canvas
- Edição e exclusão de pins pessoais
- Os marcadores pessoais são persistidos no Firestore (`usermarkers`)

### 9.3 — Fluxo de Assinatura Premium

```
┌──────────┐     ┌─────────────┐     ┌───────────────┐
│  Offers  │────▶│   Premium   │────▶│  CreditCard   │
│ (planos) │     │ (seleção de │     │ (formulário   │
│          │     │    plano)   │     │  de cartão)   │
└──────────┘     └─────────────┘     └──────┬────────┘
                                            │
                                     ┌──────▼────────┐
                                     │ PaymentConfirm│
                                     │ (revisão)     │
                                     └──────┬────────┘
                                            │
                                     ┌──────▼────────┐     ┌──────────────┐
                                     │  Confirmação  │     │  Pagar.me    │
                                     │  (resultado)  │◀────│  (webhook)   │
                                     └───────────────┘     └──────────────┘
```

**Detalhes:**
1. Usuário escolhe entre planos: **Mensal** (R$9,90), **Semestral** (R$49,90) ou **Anual** (R$98,90)
2. Preenche dados do cartão de crédito
3. O app envia os dados para a Cloud Function `payment` (cria customer + salva cartão)
4. A Cloud Function `subscriptions` cria a assinatura no Pagar.me
5. O webhook `pagarmeWebhook` recebe confirmação de pagamento
6. O status de membership é atualizado no Firestore

### 9.4 — Fluxo de Conteúdo Editorial

```
┌──────────┐     ┌───────────────┐     ┌───────────────┐
│   Home   │────▶│  wpProxy      │────▶│  WordPress    │
│  (feed)  │     │ (Cloud Func.) │     │  REST API     │
└──────────┘     └───────────────┘     └───────────────┘
     │
     ├──── Tips ──────▶ Listagem de dicas ──▶ Detalhe da dica
     ├──── News ──────▶ Listagem de news ──▶ Detalhe da notícia
     ├──── KidsInRio ──▶ Conteúdo do Rio
     └──── EcoTurismo ─▶ Conteúdo eco
```

O conteúdo é gerenciado no WordPress e acessado pelo app via proxy autenticado. O HTML retornado é renderizado nativamente usando `react-native-render-html`.

### 9.5 — Primeiro Acesso

Ao abrir o app pela primeira vez:
1. O `InitialModal` é exibido (boas-vindas / tour)
2. O estado é controlado pelo `firstTimeController` no `AppContext`
3. Após fechar, a flag `TOUR_OPENED` é salva no `AsyncStorage`
4. Em acessos futuros, o modal não aparece novamente

---

## 10. Boas Práticas e Padrões

### Organização do Código

- **Colocation:** Cada tela mantém seus componentes, assets e utilitários em subpastas dentro de `screens/`
- **Componentes reutilizáveis** ficam em `src/components/`
- **Cada componente** tem sua própria pasta com `index.jsx` e `styles.js`
- **Estado de UI** (modais, loaders) → Context API
- **Estado de domínio** (dados, listas) → Redux Toolkit

### Padrão de Componentes

```
ComponentName/
├── index.jsx       # Componente principal
├── styles.js       # StyleSheet do React Native
└── [sub-componentes, se necessário]
```

**Exemplo de componente:**
```jsx
// src/components/CustomButton/index.jsx
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";

export default function CustomButton({ title, onPress, variant }) {
  return (
    <TouchableOpacity style={styles[variant]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
```

### Convenções

| Item | Convenção |
|---|---|
| **Nomes de arquivo** | PascalCase para componentes, camelCase para utilitários |
| **Pastas de tela** | PascalCase (`Home/`, `SignIn/`, `Map/`) |
| **Extensão** | `.jsx` para componentes React, `.js` para utilitários |
| **Estilos** | `styles.js` separado usando `StyleSheet.create()` |
| **State management** | Context para UI local, Redux para dados globais |
| **Navegação** | Tab Navigator (raiz) → Stack Navigator (por seção) |
| **Variáveis de ambiente** | Prefixo `EXPO_PUBLIC_` para variáveis acessíveis no app |

### Gerenciamento de Estado

```
┌─────────────────────────────────────────────────┐
│                 Redux Store                      │
│  (dados de domínio — persistem entre telas)      │
│                                                  │
│  newsReducer → Posts, notícias do WordPress      │
│  tipsReducer → Dicas de viagem                   │
│  userReducer → Dados do usuário logado           │
│  mapReducer  → Marcadores e estado do mapa       │
│  localsReducer → Destinos e locais               │
│  ecoturismoReducer → Conteúdo eco                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              Context Providers                   │
│  (estado de UI — efêmero, local)                 │
│                                                  │
│  AppContext  → Modais, loaders, filtros, overlays │
│  UserContext → Auth state, assinatura, delete     │
│  FontsContext → Fontes carregadas                │
└─────────────────────────────────────────────────┘
```

### Patches

O projeto usa `patch-package` para corrigir bugs em dependências de terceiros. Os patches ficam na pasta `patches/`. Eles são aplicados automaticamente no `postinstall`.

Para criar um novo patch:
```bash
# Edite o arquivo diretamente em node_modules/pacote/...
npx patch-package nome-do-pacote
# O patch é salvo em patches/nome-do-pacote+versao.patch
```

---

## 11. Debug e Troubleshooting

### Problemas Comuns

#### "Unable to resolve module" ao rodar o app

**Causa:** Cache do Metro Bundler desatualizado.

**Solução:**
```bash
npx expo start --clear
# ou
npx react-native start --reset-cache
```

#### Build falha no Android com erro de Gradle

**Causa:** Cache do Gradle corrompido ou SDK desatualizado.

**Solução:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

No Windows:
```bash
cd android
gradlew.bat clean
cd ..
npm run android
```

#### "Error: EMFILE: too many open files" (Windows/macOS)

**Causa:** Metro Bundler abre muitos arquivos simultâneos.

**Solução (macOS):**
```bash
brew install watchman
```

#### Google Maps não aparece no Android

**Causa:** API Key não configurada ou API não habilitada.

**Solução:**
1. Verifique se a chave está em `app.json` → `android.config.googleMaps.apiKey`
2. Ative "Maps SDK for Android" no Google Cloud Console
3. Verifique se a chave está restrita ao package name correto

#### Erro de permissão de localização

**Causa:** Permissões não concedidas pelo usuário.

**Solução:**
- Verifique se `ACCESS_FINE_LOCATION` e `ACCESS_COARSE_LOCATION` estão em `app.json`
- No iOS, verifique a `infoPlist.NSLocationWhenInUseUsageDescription`

#### Patches não aplicados após npm install

**Causa:** `postinstall` não executou ou versão do pacote mudou.

**Solução:**
```bash
npx patch-package
# Se o patch falhar, pode ser necessário recriar para a nova versão
```

#### Firebase Auth não funciona

**Causa:** Configuração incorreta das variáveis de ambiente.

**Solução:**
1. Verifique se o `.env` existe e está preenchido corretamente
2. Reinicie o Metro Bundler (`npx expo start --clear`)
3. Verifique se o provedor (Email/Senha ou Facebook) está habilitado no Firebase Console

#### Erro "Invariant Violation: requireNativeComponent"

**Causa:** Módulo nativo não vinculado corretamente (comum com `react-native-maps`).

**Solução:**
```bash
# Android
cd android && ./gradlew clean && cd ..
npm run android

# iOS
cd ios && pod install && cd ..
npm run ios
```

### Ferramentas de Debug

| Ferramenta | Uso |
|---|---|
| **React Native Debugger** | Debug de JS, Redux e Network |
| **Flipper** | Debug avançado de layout, network e performance |
| **Chrome DevTools** | `npx expo start` → pressione `j` para abrir |
| **Firebase Emulator** | `firebase emulators:start` para testar Cloud Functions |
| **adb logcat** | Logs nativos do Android: `adb logcat *:E` |
| **Xcode Console** | Logs nativos do iOS (via Xcode) |

---

## 12. Build e Deploy

### Builds com EAS (Expo Application Services)

O projeto utiliza **EAS Build** para gerar builds **na nuvem**. Isso significa que você **NÃO precisa de um Mac para gerar builds iOS** — tudo é compilado nos servidores da Expo.

A configuração está em `eas.json`:

#### Perfis de Build

| Perfil | Uso | Output | Onde compila |
|---|---|---|---|
| `development` | Desenvolvimento com dev client | APK debug / iOS debug | Nuvem (EAS) |
| `preview` | Testes internos (distribuição interna) | APK / IPA ad-hoc | Nuvem (EAS) |
| `production` | Publicação nas lojas | AAB (App Bundle) / IPA | Nuvem (EAS) |

> **Vantagem do EAS Build:** Todas as builds (Android e iOS) são feitas na nuvem. Você pode gerar um IPA para a App Store a partir do **Windows ou Linux**, sem precisar de macOS ou Xcode instalados.

---

### Build Android

#### APK para testes (preview)

```bash
cd Kids2gether_app_android
eas build --platform android --profile preview
```

Isso gera um APK que pode ser instalado diretamente em qualquer dispositivo Android. Ao finalizar, o EAS fornece um link para download.

**Instalar o APK no dispositivo:**
1. Envie o link do APK para o dispositivo (WhatsApp, e-mail, etc.)
2. Abra o link no navegador do celular → faça download
3. Abra o `.apk` e autorize a instalação de fontes desconhecidas

#### AAB para Google Play Store (production)

```bash
eas build --platform android --profile production
```

> O perfil `production` gera um **App Bundle (.aab)** e incrementa automaticamente o `versionCode`.

#### Build local (alternativa sem nuvem)

Se preferir compilar localmente (requer Android Studio configurado):

```bash
cd Kids2gether_app_android
npm run android
# Ou para gerar APK diretamente:
cd android && ./gradlew assembleRelease
```

---

### Build iOS

#### Opção 1: Build na Nuvem via EAS (recomendado — funciona em qualquer SO)

**Não precisa de Mac, Xcode ou macOS.** Tudo compila nos servidores da Expo.

```bash
cd Kids2gether_app_ios

# Build de desenvolvimento (para testar com dev server)
eas build --platform ios --profile development

# Build de preview (para testar sem dev server)
eas build --platform ios --profile preview

# Build de produção (para App Store)
eas build --platform ios --profile production
```

**Na primeira build iOS**, o EAS vai pedir para configurar certificados Apple:
1. Escolha "Let EAS handle it" (recomendado) — o EAS cria e gerencia os certificados automaticamente
2. Faça login com a conta Apple Developer (credenciais no **mural da equipe**)
3. Os certificados ficam salvos no EAS para builds futuras

**Após a build finalizar:**
- O EAS fornece um **link de download** e um **QR code**
- Para `development` e `preview`: abra o link no Safari do iPhone → instale
- Para `production`: o IPA é enviado diretamente para o App Store Connect

> **Dica:** A build na nuvem leva em média 10-20 minutos. Você pode acompanhar o progresso em [expo.dev](https://expo.dev) ou no terminal.

#### Opção 2: Build Local com Xcode (apenas macOS)

Se preferir compilar localmente no Mac:

```bash
cd Kids2gether_app_ios

# Gerar bundle JS
npm run build:ios
# Executa: react-native bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios'

# Abrir no Xcode para build/archive
open ios/kids2gether.xcworkspace
```

No Xcode:
1. Selecione o scheme `kids2gether`
2. Product → Archive
3. Distribute App → App Store Connect

---

### Publicação na Google Play Store

#### Via EAS Submit (automatizado)

```bash
eas submit --platform android --profile production
```

A configuração em `eas.json` define:
- `track: "production"` — publica diretamente na faixa de produção
- `releaseStatus: "completed"` — disponibiliza imediatamente

> **Pré-requisito:** Chave de serviço do Google Play Console configurada no EAS. O login do Google Play Console está no **mural da equipe**.

#### Manualmente

1. Faça download do `.aab` gerado pelo EAS Build
2. Acesse o [Google Play Console](https://play.google.com/console) (login no mural)
3. Selecione o app → Produção → Criar nova versão
4. Faça upload do `.aab`
5. Preencha as notas de versão
6. Revise e publique

### Publicação na App Store

#### Via EAS Submit (automatizado — funciona em qualquer SO)

```bash
eas submit --platform ios --profile production
```

O EAS envia o IPA diretamente para o App Store Connect sem precisar de Mac.

#### Manualmente

1. Gere o build iOS com `eas build --platform ios --profile production`
2. Submeta via EAS Submit ou Transporter (app da Apple, requer macOS)
3. Acesse o [App Store Connect](https://appstoreconnect.apple.com/) (login no mural)
4. Preencha metadados, screenshots e envie para revisão

### Deploy das Cloud Functions

```bash
cd Kids2gether_app_functions

# Deploy de todas as funções
firebase deploy --only functions

# Deploy de uma função específica
firebase deploy --only functions:users
firebase deploy --only functions:subscriptions

# Ver logs
firebase functions:log
```

> **Dica:** Sempre teste localmente com `npm run serve` antes de fazer deploy em produção.

### Versionamento

- **Android:** Versão atual `2.1.3`, version code `73` (incrementado automaticamente pelo EAS)
- **iOS:** Versão atual `1.4.9`
- O campo `autoIncrement: true` no perfil `production` do `eas.json` incrementa o build number a cada build

---

## 13. Melhorias Futuras

### Unificação do Código Android/iOS

Atualmente os apps Android e iOS mantêm codebases quase idênticas em pastas separadas. Uma melhoria significativa seria unificar em um único projeto com configurações condicionais por plataforma, utilizando `Platform.OS` para diferenças pontuais.

### Migração das Chaves Pagar.me para Secrets

As chaves do Pagar.me estão hardcoded no `index.js` das Cloud Functions. Migrar para Firebase Secrets:

```bash
firebase functions:secrets:set PAGARME_API_KEY
firebase functions:secrets:set PAGARME_ENCRYPTION_KEY
```

E referenciar no código:
```javascript
const { defineSecret } = require("firebase-functions/params");
const pagarmeApiKey = defineSecret("PAGARME_API_KEY");
```

### TypeScript

Migrar progressivamente de JavaScript para TypeScript para melhor:
- Tipagem estática e detecção de erros em tempo de compilação
- Autocompletar e documentação inline no editor
- Manutenibilidade a longo prazo

### Testes Automatizados

Implementar uma suíte de testes:
- **Unitários:** Jest para utilitários e reducers
- **Componentes:** React Native Testing Library
- **E2E:** Detox ou Maestro para fluxos críticos (login, pagamento)

### Otimizações de Performance

- **Code splitting:** Lazy loading de telas com `React.lazy`
- **Memoização:** `React.memo` e `useMemo` para componentes pesados
- **Otimização de imagens:** Comprimir assets e usar formatos WebP
- **Virtualização:** Garantir uso de `FlatList` em listas longas

### Modularização das Cloud Functions

O `index.js` atual contém todas as 6 funções em um único arquivo (~25KB). Modularizar em arquivos separados:

```
functions/
├── src/
│   ├── users.js
│   ├── subscriptions.js
│   ├── payment.js
│   ├── usermarkers.js
│   ├── wpProxy.js
│   └── pagarmeWebhook.js
├── middleware/
│   └── auth.js
├── index.js              # Apenas exports
└── package.json
```

### Internacionalização (i18n)

Preparar o app para múltiplos idiomas usando `react-i18next` ou `expo-localization`, já que o app documenta viagens internacionais.

### Offline Support

Implementar cache offline com:
- Firestore offline persistence (já suportado nativamente)
- Cache de conteúdo WordPress para leitura offline
- Queue de ações offline (criar pins, etc.)

### CI/CD

Configurar pipeline automatizado:
- **GitHub Actions** ou **GitLab CI** para:
  - Lint e testes a cada push
  - Build automático via EAS em branches de release
  - Deploy automático das Cloud Functions em merge para `main`

### Monitoramento e Analytics

- **Firebase Crashlytics** — Monitoramento de crashes em produção
- **Firebase Analytics** — Métricas de uso e engajamento
- **Sentry** — Monitoramento de erros com stack traces detalhados

---

## 14. Contribuição

### Como Contribuir

1. **Fork** o repositório
2. Crie uma branch para sua feature/fix:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
3. Faça suas alterações seguindo os padrões do projeto
4. Teste localmente (Android e/ou iOS)
5. Commit com mensagem descritiva (ver padrão abaixo)
6. Push e abra um **Pull Request**

### Padrão de Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <descrição curta>

[corpo opcional]

[rodapé opcional]
```

**Tipos:**

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Alteração em documentação |
| `style` | Formatação (sem mudança de lógica) |
| `refactor` | Refatoração de código |
| `perf` | Melhoria de performance |
| `test` | Adição ou correção de testes |
| `chore` | Tarefas de manutenção (deps, configs) |

**Exemplos:**
```bash
git commit -m "feat(map): adicionar filtro por tipo de destino"
git commit -m "fix(auth): corrigir redirecionamento após login Facebook"
git commit -m "docs: atualizar documentação de setup"
git commit -m "chore(deps): atualizar expo-sdk para versão 54"
```

### Pull Requests

- Descreva **o que** foi alterado e **por quê**
- Inclua screenshots para mudanças visuais
- Referencie issues relacionadas (`Closes #123`)
- Certifique-se de que o app compila sem erros
- Teste nos dispositivos/emuladores relevantes

### Estrutura de Branches

| Branch | Propósito |
|---|---|
| `main` | Código em produção estável |
| `develop` | Integração de features em andamento |
| `feature/*` | Novas funcionalidades |
| `fix/*` | Correções de bugs |
| `release/*` | Preparação de release |

---

## Apêndice: Referência Rápida de Comandos

```bash
# ================================
# APP ANDROID
# ================================
cd Kids2gether_app_android
npm install                          # Instalar dependências
npm start                            # Iniciar dev server
npm run android                      # Rodar no Android (local)
npx expo start --clear               # Limpar cache e iniciar

# ================================
# APP iOS
# ================================
cd Kids2gether_app_ios
npm install                          # Instalar dependências
cd ios && pod install && cd ..       # Instalar pods (só macOS)
npm start                            # Iniciar dev server
npm run ios                          # Rodar no iOS (só macOS)

# ================================
# CLOUD FUNCTIONS
# ================================
cd Kids2gether_app_functions
npm install                          # Instalar dependências
npm run serve                        # Testar localmente
firebase deploy --only functions     # Deploy para produção
firebase functions:log               # Ver logs

# ================================
# BUILDS NA NUVEM (qualquer SO)
# ================================
eas build --platform android --profile preview      # APK para testes
eas build --platform android --profile production   # AAB para Play Store
eas build --platform ios --profile development      # iOS dev (instalar no iPhone)
eas build --platform ios --profile preview           # iOS preview (sem dev server)
eas build --platform ios --profile production        # IPA para App Store

# ================================
# PUBLICAÇÃO NAS LOJAS
# ================================
eas submit --platform android                        # Enviar para Play Store
eas submit --platform ios                            # Enviar para App Store

# ================================
# TESTAR CROSS-PLATFORM
# ================================
cd Kids2gether_app_ios && npm run android            # Testar código iOS no Android
cd Kids2gether_app_android && eas build --platform ios --profile development  # Testar código Android no iOS
```

---

> **Kids2gether** — Registrando memórias de família, uma viagem por vez.
>
> Desenvolvido com React Native + Expo | Backend Firebase
>
> [www.kids2gether.com.br](https://www.kids2gether.com.br/)
