require('dotenv').config()
const connection = require('../database/connection')
const { json } = require('express')
const { body } = require('express-validator')
const { validationResult } = require('express-validator')
const EnderecosController = require('./EnderecosController')

module.exports = {
  
  async create (req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return;
      }
      const { latitude, longitude } = req.body
      const { nome, cpf } = req.body.denunciante
      const { titulo, descricao } = req.body.denuncia

      const endereco = await EnderecosController.getEndereco(req.body.latitude, req.body.longitude)

      if (endereco.pais && endereco.estado && endereco.cidade) {
        await connection('denuncias').insert({
          latitude: latitude,
          longitude: longitude,
          denunciante_nome: nome,
          denunciante_cpf: cpf,
          titulo: titulo,
          descricao: descricao,
          logradouro: endereco.logradouro,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
          pais: endereco.pais,
          cep: endereco.cep
        })
        .returning('id')
        .then(async ([id]) => {
          res.status(201).json({
            data: {
              id: id,
              latitude,
            longitude,
            denunciante: {
              nome,
              cpf
            },
            denuncia: {
              titulo,
              descricao
            },
            endereco: endereco
            }
          })
        })
      } else {
        res.status(404).json({
          error: {
            message: 'Endereço não encontrado para essa localidade.' ,
            code: '02'
          }
        })
      }
    } catch (error) {
      console.log(error)
        return res.status(400).json(error.response.data)
    }
  },

  async list(req, res) {
    await connection('denuncias').select()
    .then(async denuncias => {
      res.status(200).json(denuncias)
     });
  },

  validate (method) {
    switch (method) {
      case 'create': {
        return [ 
          body('longitude', 'Campo obrigatório').notEmpty(),
          body('latitude', 'Campo obrigatório').notEmpty(),
          body('denunciante.nome', 'Campo obrigatório').notEmpty(),
          body('denunciante.cpf', 'Campo obrigatório').notEmpty(),
          body('denuncia.titulo', 'Campo obrigatório').notEmpty(),
          body('denuncia.descricao', 'Campo obrigatório').notEmpty(),
        ]   
      }
    }
  },
}
