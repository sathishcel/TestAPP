process.env.NODE_ENV = 'test'
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const securityConfig = require('../config/security-config')
const dbConfig = require('../config/database-config')
const knex = require('knex')(dbConfig)
const responseMessages = require('../config/testmessage')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
let should = chai.should()
let expect = chai.expect
const mockData = require('./data')
let ServerAddr = 'http://localhost:4000'
let HEADERINFO = '/header-info'
const USERNAME =  mockData.user1.email
const PASSWORD = 'Cel@123'
const HELPER = require('./common-functions')


chai.use(chaiHttp)

describe('Header Information', function () {
  before(function (done) {
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('predefined_themes').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex.insert(mockData.roleData).into('roles').then(function (id) {})
    knex.insert([mockData.user1, mockData.user2]).into('users').then(function (id) {})
    knex.insert([mockData.employee1, mockData.employee2]).into('employees').then(function (id) {})
    knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_factors).into('permissions').then(function (id) {
      console.log('Permissions data inserted')
    })
    knex.insert(mockData.predefinedThemes).into('predefined_themes').then(function (id) {
      console.log('Predefined themes data inserted')
    })
    knex.insert(mockData.organization1).into('organizations').then(function (id) {
      console.log('Organization data inserted')
      knex.insert(mockData.themeData).into('theme_settings').then(function (id) {})
    }).finally(function () {
      console.log('ThemeSettings data inserted')
      done()
    })
  })

  after(function (done) {
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('predefined_themes').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex('org_address').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {})
    done()
  })

  it(responseMessages.header.headerInfo, (done) => {
    HELPER.get_token(USERNAME, PASSWORD).then((token) => {
      console.log(token)
      chai.request(ServerAddr)
        .get(HEADERINFO)
        .end((err, res) => {
          console.log(res)
          expect(err.response.error.status).to.eql(401)
          expect(err.response.error.text).to.eql(responseMessages.employee.onlyUnauthorized)
          done()
        })
    })
  }).timeout(50000)
  it(responseMessages.header.shouldGetHeaderInfo, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(HEADERINFO)
        .set('Authorization', token)
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.header.SucessfullyInfo)
          done()
        })
    })
  }).timeout(50000)
  it(responseMessages.header.firstName, (done) => {
    HELPER.get_token(USERNAME, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(HEADERINFO)
        .set('Authorization', token)
        .end((err, res) => {
          console.log(err)
          expect(res.body.headerInfo.userName.length).to.eql(0)
          done()
        })
    })
  }).timeout(50000)
})
