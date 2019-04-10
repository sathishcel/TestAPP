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
let Group = require('../../../models/admin/orgConfig/groups')

chai.use(chaiHttp)

let ServerAddr = 'http://localhost:4000'
const mockData = require('../../data')

const ADDGROUP = '/admin/groups/addGroupInfo'
const EDITGROUP = '/admin/groups/editGroupInfo'
const DELETEGROUP = '/admin/groups/deleteGroupInfo'
const GROUPLIST = '/admin/groups/groupsList'
const GROUPCHILDPERM = '/admin/groups/allPermissionsOfGroup'

const HELPER = require('../../common-functions')
const schema = require('../../../schema/admin/theme-settings')
const path = require('path')
const PASSWORD = 'Cel@123'

describe('Groups CRUD operation', function () {
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

    knex.insert(mockData.roleData).into('roles').then(function (id) {})
    knex.insert(mockData.groupData).into('groups').then(function (id) {})    
    knex.insert(mockData.organization1).into('organizations').then(function (id) {})
    knex.insert(mockData.themeData).into('theme_settings').then(function (id) {})
    knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_factors).into('permissions').then(function (id) {})
    console.log('Permissions data inserted')
    knex.insert([mockData.user1, mockData.user2]).into('users').then(function (id) {})
    knex.insert([mockData.employee1, mockData.employee2]).into('employees').then(function (id) {
      done()
    })
  })
  // After executing test case
  after(function (done) {
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('groups').truncate().then(function (id) {})
    knex('grades').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {
      done()
    })
  })

  it(responseMessages.groupSpec.groupSpecTest1, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      console.log(token)
      chai.request(ServerAddr)
        .delete(DELETEGROUP + '/10')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          console.log(res.body)
          res.body.responseCode.should.equal(4021)
          res.body.message.should.equal(responseMessages.groupSpec.groupSpecTest1Msg)
          done()
        })
    })
  }).timeout(50000)
  it(responseMessages.groupSpec.groupSpecTest2, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADDGROUP)
        .set('Authorization', token)
        .send({
          'groupName': 'A1',
          'groupDescription': 'first group1',
          'permissions': [1, 2]
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.groupSpec.groupSpecTest2Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.groupSpec.groupSpecTest3, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADDGROUP)
        .set('Authorization', token)
        .send({
          'groupName': 'A1',
          'groupDescription': 'first group1',
          'permissions': [1, 2]
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(4011)
          res.body.message.should.equal(responseMessages.groupSpec.groupSpecTest3Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.groupSpec.groupSpecTest4, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      let group = new Group({org_id: 1, name: 'B1', description: 'Test Group', permissions: [1, 2], updated_by_id: 1})
      chai.request(ServerAddr)
        .post(ADDGROUP)
        .set('Authorization', token)
        .send({
          'groupName': 'A1',
          'groupDescription': 'first group 2',
          'permissions': [1, 2]
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(4012)
          res.body.message.should.equal(responseMessages.groupSpec.groupSpecTest4Msg)
          done()
        })
    })
  }).timeout(50000)
  it(responseMessages.groupSpec.groupSpecTest5, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      let group = new Group({org_id: 1, name: 'B1', description: 'Test Group', permissions: [1, 2], updated_by_id: 1})

      group.save().then((data) => {
        chai.request(ServerAddr)
          .put(EDITGROUP + '/' + data.get('id'))
          .set('Authorization', token)
          .send({
            'groupName': 'A11',
            'groupDescription': 'first group1',
            'permissions': [1, 2, 3]
          })
          .end((err, res) => {
            if (err) {
              throw err
            }
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.groupSpec.groupSpecTest5Msg)
            done()
          })
      })
    })
  }).timeout(50000)

  it(responseMessages.groupSpec.groupSpecTest6, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GROUPCHILDPERM)
        .set('Authorization', token)
        .query({'group': 10})
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(4019)
          res.body.message.should.equal(responseMessages.groupSpec.groupSpecTest6Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.groupSpec.groupSpecTest7GroupMissing, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GROUPCHILDPERM)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(4071)
          res.body.message.should.equal(responseMessages.groupSpec.groupMissing)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.groupSpec.groupSpecTest7, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GROUPCHILDPERM)
        .set('Authorization', token)
        .query({'group': 1})
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.groupSpec.groupSpecTest7Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.groupSpec.groupSpecTest8, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      // let group = new Group({org_id: 1, name: 'B1', description: 'Test Group', updated_by_id: 1})
      chai.request(ServerAddr)
        .get(GROUPLIST)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.groupSpec.groupSpecTest8Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.groupSpec.groupSpecTest9, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      let group = new Group({org_id: 1, name: 'B1', description: 'Test Group', updated_by_id: 1})

      group.save().then((data) => {
        chai.request(ServerAddr)
          .delete(DELETEGROUP + '/' + data.get('id'))
          .set('Authorization', token)
          .end((err, res) => {
            if (err) {
              throw err
            }
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.groupSpec.groupSpecTest9Msg)
            done()
          })
      })
    })
  }).timeout(50000)

  it(responseMessages.groupSpec.groupSpecTest10, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .delete(DELETEGROUP + '/10')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(4021)
          res.body.message.should.equal(responseMessages.groupSpec.groupSpecTest10Msg)
          done()
        })
    })
  }).timeout(50000)
})
