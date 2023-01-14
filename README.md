# puppeteer_webscraping

## Conteúdo

- [Sobre](#about)
- [Como executar](#getting_started)
- [Utilização](#usage)

## Sobre <a name = "about"></a>

Uma pequena API que possibilita a coleta de informações do site 'webscraper.io' utilizando puppeteer como ferramenta de web scraping

## Como executar <a name = "getting_started"></a>

Estas instruções fornecerão uma cópia do projeto para execução em sua máquina local.

### Pré-requisitos

```
Git
Node.js LTS
```

### Instalação

Passo a passo de como instalar a aplicação em sua máquina.

Crie uma cópia do repositório e instale suas dependências

```bash
$ git clone https://github.com/jrgraff/puppeteer_webscraping
$ cd puppeteer_webscraping
$ yarn
```

Para execução em ambiente local utilize o código abaixo

```bash
$ yarn dev
```

## Utilização <a name = "usage"></a>

A API possui apenas uma rota do tipo GET que aceita dois parâmetros opcionais.

```
URL: http://localhost:5000/
```

Parâmetro search serve para filtrar o nome do produto desejado.
Valor padrão 'Lenovo'

```
search=lenovo
```

Parâmetro sort serve para ordenar os produtos por preço.
Valor padrão 'ASC' (qualquer valor diferente de 'asc' será válido como 'desc')

```
sort=ASC
```

Exemplo de url

```
http://localhost:5000/?search=lenovo&sort=asc
```
