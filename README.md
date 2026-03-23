# Kids2gether App

Repositório monorepo do aplicativo **Kids2gether** — o app para famílias que viajam com crianças.

## Estrutura

```
Kids2gether_app/
├── Kids2gether_app_android/    # App Android (React Native / Expo)
├── Kids2gether_app_ios/        # App iOS (React Native / Expo)
└── Kids2gether_app_functions/  # Cloud Functions Firebase (API backend)
```

## Sobre o projeto

Kids2gether é um aplicativo que ajuda famílias a descobrirem destinos, dicas de viagem e experiências pensadas para crianças. O app conta com:

- Mapa interativo com pins de destinos visitados e planejados
- Feed de dicas, novidades e conteúdo editorial
- Seção Kids in Rio e EcoTurismo
- Marketplace de parceiros
- Área de perfil e assinatura premium

## Tecnologias

- React Native com Expo SDK 53
- Redux Toolkit
- React Navigation v7
- Firebase Authentication
- Google Maps (react-native-maps)
- Pagar.me (pagamentos e assinaturas)
- WordPress REST API (conteúdo editorial)

## Cloud Functions

O backend roda em Firebase Cloud Functions v2 com as seguintes funções:

| Função | Descrição |
|---|---|
| `users` | CRUD de usuários, consulta de membership e exclusão de conta |
| `subscriptions` | Criação e cancelamento de assinaturas via Pagar.me |
| `payment` | Cadastro e listagem de cartões de crédito via Pagar.me |
| `usermarkers` | CRUD de marcadores pessoais no mapa |
| `wpProxy` | Proxy autenticado para posts e páginas privadas do WordPress |
| `pagarmeWebhook` | Webhook para receber eventos de status do Pagar.me |

## Como rodar

### Android
```bash
cd Kids2gether_app_android
npm install
npx expo start --android
```

### iOS
```bash
cd Kids2gether_app_ios
npm install
npx expo start --ios
```

> Configure as variáveis de ambiente copiando `.env.example` para `.env` antes de rodar.

## Documentação

A documentação técnica completa do projeto está em [`docs/DOCUMENTATION.md`](docs/DOCUMENTATION.md).
