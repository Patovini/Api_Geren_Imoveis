# API para Gerenciar Imoveis
Esta API é utilizada para gerenciar e consultar imoveis 
## Endpoints 
## Imoveis 
### GET /imoveis
Esse endpoint é responsavel por retornar a listagem de todos os imoveis cadastrados no banco de dados
#### Parametros
Nenhum Paramentro
#### Respostas
##### OK! 200
Caso essa resposta aconteça o usuario ira receber todos os imoveis cadastrados.

Exemplo de resposta:
```
{
    "quantidade de imoveis": 2,
    "Imovel": [
        {
            "id_imovel": 1,
            "cep": "02003-020",
            "numero": 202,
            "complemento": "Casa dos fundos",
            "preco": 450,
            "quartos": 3,
            "request": {
                "tipo": "GET",
                "descricao": "Retorna os detalhes do imovel especifico",
                "url": "http://localhost:3000/imoveis/1"
            }
        },
        {
            "id_imovel": 2,
            "cep": "06320-030",
            "numero": 303,
            "complemento": "Ao lado da igreja",
            "preco": 806,
            "quartos": 3,
            "request": {
                "tipo": "GET",
                "descricao": "Retorna os detalhes do imovel especifico",
                "url": "http://localhost:3000/imoveis/2"
            }
        }
}
```
##### Rota não encontrada! 404
Caso a rota esteja errada

Exemplo de erro:
```
{
    "erro": {
        "mensagem": "Rota não encontrada"
    }
}
```

### GET /imoveis/id
Esse endpoint é responsavel por retornar apenas um imovel especifico cadastrados no banco de dados
#### Parametros
Digitar o Id do imovel
#### Respostas ok! 202 
Caso essa resposta aconteça o usuario ira receber o imovel que buscou pelo Id.

Exemplo de resposta:
```
{
    "Imovel": {
        "id_imovel": 1,
        "cep": "02003-020",
        "numero": 202,
        "complemento": "Casa dos fundos",
        "preco": 450,
        "quartos": 3,
        "request": {
            "tipo": "GET",
            "descricao": "Retorna todos imovel ",
            "url": "http://localhost:3000/imoveis"
        }
    }
}
```

##### Rota não encontrada! 404
Caso a rota esteja errada

Exemplo de erro:
```
{
    "erro": {
        "mensagem": "Rota não encontrada"
    }
}
```

### POST /imoveis
Esse endpoint é responsavel cadastrar um novo imovel no banco de dados.
#### Parametros
```
{
    "cep": "25321-030",
    "numero": 111,
    "complemento": "Final da Rua",
    "preco": 206.25,
    "quartos": 2
}
```
#### Respostas OK! 201
Caso de tudo certo o usuario receber uma mensagem dizendo que o imovel foi cadastrado no banco de dados.

Exemplo de resposta:
```
{
    "mensagem": "Imovel inserido com sucesso",
    "NovoImovel": {
        "cep": "25321-030",
        "numero": 111,
        "complemento": "Final da Rua",
        "preco": 206.25,
        "quartos": 2,
        "request": {
            "tipo": "POST",
            "descricao": "Insere um novo imovel",
            "url": "http://localhost:3000/imoveis"
        }
    }
}

```
#### Respostas Erro! 500
Caso falte algum dado ira acontecer o seguinte erro
Exemplo de erro:
```
{
    "error": {
        "code": "ER_BAD_NULL_ERROR",
        "errno": 1048,
        "sqlState": "23000",
        "sqlMessage": "Column 'quartos' cannot be null"
    }
}
```


### PATCH /imoveis
Esse endpoint é responsavel por atualizar/alterar algum imovel especifico
#### Parametros
```
{
    "id_imovel": 2,
    "cep": "06320-030",
    "numero": 323,
    "complemento": "Ao lado da igreja",
    "preco": 806,
    "quartos": 3
}
```
#### Respostas OK! 202
Quando o usuario altera algum dado do imovel corretamente ira atualizar.

Exemplo de resposta:
```
{
    "mensagem": "Imovel atualizado com sucesso",
    "ImovelAtualizado": {
        "id_imovel": 2,
        "cep": "06320-030",
        "numero": 323,
        "complemento": "Ao lado da igreja e da escola",
        "preco": 806,
        "quartos": 3,
        "request": {
            "tipo": "GET",
            "descricao": "Atualiza um imovel especifico",
            "url": "http://localhost:3000/imoveis/2"
        }
    }
}
```
#### Respostas Erro! 500
Caso falte algum dado ira acontecer o seguinte erro
Exemplo de erro:
```
{
    "erro": {
        "mensagem": "Unexpected token } in JSON at position 143"
    }
}
```

### DELETE /imoveis
Esse endpoint é responsavel por deletar algum imovel especifico
#### Parametros
```
{
    "id_imovel": 6
}
```
#### Respostas OK! 201
Quando o imovel é deletado com sucesso

Exemplo de resposta:
```
{
    "mensagem": "Produto deletado com sucesso",
    "request": {
        "tipo": "POST",
        "descricao": "Remove  um imovel especifico",
        "url": "http://localhost:3000/imoveis/"
    }
}
```
#### Respostas Erro! 500
Caso digite o valor errado
```
{
    "erro": {
        "mensagem": "Unexpected token a in JSON at position 20"
    }
}
```
## Usuario 

### POST /usuarios/cadastro
Esse endpoint é responsavel por cadastrar o usuario no banco de dados.
#### Parametros
```
{
    "nome": "UsuarioX",
    "cpf" : "11111111",
    "email": "usuariox@gmail.com",
    "senha":  "123456789"    
}
```
#### Respostas Ok! 201
Quando o usuario realiza o cadastro ira receber a confirmação

Exemplo de resposta:
```
{
    "mensagem": "Usuario criado com sucesso",
    "UsuarioCriado": {
        "nome": "UsuarioX",
        "email": "usuariox@gmail.com"
    }
}
```
#### Respostas Erro! 500
Caso não consiga pois o cpf ja esta cadastrado ira receber a seguinte mensagem.

Exemplo de Erro:
```
{
    "error": {
        "code": "ER_DUP_ENTRY",
        "errno": 1062,
        "sqlState": "23000",
        "sqlMessage": "Duplicate entry '11111111' for key 'usuarios.cpf'"
    }
}
```

### POST /usuarios/login
Esse endpoint é responsavel por realizar o login do usuario.
#### Parametros
```
{
    "email": "usuariox@gmail.com",
    "senha":  "123456789"
}
```
#### Respostas OK! 200
Quando o usuario logar ira receber a seguinte mensagem com o token(JSON Web Token)

Exemplo de resposta:
```
{
    "mensagem": "Logado com sucesso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjo0LCJub21lIjoiVXN1YXJpb1giLCJlbWFpbCI6InVzdWFyaW94QGdtYWlsLmNvbSIsImlhdCI6MTYyMzEwMzUzMCwiZXhwIjoxNjIzMTQ2NzMwfQ.eb7JB7LlhjRYOoEyuEJkMIUNgFFE0rvuFBCmoGM4vzI"
}
```
#### Respostas Erro 404 (email)
Caso tenha digitado o email errado ira receber a seguinte mensagem.

Exemplo de Erro:
```
{
    "mensagem": "Email nao encontrado"
}
```
#### Respostas Erro 401 (senha)
Caso tenha digitado a senha errada ira receber a seguinte mensagem.

Exemplo de Erro:
```
{
    "mensagem": "Falha ao logar"
}
```
