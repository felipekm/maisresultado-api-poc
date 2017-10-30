const express = require('express')
const soap = require('soap')

const app = express()
const PORT = 3000

const soapUrl = `http://api.maisresultado.com.br/sms2/pgsms.php?wsdl`

const maisResultadoObj = {
  token: 'YOUR_API_TOKEN',
  carteira: '01',
  returnType = 'JSON'
}

soap.createClient(soapUrl, (err, client) => {

  app.get('/', (req, res) => {
    res.send('Welcome to NodeJS Soap POC')
  })

  app.get('/ping', (req, res) => {
    res.send('pong')
  })

  app.get('/envia-avulso', (req, res) => {
    const args = {
      'token': maisResultadoObj.token,
      'carteira': maisResultadoObj.carteira,
      'msg': 'veado',
      'fones': '51996141854',
      'data': '2017-10-30 11:36:00',
      'dadocliente': 'pling',
      'retorno': maisResultadoObj.returnType
    }

    client.envioAvulso(args, (err, result) => {
      res.send(result.return.$value ? JSON.parse(result.return.$value) : 'ERRO');
    });
  })

  app.listen(PORT, () => console.log(`Running at ${PORT}`))
})

