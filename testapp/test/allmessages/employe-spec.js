process.env.NODE_ENV = 'test'
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const securityConfig = require('../../config/security-config')
const dbConfig = require('../../config/database-config')
const responseMessages=require('../../config/testmessage')
const knex = require('knex')(dbConfig)
const Jwt = require('../common-functions')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../app')
let should = chai.should()
let expect = chai.expect
let server_address = 'http://localhost:4000'
const mockData = require('../data')
chai.use(chaiHttp)
let user1 = { email: 'ewaadmin@celestialsys.com', password: bcrypt.hashSync('admin@!2$', securityConfig.saltRounds), role_id: 1, firstname: 'Celestial', lastname: 'Admin', status: 2 }
let user2 = { email: 'ewaemployee@celestialsys.com', password: bcrypt.hashSync('Cel@123', securityConfig.saltRounds), role_id: 2, firstname: 'Celestial', lastname: 'User', status: 2 }
let organization1 = { name: 'Celestial' }
let employee1 = { emp_id: 1, org_id: 1, user_id: 1, theme_settings_id: 1, firstname: 'Celestial', lastname: 'Admin' }
let employee2 = { emp_id: 2, org_id: 1, user_id: 2, theme_settings_id: 1, firstname: 'Celestial', lastname: 'Admin' }
let organizaionList = ['Celestial', 'CelestialSys']
var roleData = [{ name: 'admin', created_at: new Date(), updated_at: new Date() }, { name: 'employee', created_at: new Date(), updated_at: new Date() }]
let newUser1 = {
  'email': 'v1@gmail.com',
  'orgName': organizaionList[0],
  'firstname': 'v1',
  'lastname': 'k1',
  'roleId': '2',
  'age': '34',
  'sex': '1',
  'dob': '1980-09-09',
  'doj': '2014-09-09',
  'position': 'Developer',
  'mobileNumber': '1234567890',
  'workLocation': 'Jayanagar'
}
let newUser2 = {
  'email': 'v1@gmail.com',
  'orgName': organizaionList[1],
  'firstname': 'v1',
  'lastname': 'k1',
  'roleId': '2',
  'age': '34',
  'sex': '1',
  'dob': '1980-09-09',
  'doj': '2014-09-09',
  'position': 'Developer',
  'mobileNumber': '1234567890',
  'workLocation': 'Jayanagar'
}
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
let getApi = './admin/employeesettings/employeeList'
let addApi = './admin/employeesettings/adduser'
let deleteApi = './admin/employeesettings/removeuser'
let otcApi = './admin/employeesettings/employee'

describe(responseMessages.employee.controllerName, function () {
  before(function (done) {
    knex.insert(roleData).into('roles').then(function (id) {})
    knex.insert([user1, user2]).into('users').then(function (id) {})
    knex.insert(organization1).into('organizations').then(function (id) {})
    knex.insert(themeData).into('theme_settings').then(function (id) {})
    knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_factors).into('permissions').then(function (id) {
      console.log('Permissions data inserted')
    })
    knex.insert([employee1, employee2]).into('employees').then(function (id) {
      done()
    })
  })
  after(function (done) {
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {
      done()
    })
  })

  describe(responseMessages.employee.addUserApi, function () {
    it(responseMessages.employee.unauthorized, function (done) {
      chai.request(server_address)
        .post(addApi).send(newUser1)
        .end((err, res) => {
          expect(err.response.error.status).to.eql(401)
          expect(err.response.error.text).to.eql(responseMessages.employee.onlyUnauthorized)
          done()
        })
    })

    it(responseMessages.employee.authorized, function (done) {
      Jwt.get_token(user1.email, 'admin@!2$').then((token) => {
        chai.request(server_address)
          .post(addApi).send(newUser1)
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.employee.SuccessfullyAddEmp)
            res.body.email.should.equal(newUser1.email)
            done()
          })
      })
    })
    it(responseMessages.employee.getAllUser, function (done) {
      Jwt.get_token(user1.email, 'admin@!2$').then((token) => {
        chai.request(server_address)
          .get(getApi)
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.employee.successfullySend)
            done()
          })
      })
    })
    it(responseMessages.employee.checkOrgName, function (done) {
      Jwt.get_token(user1.email, 'admin@!2$').then((token) => {
        chai.request(server_address)
          .post(addApi).send(newUser2)
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            res.body.message.should.equal(responseMessages.employee.OrgName)
            done()
          })
      })
    })

    it(responseMessages.employee.chekUserExt, function (done) {
      Jwt.get_token(user1.email, 'admin@!2$').then((token) => {
        chai.request(server_address)
          .post(addApi).send(newUser1)
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            res.body.responseCode.should.equal(2107)
            res.body.message.should.equal(responseMessages.employee.emailAlreadyExit)
            done()
          })
      })
    })

    it(responseMessages.employee.fieldsMandatory, function (done) {
      Jwt.get_token(user1.email, 'admin@!2$').then((token) => {
        chai.request(server_address)
          .post(addApi).send({})
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            res.body.message.should.equal(responseMessages.employee.fieldsAreNotFormate)
            done()
          })
      })
    })

    it(responseMessages.employee.fieldBlank, function (done) {
      Jwt.get_token(user1.email, 'admin@!2$').then((token) => {
        chai.request(server_address)
          .post(addApi).send({email: ''})
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            res.body.message.should.equal(responseMessages.employee.fieldsAreNotFormate)
            done()
          })
      })
    })

    it(responseMessages.employee.roleAccssPrms, function (done) {
      Jwt.get_token(user2.email, 'Cel@123').then((token) => {
        chai.request(server_address)
          .post(addApi).send({})
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            res.body.responseCode.should.equal(401)
            res.body.message.should.equal(responseMessages.employee.permissionDenied)
            done()
          })
      })
    })

    it(responseMessages.employee.getOtcEmp, function (done) {
      Jwt.get_token(user2.email, 'Cel@123').then((token) => {
        chai.request(server_address)
          .get(otcApi)
          .query({ 'email': newUser1.email }).send({})
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.employee.successfullySentEmpOtc)
            res.body.should.have.property('OTC')
            done()
          })
      })
    })
  })

  describe(responseMessages.employee.removeUserApi, function () {
    it(responseMessages.employee.deleteUseEmp, function (done) {
      chai.request(server_address)
        .delete(deleteApi)
        .query({ 'email': newUser1.email })
        .send()
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.employee.SuccessfullyDelete + newUser1.email)
          done()
        })
    })

    it(responseMessages.employee.invalidEmail, function (done) {
      chai.request(server_address)
        .delete(deleteApi)
        .query({ 'email': 'unknown@celestialsys.com' })
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.employes.noUser)
          done()
        })
    })
  })
})
