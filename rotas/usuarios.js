const express = require('express');
const router = express.Router();
const mysql = require('../Bd/mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ROTA DE CADASTRO

router.post('/cadastro', (req, res, next) => { 

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(505).send({error: error})} //Caso de erro da conexão } 
         
        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => { //salt de 10 

            if (errBcrypt) { return res.status(500).send({ error: errBcrypt })} // caso tenha erro com a senha

            
        conn.query('INSERT INTO usuarios (nome, cpf, email, senha) VALUES (?, ?, ?, ?)',
            [req.body.nome, req.body.cpf, req.body.email, hash],
            (error, results) => {
                conn.release(); //fechar a conexao
                if(error) {
                    return res.status(500).send({error: error })
                }

                const response = {
                    mensagem: 'Usuario criado com sucesso',
                    UsuarioCriado: {
                    nome: req.body.nome,
                    email: req.body.email
                    }
                }
                
                return res.status(201).send(response)
                    
            })

        })  
    });        
});


// ROTA DE LOGIN

router.post('/login', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(505).send({error: error})} //Caso de erro da conexão } 
       
        conn.query('SELECT * FROM usuarios WHERE email = ?',
        [req.body.email],
        (error, resultado, fields) =>{
            conn.release();
            if(error) { return res.status(505).send({error: error})} //Caso de erro
            //Verificando email
            if(resultado.length < 1) {
                return res.status(404).send({ mensagem : "Email nao encontrado" })
            }

            //compara a senha do body com o resultado(banco de dados) da query da linha 51 
            bcrypt.compare(req.body.senha, resultado[0].senha, (err, resultado1) =>{
                
                if(err){
                    return res.status(401).send({ mensagem : "Falha na Senha" })  
                }

                if(resultado1) {
                    const token = jwt.sign ({

                        id_usuario: resultado[0].id_usuario,
                        nome: resultado[0].nome,
                        email: resultado[0].email
                    }, 
                    process.env.JWT_KEY,{
                        expiresIn: "12h"
                    });

                    return res.status(200).send({
                         mensagem: "Logado com sucesso",
                         token: token
                    });
                }     
                return res.status(401).send({ mensagem : "Falha ao logar" })
            })
        });

    });
});



module.exports = router;

//   "email": "ru2231@gmail.com",
// "senha":  "ajduahsduahasd"