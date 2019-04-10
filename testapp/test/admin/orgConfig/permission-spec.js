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
let OrgAddress = require('../../../models/admin/orgConfig/orgAddress')
let BankInfo = require('../../../models/admin/orgConfig/bankInfo')
let GovtAccInfo = require('../../../models/admin/orgConfig/govtAccounts')
let GovtDocInfo = require('../../../models/admin/orgConfig/govtDocs')
const async = require('async')

chai.use(chaiHttp)

let ServerAddr = 'http://localhost:4000'
const mockData = require('../../data')

const PERMISSIONLIST = '/admin/permissions/allPermissions'

const HELPER = require('../../common-functions')
const schema = require('../../../schema/admin/theme-settings')
const path = require('path')
const PASSWORD = 'Cel@123'

describe('Permissions API', function () {
  // Before executing test case
  before(function (done) {
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
    knex('org_address').truncate().then(function (id) {})
    knex('bank_info').truncate().then(function (id) {})
    knex('govt_accounts').truncate().then(function (id) {})
    knex('govt_docs').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {
      done()
    })
  })
  it(responseMessages.permissionSpec.permissionSpecTest, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      // let group = new Group({org_id: 1, name: 'B1', description: 'Test Group', updated_by_id: 1})
      chai.request(ServerAddr)
        .get(PERMISSIONLIST)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.permissionSpec.permissionSpecTestMSg)
          done()
        })
    })
  }).timeout(30000)
})
