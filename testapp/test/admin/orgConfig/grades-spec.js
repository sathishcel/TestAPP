// process.env.NODE_ENV = 'test'
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const securityConfig = require('../../../config/security-config')
const dbConfig = require('../../../config/database-config')
const knex = require('knex')(dbConfig)
const responseMessages = require('../../../config/testmessage')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../../app')
let should = chai.should()
let expect = chai.expect
let Grade = require('../../../models/admin/orgConfig/grades')

chai.use(chaiHttp)

let ServerAddr = 'http://localhost:4000'
const mockData = require('../../data')

const ADDGRADE = '/admin/grades/addGradeInfo'
const EDITGRADE = '/admin/grades/editGradeInfo'
const DELETEGRADE = '/admin/grades/deleteGradeInfo'
const GRADELIST = '/admin/grades/gradeList'

const HELPER = require('../../common-functions')
const schema = require('../../../schema/admin/theme-settings')
const path = require('path')
const PASSWORD = 'Cel@123'

describe('Grades CRUD operation', function () {
  // Before executing test case
  before(function (done) {

    knex('grades').truncate().then(function (id) {})
    knex('groups').truncate().then(function (id) {})
    knex('roles').truncate().then(function (id) {})    
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {

    })
    knex.insert(mockData.groupData).into('groups').then(function (id) {})
    knex.insert(mockData.gradeData).into('grades').then(function (id) {})
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
  // After executing test case
  after(function (done) {
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex('grades').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {
      done()
    })
  })
  it(responseMessages.gradesSpec.gradesTest1, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADDGRADE)
        .set('Authorization', token)
        .send({
          'gradeName': 'A1',
          'gradeDescription': 'first grade1'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.gradesSpec.gradesTest1Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.gradesSpec.gradesTest2, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      let grade = new Grade({org_id: 1, name: 'B1', description: 'Test Grade', updated_by_id: 1})
      grade.save().then((data) => {
        chai.request(ServerAddr)
          .put(EDITGRADE + '/' + data.get('id'))
          .set('Authorization', token)
          .send({
            'gradeName': 'A11',
            'gradeDescription': 'first grade1'
          })
          .end((err, res) => {
            if (err) {
              throw err
            }
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.gradesSpec.gradesTest2Msg)
            done()
          })
      })
    })
  }).timeout(50000)

  it(responseMessages.gradesSpec.gradesTest3Msg, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      let grade = new Grade({org_id: 1, name: 'B1', description: 'Test Grade', updated_by_id: 1})
      grade.save().then((data) => {
        chai.request(ServerAddr)
          .delete(DELETEGRADE + '/' + data.get('id'))
          .set('Authorization', token)
          .end((err, res) => {
            if (err) {
              throw err
            }
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.gradesSpec.gradesTest3Msg)
            done()
          })
      })
    })
  }).timeout(50000)

  it(responseMessages.gradesSpec.gradesTest4, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      let grade = new Grade({org_id: 1, name: 'B1', description: 'Test Grade', updated_by_id: 1})
      grade.save().then((data) => {
        chai.request(ServerAddr)
          .delete(DELETEGRADE + '/10')
          .set('Authorization', token)
          .end((err, res) => {
            if (err) {
              throw err
            }
            res.body.responseCode.should.equal(4020)
            res.body.message.should.equal(responseMessages.gradesSpec.gradesTest4Msg)
            done()
          })
      })
    })
  }).timeout(50000)

  it(responseMessages.gradesSpec.gradesTest5, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      let grade = new Grade({org_id: 1, name: 'B1', description: 'Test Grade', updated_by_id: 1})
      grade.save().then((data) => {
        chai.request(ServerAddr)
          .get(GRADELIST)
          .set('Authorization', token)
          .end((err, res) => {
            if (err) {
              throw err
            }
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.gradesSpec.gradesTest5Msg)
            done()
          })
      })
    })
  }).timeout(50000)

  it(responseMessages.gradesSpec.gradesTest6, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADDGRADE)
        .set('Authorization', token)
        .send({
          'gradeName': 'A1',
          'gradeDescription': 'first grade1'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4017)
            res.body.message.should.equal(responseMessages.gradesSpec.gradesTest6Msg)
            done()
          }
        })
    })
  }).timeout(50000)
})
