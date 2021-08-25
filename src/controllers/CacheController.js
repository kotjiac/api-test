require('dotenv').config()
const axios = require('axios').default
const redis = require('redis')
const Geohash = require('ngeohash')

const  client = redis.createClient(process.env.REDIS_ENDPOINT_URI)

module.exports = {
  async getReverseGeocode(req, res) {
    try {
      var options = {
        method: 'POST',
        url: process.env.MAPQUEST_API_URL,
        params: {key: process.env.MAPQUEST_API_KEY},
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          location: {latLng: {lat: req.body.latitude, lng: req.body.longitude}},
          options: {thumbMaps: false},
          includeNearestIntersection: false,
          includeRoadMetadata: false
        }
      }
      var response = await axios.request(options)
      if (response.data.info.statuscode.toString() !== '0') {
        res.status(400).json({
          error: {
            message: 'Request inválido.' ,
            code: '01'
          }
        });
      } else {
        endereco = {
          logradouro: response.data.results[0].locations[0].street,
          bairro: response.data.results[0].locations[0].adminArea6,
          cidade: response.data.results[0].locations[0].adminArea5,
          estado: response.data.results[0].locations[0].adminArea3,
          pais: response.data.results[0].locations[0].adminArea1,
          cep: response.data.results[0].locations[0].postalCode
        }
        //console.log('ENDERECO_DIRETO: '  + endereco)   
        var geohash = Geohash.encode(req.body.latitude, req.body.longitude)
        client.setex(geohash, process.env.MAPQUEST_API_CACHE_TIMEOUT, JSON.stringify(endereco));
        res.status(200).json(endereco)
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error
      });
    }
  },
  
  async cacheMiddleware(req, res, next) {
    var geohash = Geohash.encode(req.body.latitude, req.body.longitude)
    client.get(geohash, (error, data) => {
      if (error) throw error;

      if (data !== null) {
        //console.log('ENDERECO_CACHE: '  + JSON.stringify(data))
        res.status(200).json(JSON.parse(data))
      } else {
        next();
      }
    });
  }
}
