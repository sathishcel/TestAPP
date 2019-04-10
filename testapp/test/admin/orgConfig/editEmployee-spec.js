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
const path = require('path')

chai.use(chaiHttp)

let ServerAddr = 'http://localhost:4000'
const mockData = require('../../data')

const EDIT_EMP_BASICINFO = '/admin/edit/hr/editEmployeeBasicInfo'
const EDIT_EMP_PERMISSION = '/admin/edit/hr/editEmployeePermissions'
const EDIT_EMP_OTHER_DETAIL = '/admin/edit/hr/editEmployeeOtherInfo'
const EDIT_EMP_BANK_DETAIL = '/admin/edit/hr/editEmployeeBankInfo'
const EDIT_EMP_GOVT_DOC_DETAIL = '/admin/edit/hr/editGovtDocsInfo'
const EDIT_EMP_EMERGENCY_DETAIL = '/admin/edit/hr/editEmployeeEmergencyInfo'
const EDIT_EMP_CONTACT_DETAIL = '/admin/edit/hr/editEmployeeContactInfo'
const EDIT_EMP_FAMILY_DETAIL = '/admin/edit/hr/editEmployeeFamilyInfo'

var IMAGEPATH = path.join(__dirname, '/Empcel.png')
var FILENAME = 'Empcel.png'

const HELPER = require('../../common-functions')
const schema = require('../../../schema/admin/theme-settings')
const USERNAME = 'ewaemployee@celsysemail.celsyswtc.in'
const PASSWORD = 'Cel@123'
const USER_ID = 3
const NO_USER = 4
const LARGE_ID = 9147483647

