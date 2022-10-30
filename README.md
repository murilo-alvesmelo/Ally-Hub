# Desafio Parte 2 - 𝘼𝙡𝙡𝙮 𝙃𝙪𝙗

## Objetivo

Criar uma interface web para marcar Destinos de Interesse.

## Requisitos Obrigatórios

- Interface deve ser feita em React.
- O formulário deverá conter os seguintes campos
    - Nome
    - Email
    - Telefone
    - CPF
    - País
    - Cidade
- Todos os campos devem ser obrigatórios
- Os campos de País e Cidade devem permitir a seleção de múltiplas opções
- Os países precisam ser buscados na API, seguindo as instruções abaixo.
    - Fazer uma requisição GET para a rota: https://amazon-api.sellead.com/country para popular o select de países.
- As cidades precisam ser buscadas na API, seguindo as instruções abaixo.
    - Fazer uma requisição GET para a rota: https://amazon-api.sellead.com/city para popular o select de cidades.

## Rodando localmente

Clone o projeto

```bash
  $ git clone https://github.com/murilo-alvesmelo/Ally-Hub.git
```

Entre no diretório do projeto

```bash
  $ cd Ally-Hub
```

Instale as dependências

```bash
  $ npm install
```

Inicie a aplicação

```bash
  $ npm start
```

## Hospedagem

https://ally-hub.vercel.app/

## Dependências utilizadas

- react-bootstrap
- react-select
- yup

