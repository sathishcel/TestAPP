process.env.NODE_ENV = 'test'
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const securityConfig = require('../../config/security-config')
const responseMessages=require('../../config/testmessage')
const dbConfig = require('../../config/database-config')
const knex = require('knex')(dbConfig)

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../app')
let should = chai.should()
let expect = chai.expect
// let OrgAddress = require('../../../models/admin/orgConfig/orgAddress')
// let BankInfo = require('../../../models/admin/orgConfig/bankInfo')
// let GovtAccInfo = require('../../../models/admin/orgConfig/govtAccounts')
// let GovtDocInfo = require('../../../models/admin/orgConfig/govtDocs')
const async = require('async')
const path = require('path')

chai.use(chaiHttp)

let ServerAddr = 'http://localhost:4000'
const mockData = require('../data')

const GET_USER_PROFILE = './profile/getUserProfile'
const GET_INPUT_FILTER = './profile/getInputFilterData'
const MODIFY_PROFILE = './profile/updateUserProfile'
const PAST_PENDING_PROFILE = './profile/getPendingEditRequests'
const PAST_EDIT_PROFILE = './profile/getPastEditRequests'
const LOGGED_IN_EDIT_PROFILE = './profile/getMyEditProfileRequests'
const GET_REQ_CHANGES = './profile/getRequestedChanges'

var IMAGEPATH = path.join(__dirname, './Empcel.png')
console.log(__dirname)
console.log(IMAGEPATH)
var FILENAME = 'Empcel.png'

const HELPER = require('../common-functions')
const schema = require('../../schema/admin/theme-settings')
const USERNAME = 'ewaadmin@celsysemail.celsyswtc.in'
const PASSWORD = 'Cel@123'

describe('User Prfile API\'s', function () {
  // Before executing test case
  before(function (done) {
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
    knex('user_profile_changes').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {
    })

    knex.insert(mockData.roleData).into('roles').then(function (id) {})
    knex.insert([mockData.user1, mockData.user2]).into('users').then(function (id) {})
    knex.insert(mockData.organization1).into('organizations').then(function (id) {})
    knex.insert(mockData.themeData).into('theme_settings').then(function (id) {})
    knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_factors).into('permissions').then(function (id) {})
    console.log('Permissions data inserted')
    knex.insert(mockData.orgAddressInfo).into('org_address').then(function (id) {})
    console.log('OrgAddress data inserted')
    knex.insert(mockData.groupData).into('groups').then(function (id) {})
    knex.insert(mockData.gradeData).into('grades').then(function (id) {})
    knex.insert(mockData.aprrovedData).into('user_profile_changes').then(function (id) {})
    knex.insert(mockData.rejectData).into('user_profile_changes').then(function (id) {})
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
    knex('permissions').truncate().then(function (id) {})
    knex('org_address').truncate().then(function (id) {})
    knex('bank_info').truncate().then(function (id) {})
    knex('govt_accounts').truncate().then(function (id) {})
    knex('govt_docs').truncate().then(function (id) {})
    knex('groups').truncate().then(function (id) {})
    knex('grades').truncate().then(function (id) {})
    knex('user_profile_changes').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {
      done()
    })
  })

  it(responseMessages.userProfile.updateUserProfile, (done) => {
    HELPER.get_token(mockData.user1.email, 'Cel@123').then((token) => {
      console.log(token)
      chai.request(ServerAddr)
        .put(MODIFY_PROFILE).send({})
        .set('Authorization', token)
        .field('firstName', 'CelestialEdit')
        .field('lastName', 'Name')
        .field('dateOfBirth', '11-2-2000')
        .field('fatherName', 'fn')
        .field('personalEmail', 'myemail@gmail.com')
        .field('contactNumber', '091010101011')
        .field('landlineNumber', '020-29292929')
        .field('passportNumber', '112-2345-222-233')
        .field('residentialAddress', '{"addressLine1":"sdcasdfsdf"}')
        .field('permanentAddress', '{"addressLine1":"sdcasdfsdf"}')
        .attach('image', IMAGEPATH, FILENAME)
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.userProfile.updateUserData)
          done()
        })
    })
  })

  it(responseMessages.userProfile.getUser, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      console.log(token)
      chai.request(ServerAddr)
        .get(GET_USER_PROFILE)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.userProfile.userDetails)
          done()
        })
    })
  })

  it(responseMessages.userProfile.emailParameter, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GET_USER_PROFILE)
        .set('Authorization', token)
        .query({'userEmail': mockData.user2.email})
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.userProfile.userDetails)
          done()
        })
    })
  })

  it(responseMessages.userProfile.inputFilter, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GET_INPUT_FILTER)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.userProfile.successfullyFetched)
          done()
        })
    })
  })

  it(responseMessages.userProfile.pendingRequest, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      console.log(token)
      chai.request(ServerAddr)
        .get(PAST_PENDING_PROFILE)
        .set('Authorization', token)
        .query({'offset': 1})
        .query({'limit': 10})
        .end((err, res) => {
          if (err) {
            throw err
          }
          console.log(res.body)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.userProfile.successfullyPendingRequest)
          done()
        })
    })
  })
  it(responseMessages.userProfile.pastRequest, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(PAST_EDIT_PROFILE)
        .set('Authorization', token)
        .query({'offset': 1})
        .query({'limit': 10})
        .end((err, res) => {
          if (err) {
            throw err
          }
          console.log(res.body)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.userProfile.successfullyFetchedRequests)
          done()
        })
    })
  })
  it(responseMessages.userProfile.loggedIn, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(LOGGED_IN_EDIT_PROFILE)
        .set('Authorization', token)
        .query({'pending': true})
        .end((err, res) => {
          if (err) {
            throw err
          }
          console.log(res.body)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.userProfile.successfullyPendingRequest)
          done()
        })
    })
  })
  it(responseMessages.userProfile.getLoggedinUser, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(LOGGED_IN_EDIT_PROFILE)
        .set('Authorization', token)
        .query({'pending': false})
        .end((err, res) => {
          if (err) {
            throw err
          }
          console.log(res.body)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.userProfile.successfullyFetchedRequests)
          done()
        })
    })
  })
  it(responseMessages.userProfile.loggedInUser, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GET_REQ_CHANGES + '/2')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          console.log(res.body)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.userProfile.successfullyEditRequest)
          done()
        })
    })
  })
  it(responseMessages.userProfile.searchProfile, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(LOGGED_IN_EDIT_PROFILE)
        .set('Authorization', token)
        .set('Authorization', token)
        .set('param', {searchQuery: 'Admin', offset: 1, limit: 10, items: 10, isFilter: false, filterParams: {sortOrderBy: 'name', sortOrder: 'asc', orgAddressId: [1], groupId: [1, 2], reportingManagerId: [ 'ewaadmin@celsysemail.celsyswtc.in']}})
        .end((err, res) => {
          if (err) {
            throw err
          }
          console.log(res.body)
          done()
        })
    })
  })
})
