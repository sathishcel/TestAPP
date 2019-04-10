process.env.NODE_ENV = 'test'
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const securityConfig = require('../../../config/security-config')
const dbConfig = require('../../../config/database-config')
const knex = require('knex')(dbConfig)
const Jwt = require('../../common-functions')
const mockData = require('../../data')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../../app')
let should = chai.should()
let expect = chai.expect
let ServerAddr = 'http://localhost:4000'
const USERNAME = mockData.user1.email
const PASSWORD = 'Cel@123'
const testMessages = require('../../../config/testmessage')
chai.use(chaiHttp)
const GETPRETHEMEAPI = '/admin/themes/predefinedThemes'

const HELPER = require('../../common-functions')

describe(testMessages.employee.controllerName, function () {
  before(function (done) {
    knex.insert(mockData.roleData).into('roles').then(function (id) {})
    knex.insert([mockData.user1, mockData.user2]).into('users').then(function (id) {})
    knex.insert(mockData.organization1).into('organizations').then(function (id) {})
    knex.insert(mockData.themeData).into('theme_settings').then(function (id) {})
    knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_factors).into('permissions').then(function (id) {
      console.log('Permissions data inserted')
    })
    knex.insert([mockData.employee1, mockData.employee2, mockData.employee3, mockData.employee4]).into('employees').then(function (id) {
      done()
    })
  })
  after(function (done) {
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {
      done()
    })
  })
  it('should get predefined theme settings if only admin user', function (done) {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .get(GETPRETHEMEAPI)
        .set('Authorization', token)
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(401)
          res.body.message.should.equal('Permission denied')
          done()
        })
    }).catch(function (err) {
      console.log(err)
      done()
    })
  }).timeout(50000)
  
  it('should get predefined theme settings data', function (done) {
    HELPER.get_token(USERNAME, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GETPRETHEMEAPI)
        .set('Authorization', token)
        .end((err, res) => {
          console.log(err)
          expect(res).to.be.status(200)
          res.body.should.be.a('object')
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal('Sucessfully sent Predefined Theme settings')
          done()
        })
    }).catch(function (err) {
      console.log(err)
      done()
    })
  }).timeout(50000)
})
