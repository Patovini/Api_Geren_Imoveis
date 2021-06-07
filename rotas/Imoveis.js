const express = require('express');
const router = express.Router();
const mysql = require('../Bd/mysql').pool;


// retorna os imoveis
router.get('/', (req, res, next) => {

  mysql.getConnection((error, conn) =>{

    if(error) { 
        return res.status(500).send({error: error} //Caso de erro da conexão
    )} 

    conn.query(
        'SELECT * FROM imovel;',

        //callback
        (error, resultado, fields) => {
            if(error) { 
                return res.status(500).send({error: error} //Caso de erro da conexão
            )} 
            
            const response = {
                quantidade_de_Imoveis: resultado.length,
                //usando imo como chave
                Imovel: resultado.map(imo =>{
                    return{
                        id_imovel: imo.id_imovel,
                        cep: imo.cep,
                        numero: imo.numero,
                        complemento: imo.complemento,
                        preco: imo.preco,
                        quartos: imo.quartos,
                        
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes do imovel especifico',
                            url: 'http://localhost:3000/imoveis/' + imo.id_imovel
                        } 
                    }
                })
            }
            return res.status(200).send(response )
        }
    )

  });
});

//Retorna um imovel especifico
router.get('/:id_imovel', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{

        if(error) { 
            return res.status(500).send({error: error} //Caso de erro da conexão
        )} 
    
        conn.query(
            'SELECT * FROM imovel WHERE id_imovel = ?;',
            [req.params.id_imovel],
    
            //callback
            (error, resultado, fields) => {
                if(error) { 
                    return res.status(500).send({error: error} //Caso de erro da conexão
                )} 

                const response = {

                    Imovel: {
                        id_imovel: resultado[0].id_imovel,
                        cep: resultado[0].cep,
                        numero: resultado[0].numero,
                        complemento: resultado[0].complemento,
                        preco: resultado[0].preco,
                        quartos: resultado[0].quartos,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos imovel ',
                            url: 'http://localhost:3000/imoveis'
                        }
                    }
                }
                
                return res.status(200).send(response)
            }
        )
    
      });
    
});

// inseri um imovel
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if(error) { 
            return res.status(500).send({error: error} //Caso de erro da conexão
        )} 

        conn.query(
            'INSERT INTO imovel (cep, numero, complemento, preco, quartos) VALUES (?,?,?,?,?)',
            [req.body.cep, req.body.numero, req.body.complemento, req.body.preco, req.body.quartos],
            (error, resultado, field) => {
                conn.release();
                if(error) { 
                    return res.status(500).send({error: error} //Caso de erro da conexão
            )} 
                const response = {
                    mensagem: 'Imovel inserido com sucesso',
                    NovoImovel: {
                        id_imovel: resultado.id_imovel,
                        cep: req.body.cep,
                        numero: req.body.numero,
                        complemento: req.body.complemento,
                        preco: req.body.preco,
                        quartos: req.body.quartos,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um novo imovel',
                            url: 'http://localhost:3000/imoveis'
                        }
                    }
                }

                return res.status(201).send(response);
            }


        )
    });
});

//Alterando do imovel
router.patch('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if(error) { 
            return res.status(500).send({error: error} //Caso de erro da conexão
        )} 

        conn.query(
            'UPDATE imovel SET cep = ?,numero = ?, complemento = ?, preco = ?, quartos = ? WHERE id_imovel = ? ',
            [req.body.cep, req.body.numero, req.body.complemento, req.body.preco, req.body.quartos, req.body.id_imovel],
            (error, resultado, field) => {
                conn.release();
                if(error) { 
                    return res.status(500).send({error: error} //Caso de erro da conexão
            )} 

            const response = {
                mensagem: 'Imovel atualizado com sucesso',
                ImovelAtualizado: {
                    id_imovel: req.body.id_imovel,
                    cep: req.body.cep,
                    numero: req.body.numero,
                    complemento: req.body.complemento,
                    preco: req.body.preco,
                    quartos: req.body.quartos,
                    request: {
                        tipo: 'GET',
                        descricao: 'Atualiza um imovel especifico',
                        url: 'http://localhost:3000/imoveis/' + req.body.id_imovel
                    }
                }
            }


                res.status(202).send(response);
            }


        )
    });
});
    
//deletando imovel 
router.delete('/',(req, res, next) =>{
    mysql.getConnection((error, conn) => {

        if(error) { 
            return res.status(500).send({error: error} //Caso de erro da conexão
        )} 

        conn.query(
            'DELETE FROM imovel WHERE id_imovel = ?',
            [req.body.id_imovel],
            (error, resultado, field) => {
                conn.release();
                if(error) { 
                    return res.status(500).send({error: error} //Caso de erro da conexão
            )} 
            const response = {
                mensagem: 'Produto deletado com sucesso',
                request:{
                    tipo: 'POST',
                    descricao: 'Remove  um imovel especifico',
                    url: 'http://localhost:3000/imoveis/' 
                }
            }

                res.status(201).send(response);
            }


        )
    });

});


module.exports = router;