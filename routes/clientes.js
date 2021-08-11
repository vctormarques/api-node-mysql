const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(` SELECT  CLI.id, 
                        CLI.nome, 
                        CLI.tipo_pessoa, 
                        CLI.cnp, 
                        CO.telefone, 
                        CO.email, 
                        CO.tipo 
                    FROM cliente CLI 
                LEFT OUTER JOIN contato CO 
                    ON CO.pessoa = CLI.id `,
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error, response: null }) }
                const response = {
                    clientes: result.map(cli => {
                        return {
                            id: cli.id,
                            nome: cli.nome,
                            tipo_pessoa: cli.tipo_pessoa,
                            cnp: cli.cnp,
                            contato: {
                                telefone: cli.telefone,
                                email: cli.email,
                                tipo: cli.tipo,
                            },
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os clientes',
                            }
                        }
                    })
                }
                return res.status(200).send({ response });
            }
        );
    });
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        var sql = "INSERT INTO cliente (nome, tipo_pessoa, cnp) VALUES (?, ?, ?)";
        var values = [req.body.nome, req.body.tipo_pessoa, req.body.cnp];

        conn.query(sql, values, (error, result) => {
            var sql = "INSERT INTO contato (pessoa, telefone, email, tipo) VALUES (?, ?, ?, ?)";
            var values = [result.insertId, req.body.telefone, req.body.email, req.body.tipo];
            conn.query(sql, values, (error, result) => {
                const response = {
                    mensagem: 'Cliente inserido com sucesso',
                    clienteCadastrado: {
                        nome: req.body.nome,
                        tipo_pessoa: req.body.tipo_pessoa,
                        cnp: req.body.cnp,
                        contato: {
                            telefone: req.body.telefone,
                            email: req.body.email,
                            tipo: req.body.tipo,
                        },
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um cliente'
                        }
                    }
                }
                return res.status(201).send(response);
            });

        });
    });
});

// router.post('/', (req, res, next) => {
//     mysql.getConnection((error, conn) => {
//         if (error) { return res.status(500).send({ error: error }) }
//         conn.query(
//             "INSERT INTO cliente (nome, tipo_pessoa, cnp) VALUES (?, ?, ?)",
//             [req.body.nome, req.body.tipo_pessoa, req.body.cnp],
//             (error, result, field) => {
//                 conn.release();
//                 if (error) { return res.status(500).send({ error: error, response: null }) }
//                 const response = {
//                     mensagem: 'Cliente inserido com sucesso',
//                     clienteCadastrado: {
//                         id: result.id,
//                         nome: req.body.nome,
//                         tipo_pessoa: req.body.tipo_pessoa,
//                         cnp: req.body.cnp,
//                         request: {
//                             tipo: 'POST',
//                             descricao: 'Insere um cliente'
//                         }
//                     }
//                 }
//                 return res.status(201).send(response);
//             }
//         )
//     });
// });

router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT CLI.id, CLI.nome, CLI.tipo_pessoa, CLI.cnp, CO.telefone, CO.email, CO.tipo FROM cliente CLI 
            LEFT OUTER JOIN contato CO on CO.pessoa = CLI.id
            WHERE CLI.id = ? `,
            [req.params.id],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error, response: null }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: "Não foi encontrado o cliente"
                    })
                }
                const response = {
                    cliente: {
                        id: result[0].id,
                        nome: result[0].nome,
                        tipo_pessoa: result[0].tipo_pessoa,
                        cnp: result[0].cnp,
                        contato: {
                            telefone: result[0].telefone,
                            email: result[0].email,
                            celular: result[0].celular,
                        },
                        request: {
                            tipo: 'POST',
                            descricao: 'Retorna um cliente',
                        }
                    }
                }
                return res.status(201).send(response);
            }
        );
    });
});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE CLIENTE C 
            LEFT OUTER JOIN CONTATO CO ON C.id = CO.pessoa 
                SET 
                    C.nome = ?, 
                    C.tipo_pessoa = ?, 
                    C.cnp = ?, 
                    CO.telefone = ?, 
                    CO.email = ?, 
                    CO.tipo = ?, 
                    C.status = ?, 
                where C.id = ? `,
            [req.body.nome, req.body.tipo_pessoa, req.body.cnp, req.body.telefone, req.body.email, req.body.tipo, req.body.status, req.body.id],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error, response: null }) }
                const response = {
                    mensagem: 'Cliente atualizado com sucesso',
                    clienteAtualizado: {
                        id: req.body.id,
                        nome: req.body.nome,
                        tipo_pessoa: req.body.tipo_pessoa,
                        cnp: req.body.cnp,
                        contato: {
                            telefone: req.body.telefone,
                            email: req.body.email,
                            tipo: req.body.tipo,
                        },
                        request: {
                            tipo: 'PATCH',
                            descricao: 'Atualiza um cliente',
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
});


module.exports = router;