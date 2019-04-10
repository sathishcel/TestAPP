let chai = require('chai')
let chaiHttp = require('chai-http')
let chaiJSON = require('chai-json-schema')
let should = chai.should()
let expect = chai.expect()
chai.use(chaiHttp)
chai.use(chaiJSON)

const server = 'http://localhost:4000'
const API = '/login'
const Promise = require('bluebird')

module.exports = {
  get_token: function (USERNAME, PASSWORD) {
    return new Promise((resolve, reject) => {
      chai.request(server)
        .post(API).send({
          email: USERNAME,
          password: PASSWORD
        })
        .end((err, res) => {
          if (res) {
            resolve(res.body.user.accessToken)
          } else {
            reject(err)
          }
        })
    })
  }
}