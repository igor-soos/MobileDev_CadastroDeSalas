# Cadastro de Salas Livres

Aplicativo mobile desenvolvido para cadastro e visualização de salas disponíveis em ambiente acadêmico.

---

## Contribuidores

| Nome        | RM       |
|------------|----------|
| Yuri Pessoa | RM557475 |
| Igor Soos   | RM556010 |

---

## Sobre o Projeto

O aplicativo permite que usuários:

- Criem uma conta
- Realizem login
- Cadastrem salas disponíveis por dia
- Definam disponibilidade (manhã / tarde)
- Visualizem salas cadastradas
- Removam registros

Os dados são armazenados localmente utilizando AsyncStorage.

---

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/igor-soos/MobileDev_CadastroDeSalas.git

cd MobileDev_CadastroDeSalas

npm install --legacy-peer-deps
```

Instale dependências adicionais:
```bash
npm install @react-native-async-storage/async-storage --legacy-peer-deps

npm install react-dom --legacy-peer-deps

npm install react-native-web --legacy-peer-deps
```

---

## Como Rodar o Projeto

```bash
npx expo start
```

Se necessário, limpe o cache:

```bash
npx expo start --clear
```

## 🎥 Demonstração do Aplicativo

Clique na imagem abaixo para assistir ao vídeo completo:

[![Demonstração do app](https://img.youtube.com/vi/HEvwtSMsGhE/0.jpg)](https://youtu.be/HEvwtSMsGhE)

---

### Funcionalidades
- Cadastro de usuário
- Login com persistência
- Cadastro de salas por dia
- Seleção de período (manhã/tarde)
- Listagem de salas
- Exclusão de salas
- Interface com tema escuro

---

### Estrutura do Projeto
- app/ → rotas e telas
- context/ → autenticação
- data/ → manipulação de dados
- services/ → armazenamento (AsyncStorage)
- assets/ → imagens

---

### Tecnologia utilizadas
- React Native
- Expo
- Expo Router
- AsyncStorage
- JavaScript
