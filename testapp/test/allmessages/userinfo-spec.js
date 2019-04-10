process.env.NODE_ENV = 'test'
const dbConfig = require('../../config/database-config')
const responseMessages=require('../../config/testmessage')
const knex = require('knex')(dbConfig)

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../app')
let should = chai.should()
let expect = chai.expect
let ServerAddr = 'http://localhost:4000'
let USERINFO = './userInfo'
let ORGCONFIG = './userInfo/organizationConfig'
const USERNAME = 'ewaemployee@celestialsys.com'
const PASSWORD = 'Cel@123'
const HELPER = require('../common-functions')
const mockData = require('../data')

chai.use(chaiHttp)

describe('Header Information', function () {
  before(function (done) {
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('predefined_themes').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {})
    knex.insert(mockData.roleData).into('roles').then(function (id) {})
    knex.insert([mockData.user1, mockData.user2]).into('users').then(function (id) {})
    knex.insert([mockData.employee1, mockData.employee2]).into('employees').then(function (id) {})
    knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_factors).into('permissions').then(function (id) {
      console.log('Permissions data inserted')
    })
    knex.insert(mockData.orgAddressInfo).into('org_address').then(function (id) {
      console.log('OrgAddress data inserted')
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
    knex('permissions').truncate().then(function (id) {})
    knex('org_address').truncate().then(function (id) {})
    knex('bank_info').truncate().then(function (id) {})
    knex('govt_accounts').truncate().then(function (id) {})
    knex('govt_docs').truncate().then(function (id) {})
    knex('groups').truncate().then(function (id) {})
    knex('grades').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {
      done()
    })
  })

  it(responseMessages.userinfo.getError, (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .get(USERINFO)
        .end((err, res) => {
          console.log(res)
          expect(err.response.error.status).to.eql(401)
          expect(err.response.error.text).to.eql(testMessages.employee.onlyUnauthorized)
          done()
        })
    })
  })
  it(responseMessages.userinfo.getUserInfomation, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(USERINFO)
        .set('Authorization', token)
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.userinfo.sucessfullySendInformation)
          done()
        })
    })
  })
  it(responseMessages.userinfo.getOrganization, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(ORGCONFIG)
        .set('Authorization', token)
        .end((err, res) => {
          console.log(err)
          res.body.body.responseCode.should.equal(2000)
          done()
        })
    })
  })
})
