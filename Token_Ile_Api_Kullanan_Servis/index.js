const express = require('express')
const app = express()
const port = 3456
var fs = require('fs');
const { spawn } = require('child_process');
const fetch = require("node-fetch")
var cors = require('cors')

app.use(cors())

app.get('/tokenal', (req, res) => {
  const token = fs.readFileSync('/home/ubuntu/token', 'utf8')
  console.log("TOKEN", token)
  res.send(token)
}
)

app.get('/izmirimkart', (req, res) => {
  const token = fs.readFileSync("/home/ubuntu/token", "utf8")
  fetch('https://mobilapp.eshot.gov.tr/api/mKullanicilar', {
    method: 'POST',
    headers: {
      'Host': 'mobilapp.eshot.gov.tr',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'Content-Length': '216',
      'User-Agent': 'ESHOTv2/2.19 (com.ibb.eshotApp; build:1; iOS 16.3.0) Alamofire/2.19',
      'Accept-Language': 'en-TR;q=1.0, tr-TR;q=0.9',
      'Authorization': 'Bearer ' + JSON.parse(token).access_token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'HatBildirimi': true,
      'DurakBildirimi': true,
      'IsletimSistemiId': 1,
      'UygulamaVersiyonId': '2.19',
      'BakiyeBildirimi': true,
      'IsletimSistemiVersiyon': '16.3',
      'PushTokenId': '',
      'UygulamaId': '7686E1F0-937E-567C-9883-F1C96CC3AD95'
    })
  })
    .then(response => response.json())
    .then(a => {
      //	res.send(a)	
     // console.log(a.KullaniciId)

      fetch('https://mobilapp.eshot.gov.tr/api/mIzmirimKartlar', {
        method: 'POST',
        headers: {
          'Host': 'mobilapp.eshot.gov.tr',
          'Accept': '*/*',
          'Connection': 'keep-alive',
          'Content-Length': '155',
          'User-Agent': 'ESHOTv2/2.19 (com.ibb.eshotApp; build:1; iOS 16.3.0) Alamofire/2.19',
          'Accept-Language': 'en-TR;q=1.0, tr-TR;q=0.9',
          'Authorization': 'Bearer ' + JSON.parse(token).access_token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'KartAdi': 'test',
          'Bakiye': '',
          'SiraNo': 2,
          'KartId': '',
          'VarsayilanKartMi': false,
          'KullaniciId': a.KullaniciId,
          //'AliasNo': '23145747946'
          'AliasNo': req.query.kartno
        })
      }).then(a => a.text())
      .then(c=>{
        fetch('https://mobilapp.eshot.gov.tr/api/mIzmirimKartlar/' + a.KullaniciId, {
          headers: {
            'Host': 'mobilapp.eshot.gov.tr',
            'Connection': 'keep-alive',
            'User-Agent': 'ESHOTv2/2.19 (com.ibb.eshotApp; build:1; iOS 16.3.0) Alamofire/2.19',
            'Accept-Language': 'en-TR;q=1.0, tr-TR;q=0.9',
            'Authorization': "Bearer " + JSON.parse(token).access_token
          }
        }).then(a => a.json())
        .then(k=>res.send(k))
      })
    })
})


app.get('/otobusler', (req, res) => {
  let token = fs.readFileSync('/home/ubuntu/token', 'utf8')
  //console.log("Bearer " + JSON.parse(token).access_token)
  fetch("https://mobilapp.eshot.gov.tr/api/YaklasanOtobusler/" + req.query.durak, { headers: { "Authorization": "Bearer " + JSON.parse(token).access_token } })
    .then(response => response.json())
    .then(a => res.send(a)).catch(e => console.log(e))
}
)


app.get("/gentoken", (req, res) => {
  spawn("/home/ubuntu/tokenal")
  const token = fs.readFileSync('/home/ubuntu/token', 'utf8')
  console.log("TOKEN", token)
  res.send(token)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
