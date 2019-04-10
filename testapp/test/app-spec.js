/* Below is Test DB configuration
export DATABASE_URL="pg://postgres:postgres@localhost:5432/ewa_test"
./node_modules/db-migrate/bin/db-migrate up */

process.env.NODE_ENV = 'test'
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const securityConfig = require('../config/security-config')
const dbConfig = require('../config/database-config')
const knex = require('knex')(dbConfig)
const responseMessages=require('../config/testmessage')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
let should = chai.should()
let expect = chai.expect
let serverAddress = 'http://localhost:4000'
const mockData = require('./data')

chai.use(chaiHttp)
let user1 = { email: 'ewaemployee@celestialsys.com', password: bcrypt.hashSync('Cel@123', securityConfig.saltRounds), role_id: 2, firstname: 'Celestial', lastname: 'User', status: 2 }
let organization1 = { name: 'Celestial' }
let employee1 = { emp_id: 1, org_id: 1, user_id: 1, theme_settings_id: 1, firstname: 'Celestial', lastname: 'User' }
let themeData = [{
  org_id: 1,
  settingPageData: [{
    type: 'radioButton',
    fieldName: '',
    key: 'isImage',
    value: true
  }, {
    type: 'radioButton',
    fieldName: '',
    key: 'isLight',
    value: false
  }, {
    type: 'selectBox',
    fieldName: 'Font Family',
    key: 'fontFamily',
    value: 'Arial'
  }, {
    type: 'image',
    fieldName: 'Organization Logo',
    key: 'organizationLogo',
    value: 'samplImage.jpg'
  }, {
    type: 'image',
    fieldName: 'Background Image',
    key: 'backgroundImage',
    value: 'samplImage.jpg'
  }, {
    type: 'image',
    fieldName: 'Header Image',
    key: 'headerImage',
    value: 'samplImage.jpg'
  }, {
    type: 'image',
    fieldName: 'User Panel Image',
    key: 'userPanelImage',
    value: 'samplImage.jpg'
  }, {
    type: 'colorPicker',
    fieldName: 'Background Color',
    key: 'backgroundColor',
    value: '#fffff'
  }, {
    type: 'colorPicker',
    fieldName: 'Header Color',
    key: 'headerColor',
    value: '#00000'
  }, {
    type: 'colorPicker',
    fieldName: 'User Panel Color',
    key: 'userPanelColor',
    value: '#fffddd'
  }]
}]
let API = '/login'

describe('LOGIN', function () {
  before(function (done) {
    knex('permissions').truncate().then(function (id) {})
    knex.insert(mockData.groupData).into('groups').then(function (id) {})
    knex.insert(mockData.gradeData).into('grades').then(function (id) {})
    knex.insert(mockData.roleData).into('roles').then(function (id) {})
    knex.insert(mockData.user2).into('users').then(function (id) {})
    knex.insert(mockData.organization1).into('organizations').then(function (id) {})
    knex.insert(mockData.themeData).into('theme_settings').then(function (id) {})
    knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_factors).into('permissions').then(function (id) {
      console.log('Permissions data inserted')
      knex.insert(mockData.employee1).into('employees').then(function (id) {
        done()
      })
    })
   
  })

  after(function (done) {
    knex('grades').truncate().then(function (id) {})
    knex('groups').truncate().then(function (id) {})
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {})
    done()
  })

  describe('/POST login', function () {
    it(responseMessages.login.userCredentials, function (done) {
      chai.request(serverAddress)
        .get(API).send({
          email: 'ewaemployee@celsysemail.celsyswtc.in',
          password: 'Cel@123'
        })
        .end((err, res) => {
          if (err) {
              console.log('=========================error')
              console.log(res.body)
              res.body.error.code.should.equal(404)
              res.body.error.message.should.equal(responseMessages.app.NOT_FOUND)
              done()
          } else {
              console.log(res.body)
            res.body.responseCode.should.equal(404)
            res.body.message.should.equal(responseMessages.app.NOT_FOUND)
            done()
          }
        })
    })
  })
})