describe('HR Employee Update operation', function () {
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
    knex('bank_detail').truncate().then(function (id) {})
    knex('contact_detail').truncate().then(function (id) {})
    knex('emergency_detail').truncate().then(function (id) {})
    knex('family_detail').truncate().then(function (id) {})
    knex('govt_docs_detail').truncate().then(function (id) {})
    knex('other_detail').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {
    })
    
    knex.insert(mockData.groupData).into('groups').then(function (id) {})
    knex.insert(mockData.gradeData).into('grades').then(function (id) {})
    knex.insert(mockData.roleData).into('roles').then(function (id) {})
    knex.insert([mockData.user1, mockData.user2, mockData.user3]).into('users').then(function (id) {})
    knex.insert(mockData.organization1).into('organizations').then(function (id) {})
    knex.insert(mockData.orgAddressInfo).into('org_address').then(function (id) {
      console.log('OrgAddress data inserted')
    })
    knex.insert(mockData.themeData).into('theme_settings').then(function (id) {})
    knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_factors).into('permissions').then(function (id) {
      console.log('Permissions data inserted')
    })
    knex.insert([mockData.empBankInfo, mockData.empBankInfo1]).into('bank_detail').then(function (id) {})
    knex.insert([mockData.empContactInfo, mockData.empContactInfo1]).into('contact_detail').then(function (id) {})
    knex.insert([mockData.empEmergencyInfo, mockData.empEmergencyInfo1]).into('emergency_detail').then(function (id) {})
    knex.insert([mockData.empFamilyInfo, mockData.empFamilyInfo1]).into('family_detail').then(function (id) {})
    knex.insert([mockData.empGovtDocsInfo, mockData.empGovtDocsInfo1]).into('govt_docs_detail').then(function (id) {})
    knex.insert([mockData.empOtherInfo, mockData.empOtherInfo1]).into('other_detail').then(function (id) {})    
    knex.insert([mockData.employee1, mockData.employee2, mockData.employee3]).into('employees').then(function (id) {  
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

    knex('bank_detail').truncate().then(function (id) {})
    knex('contact_detail').truncate().then(function (id) {})
    knex('emergency_detail').truncate().then(function (id) {})
    knex('family_detail').truncate().then(function (id) {})
    knex('govt_docs_detail').truncate().then(function (id) {})
    knex('other_detail').truncate().then(function (id) {})

    knex('organizations').truncate().then(function (id) {
      done()
    })
  })

  it(responseMessages.editEmployeeSpec.editEmployeeTestPermissionDeniedPerm, (done) => {
    HELPER.get_token(mockData.user3.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION + '/' + NO_USER)
        .set('Authorization', token)
        .set('employeeId', 3)
        .send({'selectedPermissionsID': [1], 'selectedGroups': [1]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(401)
            res.body.message.should.equal(responseMessages.employee.permissionDenied)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest1, (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION + '/' + NO_USER)
        .set('Authorization', token)
        .set('employeeId', 3)
        .send({'selectedPermissionsID': [1], 'selectedGroups': [1]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest1Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest2, (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION + '/null')
        .set('Authorization', token)
        .set('employeeId', '')
        .send({'selectedPermissionsID': [1], 'selectedGroups': [1]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4051)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest2Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest3, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION + '/' + USER_ID)
        .set('Authorization', token)
        .send({'selectedPermissionsID': [], 'selectedGroups': []})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4054)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.permissionGroupIds)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTestPermissionDeniedBasic, (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_BASICINFO + '/' + USER_ID).send({})
        .set('Authorization', token)
        .field('firstName', 'Emp1')
        .field('lastName', 'Cel')
        .field('dateOfBirth', '1525709')
        .field('sex', 'male')
        .field('designation', 'St Eng')
        .field('selectedGrade', '1')
        .field('dateOfJoining', '1525709')
        .field('selectedGroups', '[1]')
        .field('jobLocation', '1')
        .field('reportingManager', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerFinance', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'blue')
        .field('emailId', 'emp1@celestialsys.com')
        .attach('image', IMAGEPATH, FILENAME)
        .end((err, res) => {
          if (err) {
            console.log(err)
            throw err
          }
          res.body.responseCode.should.equal(401)
          res.body.message.should.equal(responseMessages.employee.permissionDenied)
          done()
        })
    })
  }, 3000).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTestPermissionDeniedContact, (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_CONTACT_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .send({
          'residentialAddress': {'addressLine1': 'sdcasdfsdf'},
          'permanentAddress': {'addressLine1': 'sdcasdfsdf123'},
          'landlineNumber': '234235345',
          'personalEmail': 'sdfwer2asdasd@szdasd.com',
          'isPermanetAddressSame': false
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(401)
            res.body.message.should.equal(responseMessages.employee.permissionDenied)
            done()
          }
        })
    })
  }).timeout(50000)
  it(responseMessages.editEmployeeSpec.editEmployeeTestPermissionDeniedFamily, (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_FAMILY_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .send({
          'isMarried': false,
          'dateOfMarriage': 1525755232,
          'relationshipArr': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(401)
            res.body.message.should.equal(responseMessages.employee.permissionDenied)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest4MsgNoUser, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_BASICINFO + '/' + NO_USER).send({})
        .set('Authorization', token)
        .field('firstName', 'Emp1')
        .field('lastName', 'Cel')
        .field('dateOfBirth', '1525709')
        .field('sex', 'male')
        .field('designation', 'St Eng')
        .field('selectedGrade', '1')
        .field('dateOfJoining', '1525709')
        .field('selectedGroups', '[1]')
        .field('jobLocation', '1')
        .field('reportingManager', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerFinance', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'blue')
        .field('emailId', 'emp1@celestialsys.com')
        .end((err, res) => {
          if (err) {
            console.log(err)
            throw err
          }
          res.body.responseCode.should.equal(4050)
          res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest7Msg)
          done()
        })
    })
  }, 3000).timeout(50000)
  it(responseMessages.editEmployeeSpec.editEmployeeTest4MsgLargeUserID, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_CONTACT_DETAIL + '/' + LARGE_ID)
        .set('Authorization', token)
        .send({
          'residentialAddress': {'addressLine1': 'sdcasdfsdf'},
          'permanentAddress': {'addressLine1': 'sdcasdfsdf'},
          'landlineNumber': '234235345',
          'personalEmail': 'sdfwer2asdasd@szdasd.com'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest7Msg)
            done()
          }
        })
    })
  }, 3000).timeout(50000)


  it(responseMessages.editEmployeeSpec.editEmployeeTest4MsgNoImage, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_BASICINFO + '/' + USER_ID).send({})
        .set('Authorization', token)
        .field('firstName', 'Emp1')
        .field('lastName', 'Cel')
        .field('dateOfBirth', '1525709')
        .field('sex', 'male')
        .field('designation', 'St Eng')
        .field('selectedGrade', '1')
        .field('dateOfJoining', '1525709')
        .field('selectedGroups', '[1]')
        .field('jobLocation', '1')
        .field('reportingManager', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerFinance', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'blue')
        .field('emailId', 'emp1@celestialsys.com')
        .end((err, res) => {
          if (err) {
            console.log(err)
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest4Msg)
          done()
        })
    })
  }, 3000).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest4Msg, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_BASICINFO + '/' + USER_ID).send({})
        .set('Authorization', token)
        .field('firstName', 'Emp1')
        .field('lastName', 'Cel')
        .field('dateOfBirth', '1525709')
        .field('sex', 'male')
        .field('designation', 'St Eng')
        .field('selectedGrade', '1')
        .field('dateOfJoining', '1525709')
        .field('selectedGroups', '[1]')
        .field('jobLocation', '1')
        .field('reportingManager', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerFinance', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'blue')
        .field('emailId', 'emp1@celestialsys.com')
        .attach('image', IMAGEPATH, FILENAME)
        .end((err, res) => {
          if (err) {
            console.log(err)
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest4Msg)
          done()
        })
    })
  }, 3000).timeout(50000)


  it(responseMessages.editEmployeeSpec.editEmployeeTest18PermissionMissing, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION + '/' + USER_ID)
        .set('Authorization', token)
        .send({'selectedGroups': [4]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4068)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.empPermissionMissing)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest18GroupMissing, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION + '/' + USER_ID)
        .set('Authorization', token)
        .send({'selectedPermissionsID': [4,5,6]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4069)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.empGroupsMissing)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest5, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION + '/' + USER_ID)
        .set('Authorization', token)
        .send({'selectedPermissionsID': [4,5,6], 'selectedGroups': [1]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest5Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest6, (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_OTHER_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .send({
          'employeeType': 'permanent',
          'employmentStatus': 'active',
          'backgroundVerificationStatus': 'Initiated',
          'backgroundVerificationDate': '1525709970',
          'relievingDate': '1525709970'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest6Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest7, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_OTHER_DETAIL + '/' + NO_USER)
        .set('Authorization', token)
        .send({
          'employeeType': 'permanent',
          'employmentStatus': 'active',
          'backgroundVerificationStatus': 'Initiated',
          'backgroundVerificationDate': '1525709970',
          'relievingDate': '1525709970'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest7Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest8, (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      knex('other_detail').truncate().then(function (id) {})
      chai.request(ServerAddr)
        .put(EDIT_EMP_OTHER_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .send({
          'employeeType': 'permanent',
          'employmentStatus': 'active',
          'backgroundVerificationStatus': 'Initiated',
          'backgroundVerificationDate': '1525709970',
          'relievingDate': '1525709970'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4059)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest8Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest9, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_BANK_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .send({
          'ctc': '23423423',
          'currency': 'INR',
          'userBankInfo': [{'bankLabelId': 1, 'bankLabelValue': 'fxdvsdf'}],
          'govtAccInfoJson': [{'accountLabelID': 1, 'accountLabelValue': 'fxdvsdf'}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest9Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest10, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_BANK_DETAIL + '/' + NO_USER)
        .set('Authorization', token)
        .set('employeeId', 3)
        .send({
          'ctc': '23423423',
          'currency': 'INR',
          'userBankInfo': [{'bankLabelId': 1, 'bankLabelValue': 'fxdvsdf'}],
          'govtAccInfoJson': [{'accountLabelID': 1, 'accountLabelValue': 'fxdvsdf'}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest10Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest11, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      knex('bank_detail').truncate().then(function (id) {})
      chai.request(ServerAddr)
        .put(EDIT_EMP_BANK_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .send({
          'ctc': '23423423',
          'currency': 'INR',
          'userBankInfo': [{'bankLabelId': 1, 'bankLabelValue': 'fxdvsdf'}],
          'govtAccInfoJson': [{'accountLabelID': 1, 'accountLabelValue': 'fxdvsdf'}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4061)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest11Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest12, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_GOVT_DOC_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .send({
          'passportNumber': '234-34234-234234',
          'passportIssueDate': '235467865',
          'passportExpiryDate': '43547457',
          'placeOfIssue': 'Bangalore',
          'otherDocsInfo': [{'docId': 1, 'docValue': 'sefsefsdf'}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest12Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest13, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_GOVT_DOC_DETAIL + '/' + NO_USER)
        .set('Authorization', token)
        .send({
          'passportNumber': '234-34234-234234',
          'passportIssueDate': '235467865',
          'passportExpiryDate': '43547457',
          'placeOfIssue': 'Bangalore',
          'otherDocsInfo': [{'docId': 1, 'docValue': 'sefsefsdf'}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest13Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest14, (done) => {
    knex('govt_docs_detail').truncate().then(function (id) {})
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_GOVT_DOC_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .send({
          'passportNumber': '234-34234-234234',
          'passportIssueDate': '235467865',
          'passportExpiryDate': '43547457',
          'placeOfIssue': 'Bangalore',
          'otherDocsInfo': [{'docId': 1, 'docValue': 'sefsefsdf'}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4062)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest14Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest15, (done) => {
    HELPER.get_token(mockData.user1.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_EMERGENCY_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .set('employeeId', 3)
        .send({
          'bloodGroup': 'A+',
          'emergencyInfo': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''},
            {'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest15Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest16, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_EMERGENCY_DETAIL + '/' + NO_USER)
        .set('Authorization', token)
        .send({
          'bloodGroup': 'A+',
          'emergencyInfo': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''},
            {'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest16Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest17, (done) => {
    HELPER.get_token(mockData.user1.email, 'Cel@123').then((token) => {
      knex('emergency_detail').truncate().then(function (id) {})
      chai.request(ServerAddr)
        .put(EDIT_EMP_EMERGENCY_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .set('employeeId', 3)
        .send({
          'bloodGroup': 'A+',
          'emergencyInfo': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''},
            {'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4063)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest17Msg)
            done()
          }
        })
    })
  }).timeout(50000)


  it(responseMessages.editEmployeeSpec.editEmployeeTest18, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_CONTACT_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .send({
          'residentialAddress': {'addressLine1': 'sdcasdfsdf'},
          'permanentAddress': {'addressLine1': 'sdcasdfsdf'},
          'landlineNumber': '234235345',
          'personalEmail': 'sdfwer2asdasd@szdasd.com',
          'contactNumber': '889922353333',
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest18Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest19, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_CONTACT_DETAIL + '/' + NO_USER)
        .set('Authorization', token)
        .send({
          'residentialAddress': {'addressLine1': 'sdcasdfsdf'},
          'permanentAddress': {'addressLine1': 'sdcasdfsdf'},
          'landlineNumber': '234235345',
          'personalEmail': 'sdfwer2asdasd@szdasd.com'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest19Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest20, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      knex('contact_detail').truncate().then(function (id) {})
      chai.request(ServerAddr)
        .put(EDIT_EMP_CONTACT_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .send({
          'residentialAddress': {'addressLine1': 'sdcasdfsdf'},
          'permanentAddress': {'addressLine1': 'sdcasdfsdf'},
          'landlineNumber': '234235345',
          'personalEmail': 'sdfwer2asdasd@szdasd.com'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4064)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest20Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest22LargeId, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_FAMILY_DETAIL + '/' + LARGE_ID)
        .set('Authorization', token)
        .send({
          'isMarried': false,
          'dateOfMarriage': 1525755232,
          'relationshipArr': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest1Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest21, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_FAMILY_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .send({
          'isMarried': false,
          'dateOfMarriage': 1525755232,
          'relationshipArr': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest21Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest22, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_FAMILY_DETAIL + '/' + NO_USER)
        .set('Authorization', token)
        .send({
          'isMarried': false,
          'dateOfMarriage': 1525755232,
          'relationshipArr': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest22Msg)
            done()
          }
        })
    })
  }).timeout(50000)


  it(responseMessages.editEmployeeSpec.editEmployeeTest23, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      knex('family_detail').truncate().then(function (id) {})
      chai.request(ServerAddr)
        .put(EDIT_EMP_FAMILY_DETAIL + '/' + USER_ID)
        .set('Authorization', token)
        .send({
          'isMarried': false,
          'dateOfMarriage': 1525755232,
          'relationshipArr': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4065)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest23Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.editEmployeeSpec.editEmployeeTest24, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      knex('grades').truncate().then(function (id) {})
      chai.request(ServerAddr)
        .put(EDIT_EMP_BASICINFO + '/' + USER_ID)
        .set('Authorization', token)
        .field('firstName', 'Emp1')
        .field('lastName', 'Cel')
        .field('dateOfBirth', '1525709')
        .field('sex', 'male')
        .field('designation', 'St Eng')
        .field('selectedGrade', '10')
        .field('dateOfJoining', '1525709')
        .field('selectedGroups', '[1]')
        .field('jobLocation', '1')
        .field('reportingManager', 'manager@celestialsys.com')
        .field('reportingManagerHR', 'managerHR@celestialsys.com')
        .field('reportingManagerFinance', 'managerFin@celestialsys.com')
        .field('reportingManagerHR', 'blue')
        .field('emailId', 'emp1@celestialsys.com')
        .field('contactNumber', '90282783794')
        .attach('image', IMAGEPATH, FILENAME)
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4016)
            res.body.message.should.equal(responseMessages.editEmployeeSpec.editEmployeeTest24Msg)
          }
          done()
        })
    })
  }).timeout(50000)
})
