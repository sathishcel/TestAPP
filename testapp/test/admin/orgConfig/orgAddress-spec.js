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

const ADDORGADDRESS = '/admin/orgAddress/addOrgAddress'
const EDITORGADDRESS = '/admin/orgAddress/editOrgAddress'
const DELETORGADDRESS = '/admin/orgAddress/deleteOrgAddress'
const ORGADDRESSLIST = '/admin/orgAddress/orgAddressList'

const HELPER = require('../../common-functions')
const schema = require('../../../schema/admin/theme-settings')
const path = require('path')
const PASSWORD = 'Cel@123'

describe('OrgAddress CRUD operation', function () {
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
    knex.insert(mockData.roleData).into('roles').then(function (id) {})
    knex.insert([mockData.user1, mockData.user2, mockData.user3]).into('users').then(function (id) {})
    knex.insert(mockData.organization1).into('organizations').then(function (id) {})
    knex.insert(mockData.themeData).into('theme_settings').then(function (id) {})
    knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_factors).into('permissions').then(function (id) {})
    console.log('Permissions data inserted')
    knex.insert(mockData.orgAddressInfo).into('org_address').then(function (id) {})
    knex.insert(mockData.empBankInfo).into('bank_detail').then(function (id) {})
    knex.insert([mockData.empGovtDocsInfo, mockData.empGovtDocsInfo1]).into('govt_docs_detail').then(function (id) {})
    knex.insert([mockData.employee1, mockData.employee2, mockData.employee3, mockData.employee4]).into('employees').then(function (id) {
      console.log('final ---------')
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
    knex('bank_detail').truncate().then(function (id) {})
    knex('govt_accounts').truncate().then(function (id) {})
    knex('govt_docs').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {
      done()
    })
  })
  
  it(responseMessages.orgAddress.ordAddTest1, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADDORGADDRESS)
        .set('Authorization', token)
        .send({
          'line1': '112',
          'line2': 'l2',
          'city': 'Bangalore',
          'state': 'Karnatakqa',
          'country': 'India',
          'zipCode': '1212312',
          'shortName': 'cel',
          'fax': '12342345',
          'contactNumber': '345345',
          'alternativeNumber': '345456567',
          'currency': 'R',
          'timeZone': 'Asia/Calcutta',
          'countryCode': '+91',
          'userBankInfoList': [{
            'bankLabelName': 'IFSC1'
          }, {
            'bankLabelName': 'IFSC2'
          }],
          'govtAccountList': [{
            'accountLabel': 'GovtAcc1',
            'accountType': 'string'
          }, {
            'accountLabel': 'GovtAcc2',
            'accountType': 'string'
          }],
          'govtDocList': [{
            'docLabel': 'GovtDoc1',
            'docType': 'string'
          }, {
            'docLabel': 'GovtDoc2',
            'docType': 'string'
          }]
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(4014)
          res.body.message.should.equal(responseMessages.orgAddress.ordAddTest1Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.orgAddress.ordAddTest2, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADDORGADDRESS)
        .set('Authorization', token)
        .send({
          'line1': '1124',
          'line2': 'l2',
          'city': 'Bangalore',
          'state': 'Karnatakqa',
          'country': 'India',
          'zipCode': '1212312',
          'shortName': 'cel',
          'fax': '12342345',
          'contactNumber': '345345',
          'alternativeNumber': '345456567',
          'currency': 'R',
          'timeZone': 'Asia/Calcutta',
          'countryCode': '+91',
          'userBankInfoList': [{
            'bankLabelName': 'IFSC1'
          }, {
            'bankLabelName': 'IFSC2'
          }],
          'govtAccountList': [{
            'accountLabel': 'GovtAcc1',
            'accountType': 'string'
          }, {
            'accountLabel': 'GovtAcc2',
            'accountType': 'string'
          }],
          'govtDocList': [{
            'docLabel': 'GovtDoc1',
            'docType': 'string'
          }, {
            'docLabel': 'GovtDoc2',
            'docType': 'string'
          }]
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(4013)
          res.body.message.should.equal(responseMessages.orgAddress.ordAddTest2Msg)
          done()
        })
    })
  }).timeout(30000)
  it(responseMessages.orgAddress.ordAddTest3, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .delete(DELETORGADDRESS + '/1')
        .set('Authorization', token)
        .send({})
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.orgAddress.ordAddTest3Msg)
          done()
        })
    })
  }).timeout(30000)

  it(responseMessages.orgAddress.ordAddTest4, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .delete(DELETORGADDRESS + '/2')
        .set('Authorization', token)
        .send({})
        .end((err, res) => {
          if (err) {
            throw err
          }
          console.log(res.body)
          res.body.responseCode.should.equal(4032)
          res.body.message.should.equal(responseMessages.orgAddress.ordAddTest4Msg)
          done()
        })
    })
  }).timeout(30000)

  it(responseMessages.orgAddress.ordAddTest5, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      console.log(token)
      knex('org_address').truncate().then(function (id) {})
    knex('bank_info').truncate().then(function (id) {})
    knex('bank_detail').truncate().then(function (id) {})
    knex('govt_accounts').truncate().then(function (id) {})
      chai.request(ServerAddr)
        .post(ADDORGADDRESS)
        .set('Authorization', token)
        .send({
          'line1': '112',
          'line2': 'l2',
          'city': 'Bangalore',
          'state': 'Karnatakqa',
          'country': 'India',
          'zipCode': '1212312',
          'shortName': 'cel1',
          'fax': '12342345',
          'contactNumber': '345345',
          'alternativeNumber': '345456567',
          'currency': 'R',
          'timeZone': 'Asia/Calcutta',
          'countryCode': '+91',
          'userBankInfoList': [{
            'bankLabelName': 'IFSC1'
          }, {
            'bankLabelName': 'IFSC2'
          }],
          'govtAccountList': [{
            'accountLabel': 'GovtAcc1',
            'accountType': 'string'
          }, {
            'accountLabel': 'GovtAcc2',
            'accountType': 'string'
          }],
          'govtDocList': [{
            'docLabel': 'GovtDoc1',
            'docType': 'string'
          }, {
            'docLabel': 'GovtDoc2',
            'docType': 'string'
          }]
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.orgAddress.ordAddTest5Msg)
          done()
        })
    })
  }).timeout(30000)

  
  it(responseMessages.orgAddress.ordAddTest6, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDITORGADDRESS + '/1')
        .set('Authorization', token)
        .send({
          'line1': '114',
          'line2': 'l2',
          'city': 'Bangalore',
          'state': 'Karnatakqa',
          'country': 'India',
          'zipCode': '1212312',
          'shortName': 'cel',
          'fax': '12342345',
          'contactNumber': '345345',
          'alternativeNumber': '345456567',
          'currency': 'R',
          'timeZone': 'Asia/Calcutta',
          'countryCode': '+91',
          'userBankInfoList': [{
            'bankLabelId': 2,
            'bankLabelName': 'IFSC1'
          }, {
            'bankLabelId': 3,
            'bankLabelName': 'IFSC2'
          },{
            'bankLabelId': 3,
            'bankLabelName': 'IFSC2'
          }],
          'govtAccountList': [{
            'accountLabelID': 1,
            'accountLabel': 'GovtAcc1',
            'accountType': 'string'
          }, {
            'accountLabelID': 2,
            'accountLabel': 'GovtAcc2',
            'accountType': 'string'
          }],
          'govtDocList': [{
            'documentId': 2,
            'docLabel': 'GovtDoc1',
            'docType': 'string'
          }, {
            'documentId': 3,
            'docLabel': 'GovtDoc2',
            'docType': 'string'
          }]
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.orgAddress.ordAddTest6Msg)
          done()
        })
    })
  }).timeout(30000)
  
  it(responseMessages.orgAddress.ordAddTest7, (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .delete(DELETORGADDRESS + '/2')
        .set('Authorization', token)
        .send({})
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(401)
          res.body.message.should.equal(responseMessages.orgAddress.ordAddTest7Msg)
          done()
        })
    })
  }).timeout(30000)
  it(responseMessages.orgAddress.ordAddTest8, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .delete(DELETORGADDRESS + '/3')
        .set('Authorization', token)
        .send({})
        .end((err, res) => {
          if (err) {
            throw err
          }
          console.log(res.body)
          res.body.responseCode.should.equal(4032)
          res.body.message.should.equal(responseMessages.orgAddress.ordAddTest8Msg)
          done()
        })
    })
  }).timeout(30000)
  it(responseMessages.orgAddress.ordAddTest9, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      // let group = new Group({org_id: 1, name: 'B1', description: 'Test Group', updated_by_id: 1})
      chai.request(ServerAddr)
        .get(ORGADDRESSLIST)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.orgAddress.ordAddTest9Msg)
          done()
        })
    })
  }).timeout(30000)
  it(responseMessages.orgAddress.ordAddTest10, (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      // let group = new Group({org_id: 1, name: 'B1', description: 'Test Group', updated_by_id: 1})
      chai.request(ServerAddr)
        .get(ORGADDRESSLIST)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(401)
          res.body.message.should.equal(responseMessages.orgAddress.ordAddTest10Msg)
          done()
        })
    })
  }).timeout(30000)
  it(responseMessages.orgAddress.ordAddTest11, (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADDORGADDRESS)
        .set('Authorization', token)
        .send({
          'line1': '112',
          'line2': 'l2',
          'city': 'Bangalore',
          'state': 'Karnatakqa',
          'country': 'India',
          'zipCode': '1212312',
          'shortName': 'cel',
          'fax': '12342345',
          'contactNumber': '345345',
          'alternativeNumber': '345456567',
          'currency': 'R',
          'timeZone': 'Asia/Calcutta',
          'countryCode': '+91',
          'userBankInfoList': [{
            'bankLabelName': 'IFSC1'
          }, {
            'bankLabelName': 'IFSC2'
          }],
          'govtAccountList': [{
            'accountLabel': 'GovtAcc1',
            'accountType': 'string'
          }, {
            'accountLabel': 'GovtAcc2',
            'accountType': 'string'
          }],
          'govtDocList': [{
            'docLabel': 'GovtDoc1',
            'docType': 'string'
          }, {
            'docLabel': 'GovtDoc2',
            'docType': 'string'
          }]
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(401)
          res.body.message.should.equal(responseMessages.orgAddress.ordAddTest11Msg)
          done()
        })
    })
  }).timeout(50000)
  it(responseMessages.orgAddress.ordAddTest12, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      knex('org_address').truncate().then(function (id) {})
      chai.request(ServerAddr)
        .post(ADDORGADDRESS)
        .set('Authorization', token)
        .send({
          'line1': '112',
          'line2': 'l2',
          'city': 'Bangalore',
          'state': 'Karnatakqa',
          'country': 'India',
          'zipCode': '1212312',
          'shortName': 'cel',
          'fax': '12342345',
          'contactNumber': '345345',
          'alternativeNumber': '345456567',
          'currency': 'R',
          'timeZone': 'Asia/Calcutta',
          'countryCode': '+91',
          'userBankInfoList': [{
            'bankLabelName': 'IFSC1'
          }, {
            'bankLabelName': 'IFSC2'
          }],
          'govtAccountList': [{
            'accountLabel': 'GovtAcc1',
            'accountType': 'string'
          }, {
            'accountLabel': 'GovtAcc2',
            'accountType': 'string'
          }],
          'govtDocList': [{
            'docLabel': 'GovtDoc1',
            'docType': 'string'
          }, {
            'docLabel': 'GovtDoc2',
            'docType': 'string'
          }]
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.orgAddress.ordAddTest12Msg)
          done()
        })
    })
  }).timeout(50000)
  
})
