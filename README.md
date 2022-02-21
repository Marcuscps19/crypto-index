# Crypto Index :coin:

### Descrição:
Aplicação em NodeJs e React Js onde é possível verificar o valor do Bitcoin nas seguintes moedas:
- Dólar americano
- Dólar canadense
- Euro
- Real

É possível colocar a quantidade de Bitcoins desejada, e ter a visualização do valor nas moedas faladas anteriormente.
A aplicação faz o uso da API da Coindesk para trazer o valor atualizado do Bitcoin em Dólar americano, os valores das outras moedas foram adicionados em um arquivo e tem seus valores(perante ao dólar) fictícios e através da aplicação é possível alterar esses valores.

### Tecnologias utilizadas:
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Telas da aplicação:

# Tela de Login:
Para fazer o login é necessário colocar um e-mail no formato válido(email@email.com) e uma senha de 6 números. Caso não sejam cumpridos esses requisitos a aplicação informará um erro de dados inválidos.
![Login](https://github.com/Marcuscps19/crypto-index/blob/main/readme-images/login.png)

# Tela da Página Principal
Nessa tela é possível adicionar a quantidade de Bitcoins no campo BTC(aceita números inteiros) e verificar os valores em cada uma das moedas:

- USD: Dólar americano
- CAD: Dólar canadense
- EUR: Euro
- BRL: Real

Possui um botão "Atualizar valor monetário", aonde é possível atualizar os valores das moedas Dólar canadense, Euro e Real.
![Tela Principal](https://github.com/Marcuscps19/crypto-index/blob/main/readme-images/home.png)

# Tela de atualizar valor monetário

Nessa tela é possível atualizar o valor de uma das moedas selecionadas(aceita inteiros e pontos flutuantes com '.'), caso seja adicionado um valor inválido, aparecerá uma mensagem de erro, se for bem sucedida a atualização o usuário será redirecionado para a tela principal e aparecerá uma mensagem de sucesso.
![Tela atualizar valores](https://github.com/Marcuscps19/crypto-index/blob/main/readme-images/update-price.png)

Possui um botão Voltar que retorna para a tela principal.

# Tela erro 404

Essa tela será exibida caso o usuário coloque um endereço inválido na URL.
![Tela Not Found](https://github.com/Marcuscps19/crypto-index/blob/main/readme-images/404.png)

### Como rodar a aplicação no Visual Studio Code:

# Clone o repositório:

```bash

git clone https://github.com/Marcuscps19/crypto-index.git

cd crypto-index

cd back-end

npm i

npm start

// abra outro terminal entre na pasta crypto-index novamente

cd front-end

npm i

npm start
// aguarde e a aplicação abrirá no navegador
```

### Próximos passos

- Fazer tela de cadastro de usuário
- Adicionar banco de dados Mongo
- Adicionar testes de front-end
- Adicionar testes de back-end
- Adicionar valores reais para as moedas Dólar canadense, Euro e Real
- Trazer novas moedas

Para mais informações ou sugestões:

mchusemann@gmail.com
