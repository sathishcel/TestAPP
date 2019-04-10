process.env.NODE_ENV = 'test'
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
let Role = require('../../../models/admin/orgConfig/roles')

chai.use(chaiHttp)

let ServerAddr = 'http://localhost:4000'
const mockData = require('../../data')

const ADDROLE = '/admin/roles/addRole'
const EDITROLE = '/admin/roles/editRole'
const ROLELIST = '/admin/roles/getAllRoles'
const DELETEROLE = '/admin/roles/deleteRole'

const HELPER = require('../../common-functions')
const schema = require('../../../schema/admin/theme-settings')
const path = require('path')
const  PASSWORD = 'Cel@123'

describe('Role CRUD operation', function () {
  // Before executing test case
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
    knex.insert(mockData.groupData).into('groups').then(function (id) {})
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
    knex('groups').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {
      done()
    })
  })

  it(responseMessages.rolesSpec.rolesSpecTest1PermissionDenied, (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADDROLE)
        .set('Authorization', token)
        .send({
          'roleName': 'Test Role',
          'roleDescription': 'Test role Description',
          'roleGroup': 1,
          'permissions': [1, 2, 3]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(401)
            res.body.message.should.equal(responseMessages.rolesSpec.rolesSpecTest1MsgPermissionDenied)
            done()
          }
        })
    })
  }).timeout(20000)

  it(responseMessages.rolesSpec.rolesSpecTest1, (done) => {
    HELPER.get_token(mockData.user1.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADDROLE)
        .set('Authorization', token)
        .send({
          'roleName': 'Test Role',
          'roleDescription': 'Test role Description',
          'roleGroup': 1,
          'permissions': [1, 2, 3]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.rolesSpec.rolesSpecTest1Msg)
            done()
          }
        })
    })
  }).timeout(20000)

  it(responseMessages.rolesSpec.rolesSpecTest1SimilarRole, (done) => {
    HELPER.get_token(mockData.user1.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADDROLE)
        .set('Authorization', token)
        .send({
          'roleName': 'Test Role',
          'roleDescription': 'Test role Description',
          'roleGroup': 1,
          'permissions': [1, 2, 3]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4009)
            res.body.message.should.equal(responseMessages.rolesSpec.similarRoleExit)
            done()
          }
        })
    })
  }).timeout(20000)

  it(responseMessages.rolesSpec.rolesSpecTest1SimilarRoleName, (done) => {
    HELPER.get_token(mockData.user1.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADDROLE)
        .set('Authorization', token)
        .send({
          'roleName': 'Test Role',
          'roleDescription': 'Test role 2 Description',
          'roleGroup': 1,
          'permissions': [1, 2, 3]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4010)
            res.body.message.should.equal(responseMessages.rolesSpec.similarRoleNameExit)
            done()
          }
        })
    })
  }).timeout(20000)

  it(responseMessages.rolesSpec.rolesSpecTest2PermissionDenied, (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {      
      chai.request(ServerAddr)
        .put(EDITROLE + '/2')
        .set('Authorization', token)
        .send({
          'roleName': 'Edit Role1',
          'roleDescription': 'Edit First Role1',
          'roleGroup': 1,
          'permissions': [1, 2, 3, 4]
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(401)
          res.body.message.should.equal(responseMessages.rolesSpec.rolesSpecTest2MsgPermissionDenied)
          done()
        })   
    })
  }).timeout(20000)

  it(responseMessages.rolesSpec.rolesSpecTest2, (done) => {
    HELPER.get_token(mockData.user1.email, 'Cel@123').then((token) => {      
      chai.request(ServerAddr)
        .put(EDITROLE + '/2')
        .set('Authorization', token)
        .send({
          'roleName': 'Edit Role1',
          'roleDescription': 'Edit First Role1',
          'roleGroup': 1,
          'permissions': [1, 2, 3, 4]
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.rolesSpec.rolesSpecTest2Msg)
          done()
        })   
    })
  }).timeout(20000)


  it(responseMessages.rolesSpec.rolesSpecTest5PermissionDenied, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .delete(DELETEROLE + '/2')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(401)
          res.body.message.should.equal(responseMessages.rolesSpec.rolesSpecPermissionDenied)
          done()
        })
    })
  }).timeout(20000)

  it(responseMessages.rolesSpec.rolesSpecTest3, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {      
      chai.request(ServerAddr)
        .delete(DELETEROLE + '/2')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.rolesSpec.rolesSpecTest3Msg)
          done()
        })    
    })
  }).timeout(20000)

  it(responseMessages.rolesSpec.rolesSpecTest4PermissionDenied, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(ROLELIST)
        .set('Authorization', token)
        .query({'group': 1})
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(401)
          res.body.message.should.equal(responseMessages.rolesSpec.rolesSpecListPermissionDenied)
          done()
        })
    })
  }).timeout(20000)

  it(responseMessages.rolesSpec.rolesSpecTest4GroupMissing, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(ROLELIST)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(4071)
          res.body.message.should.equal(responseMessages.rolesSpec.groupMissing)
          done()
        })
    })
  }).timeout(20000)

  it(responseMessages.rolesSpec.rolesSpecTest4, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(ROLELIST)
        .set('Authorization', token)
        .query({'group': 1})
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.rolesSpec.rolesSpecTest4Msg)
          done()
        })
    })
  }).timeout(20000)

  it(responseMessages.rolesSpec.rolesSpecTest5, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .delete(DELETEROLE + '/10')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(4022)
          res.body.message.should.equal(responseMessages.rolesSpec.rolesSpecTest5Msg)
          done()
        })
    })
  }).timeout(20000)
})
