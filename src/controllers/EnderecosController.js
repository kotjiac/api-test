require('dotenv').config()
const axios = require('axios').default
const util = require('util')

module.exports = {
  async getEndereco (lat, lng) {
    var options = {
      method: 'POST',
      url: process.env.INTERNAL_CACHE_URL,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        latitude: lat, longitude: lng
       }
    }
    var response = await axios.request(options)
    endereco = {
      logradouro: response.data.logradouro,
      bairro: response.data.bairro,
      cidade: response.data.cidade,
      estado: response.data.estado,
      pais: response.data.pais,
      cep: response.data.cep
    }
    return endereco
  }
}