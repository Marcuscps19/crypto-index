# Crypto Index :coin:

# Índice
1. [Descrição](#descricao)
2. [Link do Deploy](#deploy)
3. [Tecnologias utilizadas](#tecnologias)
4. [Telas da aplicação](#telas)
    1. [Login](#login)
    2. [Página Principal](#home)
    3. [Atualizar valor monetários](#update)
    4. [Página não encontrada - Erro 404](#not-found)
5. [Como rodar a aplicação no Visual Studio Code](#run-app)
6. [Utilizando a API](#api)
    1. [Rota POST /api/login](#post-login)
    2. [Rota GET /api/crypto/btc](#get-btc)
    3. [Rota POST /api/crypto/btc](#post-btc)
    4. [ROTA GET /api/currencies](#get-currencies)
8. [Próximos passos](#next-features)
9. [Informações de contato e sugestões](#contact)

### Descrição: <a name="descricao" />
Aplicação em NodeJs e React Js onde é possível verificar o valor do Bitcoin nas seguintes moedas:
- Dólar americano
- Dólar canadense
- Euro
- Real

É possível colocar a quantidade de Bitcoins desejada e ter a visualização do valor nas moedas citadas anteriormente.
A aplicação faz o uso da API da Coindesk para trazer o valor atualizado do Bitcoin em Dólar americano, os valores das outras moedas foram adicionados em um arquivo e tem seus valores(perante ao dólar) fictícios e através da aplicação é possível alterar esses valores.

### Deploy da aplicação: <a name="deploy" />
[Crypto Index](https://crypto-index-client.herokuapp.com/)

### Tecnologias utilizadas:<a name="tecnologias" />
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Telas da aplicação: <a name="telas" />

### Tela de Login: <a name="login" />
Para fazer o login é necessário colocar um e-mail no formato válido(email@email.com) e uma senha de 6 números. Caso não sejam cumpridos esses requisitos a aplicação informará um erro de dados inválidos.
![Login](https://github.com/Marcuscps19/crypto-index/blob/main/readme-images/login.png)

### Tela da Página Principal <a name="home" />
Nessa tela é possível adicionar a quantidade de Bitcoins no campo BTC(aceita números inteiros) e verificar os valores em cada uma das moedas:

- USD: Dólar americano
- CAD: Dólar canadense
- EUR: Euro
- BRL: Real

Possui um botão "Atualizar valor monetário", aonde é possível atualizar os valores das moedas Dólar canadense, Euro e Real.
![Tela Principal](https://github.com/Marcuscps19/crypto-index/blob/main/readme-images/home.png)

### Tela de atualizar valor monetário <a name="update" />

Nessa tela é possível atualizar o valor de uma das moedas selecionadas(aceita inteiros e pontos flutuantes com '.'), caso seja adicionado um valor inválido, aparecerá uma mensagem de erro, se for bem sucedida a atualização o usuário será redirecionado para a tela principal e aparecerá uma mensagem de sucesso.
![Tela atualizar valores](https://github.com/Marcuscps19/crypto-index/blob/main/readme-images/update-price.png)

Possui um botão Voltar que retorna para a tela principal.

### Tela erro 404 <a name="not-found" />

Essa tela será exibida caso o usuário coloque um endereço inválido na URL.
![Tela Not Found](https://github.com/Marcuscps19/crypto-index/blob/main/readme-images/404.png)

## Como rodar a aplicação no Visual Studio Code: <a name="run-app" />

#### Clone o repositório:

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

## Utilizando a API: <a name="api" />

### Rota GET /api/login <a name="post-login" />
    
Corpo de uma requisição para esse endpoint:

```json
{
    "email": "email@gmail.com",
    "password": "123456"
}    
```
Se o formato do corpo da requisição estiver correto a API retornará um token com dezesseis dígitos alfanuméricos:

```json
{
    "token": "1919bfc4fa95c7f6"
}
```

Caso o corpo da requisição esteja vazio ou a chave **email** não possua um e-mail no formato válido ou a chave **password** não possua uma string contendo seis números o retorno da API será:

```json
{
    "message": "Campos inválidos"
}
```

### Rota GET /api/crypto/btc <a name="get-btc" />
    
O cabeçalho para essa requisição deve possuir uma chave **Authorization** contendo um valor com dezesseis dígitos alfanuméricos:

```sh
    Authorization: 1919bfc4fa95c7f6
```

Se a chave **Authorization** não for passada no cabeçalho, ou se o valor dessa chave não for válido o retorno será: 

```json
{
    "message": "Token inválido"
}
```

Se o cabeçalho possuir um campo **Authorization** em formato válido, a API retornará com informações das moedas:

```json
{
    "time": {
        "updated": "Mar 10, 2022 21:24:00 UTC",
        "updatedISO": "2022-03-10T21:24:00+00:00",
        "updateduk": "Mar 10, 2022 at 21:24 GMT"
    },
    "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
    "bpi": {
        "USD": {
            "code": "USD",
            "rate": "39,536.9417",
            "description": "United States Dollar",
            "rate_float": 39536.9417
        },
        "BTC": {
            "code": "BTC",
            "rate": "1.0000",
            "description": "Bitcoin",
            "rate_float": 1
        },
        "BRL": {
            "code": "BRL",
            "rate": "215,476.332",
            "description": "Brazilian Real",
            "rate_float": 215476.33226500003
        },
        "EUR": {
            "code": "EUR",
            "rate": "36,373.986",
            "description": "Euro",
            "rate_float": 36373.986364000004
        },
        "CAD": {
            "code": "CAD",
            "rate": "56,933.196",
            "description": "Canadian Dollar",
            "rate_float": 56933.196048000005
        }
    }
}
```

### Rota POST /api/crypto/btc <a name="post-btc" />
    
O cabeçalho para essa requisição deve possuir uma chave **Authorization** contendo um valor com dezesseis dígitos alfanuméricos:

```sh
    Authorization: 1919bfc4fa95c7f6
```

Se a chave **Authorization** não for passada no cabeçalho, ou se o valor dessa chave não for válido o retorno será: 

```json
{
    "message": "Token inválido"
}
```

O corpo para essa requisição deve possuir o seguinte formato:

```json
{
  "currency": "BRL",
  "value": 5.45
}
```

Caso a chave **currency** não seja passada, ou o seu valor seja diferente de "BRL", "CAD" ou "EUR" o retorno da API será:

```json
{
    "message": "Moeda inválida"
}
```

Caso a chave **value** não seja passada, ou seu valor seja menor ou igual a zero o retorno será:
*Para adicionar casas decimasi deve-se usar o separador ".".

```json
{
    "message": "Valor inválido"
}
```

Se o corpo for passado no formato correto e o cabeçalho possuir uma chave **Authorization** com valor válido, a API retornará um JSON no seguinte formato:

```json
{
    "message": "Valor alterado com sucesso!"
}
```

### Rota GET /api/currencies <a name="get-currencies" />

O cabeçalho para essa requisição deve possuir uma chave **Authorization** contendo um valor com dezesseis dígitos alfanuméricos:

```sh
    Authorization: 1919bfc4fa95c7f6
```

Se a chave **Authorization** não for passada no cabeçalho, ou se o valor dessa chave não for válido o retorno será: 

```json
{
    "message": "Token inválido"
}
```

Se o cabeçalho possuir uma chave **Authorization** com um valor válido a API retornará os valores atuais das moedas:

```json
{
    "BRL": "5.45",
    "EUR": "0.920",
    "CAD": "1.440"
}
```

### Próximos passos <a name="next-features" />

- Fazer tela de cadastro de usuário
- Adicionar banco de dados Mongo
- Adicionar testes de front-end
- Adicionar testes de back-end
- Adicionar valores reais para as moedas Dólar canadense, Euro e Real
- Adicionar novas moedas

Para mais informações ou sugestões: <a name="contact" />

[LinkedIn](https://www.linkedin.com/in/marcus-husemann/)<br />
[GitHub](https://github.com/Marcuscps19)<br />
*Email:* mchusemann@gmail.com
