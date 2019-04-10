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

const ADD_EMP_BASICINFO = '/admin/hr/addEmployeeBasicInfo'
const ADD_EMP_PERMISSION = '/admin/hr/addEmployeePermissions'
const EDIT_EMP_PERMISSION = '/admin/hr/addEmployeePermissions'
const ADD_EMP_OTHER_DETAIL = '/admin/hr/addEmployeeOtherInfo'
const ADD_EMP_BANK_DETAIL = '/admin/hr/addEmployeeBankInfo'
const ADDEMP_GOVT_DOC_DETAIL = '/admin/hr/addGovtDocsInfo'
const ADD_EMP_EMERGENCY_DETAIL = '/admin/hr/addEmployeeEmergencyInfo'
const ADD_EMP_CONTACT_DETAIL = '/admin/hr/addEmployeeContactInfo'
const ADD_EMP_FAMILY_DETAIL = '/admin/hr/addEmployeeFamilyInfo'
const GET_ROLES_GROUPS = '/admin/hr/getGroupsRoles'
const REJ_REQ = '/admin/hr/rejectRequest'
const APPR_REQ = '/admin/hr/approveRequest'
const GOVT_DOCS_INFO = '/admin/hr/govtDocsInfo'
const GOVT_BANK_INFO = '/admin/hr/govtBankInfo'
const DELETE_USER = '/admin/hr/removeuser'
const ADMIN_DATA = '/admin/hr/adminData'
const SEARCH_USER = '/admin/hr/searchUser'
const EMPLOYEE = '/admin/hr/employee'
const EMP_LIST = '/admin/hr/employeeList'
const MODIFY_PROFILE = '/profile/updateUserProfile'

var IMAGEPATH = path.join(__dirname, '/Empcel.png')
var FILENAME = 'Empcel.png'

const HELPER = require('../../common-functions')
const schema = require('../../../schema/admin/theme-settings')
const USERNAME = 'ewaadmin@celsysemail.celsyswtc.in'
const PASSWORD = 'Cel@123'

describe('HR Employee Add operation', function () {
  // Before executing test case
  before(function (done) {
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('contact_detail').truncate().then(function (id) {})
    knex('family_detail').truncate().then(function (id) {})
    knex('emergency_detail').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex('org_address').truncate().then(function (id) {})
    knex('bank_info').truncate().then(function (id) {})
    knex('bank_detail').truncate().then(function (id) {})
    knex('govt_accounts').truncate().then(function (id) {})
    knex('govt_docs_detail').truncate().then(function (id) {})
    knex('govt_docs').truncate().then(function (id) {})
    knex('groups').truncate().then(function (id) {})
    knex('grades').truncate().then(function (id) {})
    knex('other_detail').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {})
    knex('user_profile_changes').truncate().then(function (id) {})

    knex.insert(mockData.groupData).into('groups').then(function (id) {})
    knex.insert(mockData.gradeData).into('grades').then(function (id) {})
    knex.insert(mockData.roleData).into('roles').then(function (id) {})
    knex.insert(mockData.organization1).into('organizations').then(function (id) {})
    knex.insert(mockData.orgAddressInfo).into('org_address').then(function (id) {
      console.log('OrgAddress data inserted')
    })
    knex.insert(mockData.themeData).into('theme_settings').then(function (id) {})
    knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
    knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})

    knex.insert(mockData.perm_factors).into('permissions').then(function (id) {
      console.log('Permissions data inserted')
      knex.insert([mockData.empBankInfo, mockData.empBankInfo1]).into('bank_detail').then(function (id) {})
      knex.insert([mockData.empContactInfo, mockData.empContactInfo1]).into('contact_detail').then(function (id) {})
      knex.insert([mockData.empEmergencyInfo, mockData.empEmergencyInfo1]).into('emergency_detail').then(function (id) {})
      knex.insert([mockData.empFamilyInfo, mockData.empFamilyInfo1]).into('family_detail').then(function (id) {})
      knex.insert([mockData.empGovtDocsInfo, mockData.empGovtDocsInfo1]).into('govt_docs_detail').then(function (id) {})
      knex.insert([mockData.empOtherInfo, mockData.empOtherInfo1]).into('other_detail').then(function (id) {})    
      knex.insert([mockData.user1, mockData.user2, mockData.user3]).into('users').then(function (id) {})
      knex.insert([mockData.employee1, mockData.employee2, mockData.employee3]).into('employees').then(function (id) {  
        knex.insert(mockData.govDocDetails).into('govt_docs_detail').then(function (id) {})
        knex.insert(mockData.aprrovedData).into('user_profile_changes').then(function (id) {})
        knex.insert(mockData.rejectData).into('user_profile_changes').then(function (id) {})
        done()
      })
    })
  })
  // After executing test case
  after(function (done) {
    knex('roles').truncate().then(function (id) {})
    knex('users').truncate().then(function (id) {})
    knex('employees').truncate().then(function (id) {})
    knex('contact_detail').truncate().then(function (id) {})
    knex('family_detail').truncate().then(function (id) {})
    knex('other_detail').truncate().then(function (id) {})
    knex('contact_detail').truncate().then(function (id) {})
    knex('bank_detail').truncate().then(function (id) {})
    knex('theme_settings').truncate().then(function (id) {})
    knex('permissions').truncate().then(function (id) {})
    knex('org_address').truncate().then(function (id) {})
    knex('bank_info').truncate().then(function (id) {})
    knex('govt_accounts').truncate().then(function (id) {})
    knex('govt_docs').truncate().then(function (id) {})
    knex('emergency_detail').truncate().then(function (id) {})
    knex('govt_docs_detail').truncate().then(function (id) {})
    knex('groups').truncate().then(function (id) {})
    knex('grades').truncate().then(function (id) {})
    knex('user_profile_changes').truncate().then(function (id) {})
    knex('organizations').truncate().then(function (id) {
      done()
    })
  })

  it('User is not authorized while adding permissions', (done) => {
    HELPER.get_token(mockData.user3.email, 'Cel@123').then((token) => {
      console.log(token)
      chai.request(ServerAddr)
        .post(ADD_EMP_PERMISSION)
        .set('Authorization', token)
        .set('employeeId', 4)
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
  }, 30000).timeout(500000)

  it(responseMessages.adminDataSpec.adminDataTest2, (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_PERMISSION)
        .set('Authorization', token)
        .set('employeeId', '')
        .send({'selectedPermissionsID': [1], 'selectedGroups': [2]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4051)
            res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest2Msg)
            done()
          }
        })
    })
  }).timeout(500000)

  it(responseMessages.adminDataSpec.adminDataTest3, (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_PERMISSION)
        .set('Authorization', token)
        .set('employeeId', 1)
        .send({'selectedPermissionsID': [],'selectedGroups': []})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4054)
            res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest3Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it('Employee Id does not exist while adding Employee Permission', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_PERMISSION)
        .set('Authorization', token)
        .set('employeeId', 1000)
        .send({'selectedPermissionsID': [1],'selectedGroups': [2]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Employee Id does not exist while adding Employee Permission', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_PERMISSION)
        .set('Authorization', token)
        .set('employeeId', 214748364722)
        .send({'selectedPermissionsID': [1],'selectedGroups': [1]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('User is not authorized while adding employee basic info', (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BASICINFO).send({})
        .set('Authorization', token)
        .field('firstName', 'Emp1')
        .field('lastName', 'Cel')
        .field('dateOfBirth', '1525709')
        .field('sex', 'male')
        .field('designation', 'St Eng')
        .field('selectedGrade', '1')
        .field('dateOfJoining', '1525709')
        .field('selectedGroups', '[1]')
        .field('jobLocation', 1)
        .field('reportingManager', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerFinance', 'ewaadmin@celsysemail.celsyswtc.in')
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

  it(responseMessages.adminDataSpec.adminDataTest4, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BASICINFO).send({})
        .set('Authorization', token)
        .field('firstName', 'Emp1')
        .field('lastName', 'Cel')
        .field('dateOfBirth', '1525709')
        .field('sex', 'male')
        .field('designation', 'St Eng')
        .field('selectedGrade', '1')
        .field('dateOfJoining', '1525709')
        .field('selectedGroups', '[1]')
        .field('jobLocation',1)
        .field('reportingManager', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerFinance', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('emailId', 'emp1@celestialsys.com')
        .attach('image', IMAGEPATH, FILENAME)
        .end((err, res) => {
          if (err) {
            console.log(err)
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest4Msg)
          done()
        })
    })
  }, 3000).timeout(50000)

  it('Missing mandatory parameter while adding employee basic info', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BASICINFO).send({})
        .set('Authorization', token)
        .field('firstName', 'Emp2')
        .field('lastName', 'Cel')
        .field('dateOfBirth', '1525709')
        .field('sex', 'male')
        .field('designation', 'St Eng')
        .field('selectedGrade', '1')
        .field('dateOfJoining', '1525709')
        .field('jobLocation', 1)
        .field('reportingManager', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerFinance', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('emailId', 'emp2@celestialsys.com')
        .end((err, res) => {
          if (err) {
            console.log(err)
            throw err
          }
          res.body.message.should.equal('Fields are not in required format')
          done()
        })
    })
  }, 3000).timeout(50000)

  it('Selected Group doesn\'t exist', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BASICINFO).send({})
        .set('Authorization', token)
        .field('firstName', 'Emp2')
        .field('lastName', 'Cel')
        .field('dateOfBirth', '1525709')
        .field('sex', 'male')
        .field('designation', 'St Eng')
        .field('selectedGrade', '1')
        .field('dateOfJoining', '1525709')
        .field('selectedGroups', '[100]')
        .field('jobLocation', 1)
        .field('reportingManager', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerFinance', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('emailId', 'emp2@celestialsys.com')
        .end((err, res) => {
          if (err) {
            console.log(err)
            throw err
          }
          res.body.responseCode.should.equal(4031)
          res.body.message.should.equal('Selected groups doesn\'t exist. Please create')
          done()
        })
    })
  }, 3000).timeout(50000)

  it('Selected Location doesn\'t exist', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BASICINFO).send({})
        .set('Authorization', token)
        .field('firstName', 'Emp2')
        .field('lastName', 'Cel')
        .field('dateOfBirth', '1525709')
        .field('sex', 'male')
        .field('designation', 'St Eng')
        .field('selectedGrade', '1')
        .field('dateOfJoining', '1525709')
        .field('selectedGroups', '[1]')
        .field('jobLocation', '1000')
        .field('reportingManager', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerFinance', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('emailId', 'emp2@celestialsys.com')
        .end((err, res) => {
          if (err) {
            console.log(err)
            throw err
          }
          res.body.message.should.equal('Please enter valid Job location id')
          done()
        })
    })
  }, 3000).timeout(50000)

  it('Add Employee Basic Information detail without image', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BASICINFO).send({})
        .set('Authorization', token)
        .field('firstName', 'Emp2')
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
        .field('emailId', 'emp2@celestialsys.com')
        .end((err, res) => {
          if (err) {
            console.log(err)
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal('User created successfully')
          done()
        })
    })
  }).timeout(50000)

  it('User is not authorized while adding employee basic info', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BASICINFO).send({})
        .set('Authorization', token)
        .field('firstName', 'Emp1')
        .field('lastName', 'Cel')
        .field('dateOfBirth', '1525709')
        .field('sex', 'male')
        .field('designation', 'St Eng')
        .field('selectedGrade', '1')
        .field('dateOfJoining', '1525709')
        .field('selectedGroups', '[1]')
        .field('jobLocation', 1)
        .field('reportingManager', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerHR', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('reportingManagerFinance', 'ewaadmin@celsysemail.celsyswtc.in')
        .field('emailId', 'emp1@celestialsys.com')
        .attach('image', IMAGEPATH, FILENAME)
        .end((err, res) => {
          if (err) {
            console.log(err)
            throw err
          }
          res.body.responseCode.should.equal(2107)
          res.body.message.should.equal('Similar Email address already exists')
          done()
        })
    })
  }).timeout(50000)

  it('Employee Permission already added', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_PERMISSION)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({'selectedPermissionsID': [100],'selectedGroups': [1]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4057)
            res.body.message.should.equal('Selected permissions doesn\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.adminDataSpec.adminDataTest5GroupMissing, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_PERMISSION)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({'selectedPermissionsID': [1,2,3]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4069)
            res.body.message.should.equal(responseMessages.adminDataSpec.empGroupsMissing)
            done()
          }
        })
    })
  }).timeout(50000)
  it(responseMessages.adminDataSpec.adminDataTest5PermissionMissing, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_PERMISSION)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({'selectedGroups': [1]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4068)
            res.body.message.should.equal(responseMessages.adminDataSpec.empPermissionMissing)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.adminDataSpec.adminDataTest5, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_PERMISSION)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({'selectedPermissionsID': [1,2,3],'selectedGroups': [2]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest5Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it(responseMessages.adminDataSpec.adminDataTest6, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION+'/4')
        .set('Authorization', token)
        .send({'selectedPermissionsID': [],'selectedGroups': []})
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

  it('Employee Permission already added', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_PERMISSION)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({'selectedPermissionsID': [1,2,3], 'selectedGroups': [1]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4058)
            res.body.message.should.equal('Already Employee permissions have been added')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Permission Id does not exist while Edit Employee Permission', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION+'/4')
        .set('Authorization', token)
        .send({'selectedPermissionsID': [100], 'selectedGroups': [2]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4057)
            res.body.message.should.equal('Selected permissions doesn\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Edit Employee Permission for Null user', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
      .put(EDIT_EMP_PERMISSION+'/null')
        .set('Authorization', token)
        .send({'selectedPermissionsID': [1],'selectedGroups': [1]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4051)
            res.body.message.should.equal('Employee ID is null')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Employee Id does not exist while edit employee permission', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION+'/1000')
        .set('Authorization', token)
        .send({'selectedPermissionsID': [1],'selectedGroups': [1]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Employee Id does not exist while edit employee permission', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION+'/214748364722')
        .set('Authorization', token)
        .send({'selectedPermissionsID': [1],'selectedGroups': [1]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('User is not authorized to Edit Employee Permission', (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION+'/4')
        .set('Authorization', token)
        .send({'selectedPermissionsID': [1,2,3],'selectedGroups': [2]})
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

  it('User does not exist while Edit Employee Permission', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION+'/1000')
        .set('Authorization', token)
        .send({'selectedPermissionsID': [1,2,3],'selectedGroups': [2]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Edit Employee Permission', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .put(EDIT_EMP_PERMISSION+'/4')
        .set('Authorization', token)
        .send({'selectedPermissionsID': [1,2,3],'selectedGroups': [2]})
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal('Employee permissions are Updated')
            done()
          }
        })
    })
  }).timeout(50000)

  it('User is not authorized while adding employee other details', (done) => {
    HELPER.get_token(mockData.user3.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_OTHER_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'employmentType': 'permanent',
          'employmentStatus': 'active',
          'backgroundVerificationStatus': 'Initiated',
          'backgroundVerificationDate': '1525709970',
          'relievingDate': '1525709970'
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

  it('Employee Id does not exist while adding employee other details', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_OTHER_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 1000)
        .send({
          'employmentType': 'permanent',
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
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Employee Id does not exist while adding employee other details', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_OTHER_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 214748364722)
        .send({
          'employmentType': 'permanent',
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
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Employee Id not passed while adding employee other details', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_OTHER_DETAIL)
        .set('Authorization', token)
        .set('employeeId', '')
        .send({
          'employmentType': 'permanent',
          'employmentStatus': 'active',
          'backgroundVerificationStatus': 'Initiated',
          'backgroundVerificationDate': '1525709970',
          'relievingDate': '1525709970'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4051)
            res.body.message.should.equal('Employee ID is null')
            done()
          }
        })
    })
  }).timeout(50000)

   it('Add Employee Other Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_OTHER_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'employmentType': 'permanent',
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
            res.body.message.should.equal('Employee Other details are added')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Other Information details are already added', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_OTHER_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'employmentType': 'permanent',
          'employmentStatus': 'active',
          'backgroundVerificationStatus': 'Initiated',
          'backgroundVerificationDate': '1525709970',
          'relievingDate': '1525709970'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4024)
            res.body.message.should.equal('Already Other details have been added')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Employee Id does not exist while adding employee other details', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_OTHER_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 5)
        .send({
          'employmentType': 'permanent',
          'employmentStatus': 'active',
          'backgroundVerificationStatus': 'Initiated',
          'backgroundVerificationDate': '1525709970',
          'relievingDate': ''
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal('Employee Other details are added')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Employee Id does not exist while adding employee other details', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_OTHER_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 5)
        .send({
          'employmentType': 'permanent',
          'employmentStatus': 'active',
          'backgroundVerificationStatus': 'Initiated',
          'backgroundVerificationDate': '1525709970',
          'relievingDate': ''
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4024)
            res.body.message.should.equal('Already Other details have been added')
            done()
          }
        })
    })
  }).timeout(50000)

  it('User is not authorized while adding employee bank info', (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BANK_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'employeeCTC': '23423423',
          'employeeCurrency': 'INR',
          'bank_info_Json': [{'bankLabelId': 1, 'bankLabelValue': 'fxdvsdf'}],
          'govtAccInfoJson': [{'accountLabelID': 1, 'accountLabelValue': 'fxdvsdf'}]
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

  it('Employee Id does not exist while adding Employee Bank Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BANK_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 1000)
        .send({
          'employeeCTC': '23423423',
          'employeeCurrency': 'INR',
          'bank_info_Json': [{'bankLabelId': 1, 'bankLabelValue': 'fxdvsdf'}],
          'govtAccInfoJson': [{'accountLabelID': 1, 'accountLabelValue': 'fxdvsdf'}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Employee Id does not exist while adding Employee Bank Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BANK_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 214748364722)
        .send({
          'employeeCTC': '23423423',
          'employeeCurrency': 'INR',
          'bank_info_Json': [{'bankLabelId': 1, 'bankLabelValue': 'fxdvsdf'}],
          'govtAccInfoJson': [{'accountLabelID': 1, 'accountLabelValue': 'fxdvsdf'}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Employee Id is not passed while adding Employee Bank Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BANK_DETAIL)
        .set('Authorization', token)
        .set('employeeId', '')
        .send({
          'employeeCTC': '23423423',
          'employeeCurrency': 'INR',
          'bank_info_Json': [{'bankLabelId': 1, 'bankLabelValue': 'fxdvsdf'}],
          'govtAccInfoJson': [{'accountLabelID': 1, 'accountLabelValue': 'fxdvsdf'}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4051)
            res.body.message.should.equal('Employee ID is null')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Add Employee Bank Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BANK_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'employeeCTC': '23423423',
          'employeeCurrency': 'INR',
          'bank_info_Json': [{'bankLabelId': 1, 'bankLabelValue': 'fxdvsdf'}],
          'govtAccInfoJson': [{'accountLabelID': 1, 'accountLabelValue': 'fxdvsdf'}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal('Employee Financial details are added')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Bank details are already added', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_BANK_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'employeeCTC': '23423423',
          'employeeCurrency': 'INR',
          'bank_info_Json': [{'bankLabelId': 1, 'bankLabelValue': 'fxdvsdf'}],
          'govtAccInfoJson': [{'accountLabelID': 1, 'accountLabelValue': 'fxdvsdf'}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4025)
            res.body.message.should.equal('Already Bank details have been added')
            done()
          }
        })
    })
  }).timeout(50000)

  it('User is not authorized to add gov. doc info', (done) => {
    HELPER.get_token(mockData.user3.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADDEMP_GOVT_DOC_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
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
            res.body.responseCode.should.equal(401)
            res.body.message.should.equal(responseMessages.employee.permissionDenied)
            done()
          }
        })
    })
  }).timeout(50000)

  it('User does not exist while adding gov. doc info', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADDEMP_GOVT_DOC_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 1000)
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
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('User does not exist while adding gov. doc info', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADDEMP_GOVT_DOC_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 214748364722)
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
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Not passing employee id while adding gov. doc info', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADDEMP_GOVT_DOC_DETAIL)
        .set('Authorization', token)
        .set('employeeId', '')
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
            res.body.responseCode.should.equal(4051)
            res.body.message.should.equal('Employee ID is null')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Add Employee Govt Document Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADDEMP_GOVT_DOC_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
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
            res.body.message.should.equal('Govt. Doc Info added successfully')
            done()
          }
        })
    })
  }).timeout(50000)
  it('Add Employee Govt Document Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADDEMP_GOVT_DOC_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
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
            res.body.responseCode.should.equal(4026)
            res.body.message.should.equal('Already Government details have been added')
            done()
          }
        })
    })
  }).timeout(50000)

  it('User is not authorized while adding emergency info', (done) => {
    HELPER.get_token(mockData.user3.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_EMERGENCY_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'bloodGroup': 'A+',
          'emergencyContactInfo': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''},
            {'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
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
  it('Add Employee Emergency Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_EMERGENCY_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'bloodGroup': 'A+',
          'emergencyContactInfo': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''},
            {'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal('Emergency Contact info added successfully')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Add Employee Emergency Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_EMERGENCY_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'bloodGroup': 'A+',
          'emergencyContactInfo': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''},
            {'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4027)
            res.body.message.should.equal('Already Emergency details have been added')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Add Employee Emergency Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_EMERGENCY_DETAIL)
        .set('Authorization', token)
        .set('employeeId', '')
        .send({
          'bloodGroup': 'A+',
          'emergencyContactInfo': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''},
            {'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4051)
            res.body.message.should.equal('Employee ID is null')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Add Employee Emergency Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_EMERGENCY_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 1000)
        .send({
          'bloodGroup': 'A+',
          'emergencyContactInfo': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''},
            {'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('Add Employee Emergency Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_EMERGENCY_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 214748364722)
        .send({
          'bloodGroup': 'A+',
          'emergencyContactInfo': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''},
            {'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)

  it('User is not authorized while adding contact info', (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_CONTACT_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'residentialAddress': {'addressLine1': 'sdcasdfsdf'},
          'permanentAddress': {'addressLine1': 'sdcasdfsdf'},
          'landlineNumber': '234235345',
          'personalEmail': 'sdfwer2asdasd@szdasd.com',
          'contactNumber': '009922334412',
          'isPermanetAddressSame': true
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
  it('User is null while adding contact info', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_CONTACT_DETAIL)
        .set('Authorization', token)
        .set('employeeId', '')
        .send({
          'residentialAddress': {'addressLine1': 'sdcasdfsdf'},
          'permanentAddress': {'addressLine1': 'sdcasdfsdf'},
          'landlineNumber': '234235345',
          'personalEmail': 'sdfwer2asdasd@szdasd.com',
          'contactNumber': '009922334412',
          'isPermanetAddressSame': true
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4051)
            res.body.message.should.equal('Employee ID is null')
            done()
          }
        })
    })
  }).timeout(50000)
  it('User does not exist while adding contact info', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_CONTACT_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 1000)
        .send({
          'residentialAddress': {'addressLine1': 'sdcasdfsdf'},
          'permanentAddress': {'addressLine1': 'sdcasdfsdf'},
          'landlineNumber': '234235345',
          'personalEmail': 'sdfwer2asdasd@szdasd.com',
          'contactNumber': '009922334412',
          'isPermanetAddressSame': true
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)
  it('User does not exist while adding contact info', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_CONTACT_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 214748364722)
        .send({
          'residentialAddress': {'addressLine1': 'sdcasdfsdf'},
          'permanentAddress': {'addressLine1': 'sdcasdfsdf'},
          'landlineNumber': '234235345',
          'personalEmail': 'sdfwer2asdasd@szdasd.com',
          'contactNumber': '009922334412',
          'isPermanetAddressSame': true
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4050)
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)
  it('Add Employee Contact Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_CONTACT_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'residentialAddress': {'addressLine1': 'sdcasdfsdf'},
          'permanentAddress': {'addressLine1': 'sdcasdfsdf'},
          'landlineNumber': '234235345',
          'personalEmail': 'sdfwer2asdasd@szdasd.com',
          'contactNumber': '009922334412',
          'isPermanetAddressSame': true
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(2000)
            res.body.message.should.equal('Contact info added successfully')
            done()
          }
        })
    })
  }).timeout(50000)
  it('Add Employee Contact Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_CONTACT_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'residentialAddress': {'addressLine1': 'sdcasdfsdf'},
          'permanentAddress': {'addressLine1': 'sdcasdfsdf'},
          'landlineNumber': '234235345',
          'personalEmail': 'sdfwer2asdasd@szdasd.com',
          'contactNumber': '009922334412',
          'isPermanetAddressSame': true
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4028)
            res.body.message.should.equal('Already Contact details have been added')
            done()
          }
        })
    })
  }).timeout(50000)
  it('User is not authorized while adding family info', (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_FAMILY_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
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
  it('User is not authorized while adding family info', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_FAMILY_DETAIL)
        .set('Authorization', token)
        .set('employeeId', '')
        .send({
          'isMarried': false,
          'dateOfMarriage': 1525755232,
          'relationshipArr': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4051)
            res.body.message.should.equal('Employee ID is null')
            done()
          }
        })
    })
  }).timeout(50000)
  it('User is not authorized while adding family info', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_FAMILY_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 1000)
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
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)
  it('User is not authorized while adding family info', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_FAMILY_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 214748364722)
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
            res.body.message.should.equal('Entered employee ID does\'t exist')
            done()
          }
        })
    })
  }).timeout(50000)
  it('Add Employee Family Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_FAMILY_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
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
            res.body.message.should.equal('Family info added successfully')
            done()
          }
        })
    })
  }).timeout(50000)
  it('Add Employee Family Information detail', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(ADD_EMP_FAMILY_DETAIL)
        .set('Authorization', token)
        .set('employeeId', 4)
        .send({
          'isMarried': false,
          'dateOfMarriage': 1525755232,
          'relationshipArr': [{'contactNumber': '345345345', 'contactName': 'shiva', 'contactRelation': ''}]
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4029)
            res.body.message.should.equal('Already Family details have been added')
            done()
          }
        })
    })
  }).timeout(50000)
  it('Get Employee List', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(EMP_LIST)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal('Successfully Sent Employee List')
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.adminDataSpec.adminDataTest13, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GET_ROLES_GROUPS + '?employeeID=1')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest13Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.adminDataSpec.adminDataTest14, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GET_ROLES_GROUPS + '?group=1')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest14Msg)
          done()
        })
    })
  }).timeout(50000)

  it('Params not passed while getting Roles and Permissions', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GET_ROLES_GROUPS + '?')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(4070)
          res.body.message.should.equal('No query parameters passed')
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.adminDataSpec.adminDataTest15, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GOVT_DOCS_INFO+'?employeeID=3')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest15Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.adminDataSpec.adminDataTest16, (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GOVT_DOCS_INFO+'?employeeID=3')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(401)
          res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest16Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.adminDataSpec.adminDataTest27, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GOVT_BANK_INFO+'?employeeID=3')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest27Msg)
          done()
        })
    })
  }).timeout(50000)
  
 it(responseMessages.adminDataSpec.adminDataTest29, (done) => {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GOVT_BANK_INFO+'?employeeID=10')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(4050)
          res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest29Msg)
          done()
        })
    })
  }).timeout(50000)

it(responseMessages.adminDataSpec.adminDataTest28, (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(GOVT_BANK_INFO+'?employeeID=3')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(401)
          res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest28Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.adminDataSpec.adminDataTest17, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      knex('grades').truncate().then(function (id) {})
      chai.request(ServerAddr)
        .post(ADD_EMP_BASICINFO)
        .set('Authorization', token)
        .field('firstName', 'Emp1')
        .field('lastName', 'Cel')
        .field('dateOfBirth', '1525709')
        .field('sex', 'male')
        .field('designation', 'St Eng')
        .field('selectedGrade', '10')
        .field('dateOfJoining', '1525709')
        .field('selectedGroups', '[1]')
        .field('jobLocation', 1)
        .field('reportingManager', 'manager@celestialsys.com')
        .field('reportingManagerHR', 'managerHR@celestialsys.com')
        .field('reportingManagerFinance', 'managerFin@celestialsys.com')
        .field('reportingManagerHR', 'blue')
        .field('emailId', 'emp1@celestialsys.com')
        .attach('image', IMAGEPATH, FILENAME)
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4016)
            res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest17Msg)
          }
          done()
        })
    })
  }).timeout(50000)
  it(responseMessages.adminDataSpec.adminDataTest18, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((HRtoken) => {
      HELPER.get_token(mockData.user3.email, 'Cel@123').then((token) => {
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

            chai.request(ServerAddr)
              .post(APPR_REQ)
              .set('Authorization', HRtoken)
              .send({
                'requestID': 1,
                'rejectDate': 1525755232,
                'reason': 'Approved'
              })
              .end((err, res) => {
                if (err) {
                  throw err
                } else {
                  res.body.responseCode.should.equal(2000)
                  res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest18Msg)
                  done()
                }
              })
          })
      })




      
    })
  }).timeout(50000)
  it('User Id not exist while approve request', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(APPR_REQ)
        .set('Authorization', token)
        .send({
          'requestID': 100,
          'rejectDate': 1525755232,
          'reason': 'Approved'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4030)
            res.body.message.should.equal('No Such Request ID exists')
            done()
          }
        })
    })
  }).timeout(50000)
  it('User is not authorized while approve request', (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(APPR_REQ)
        .set('Authorization', token)
        .send({
          'requestID': 1,
          'rejectDate': 1525755232,
          'reason': 'Approved'
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
  it('HR should get error for already approved user information', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(APPR_REQ)
        .set('Authorization', token)
        .send({
          'requestID': 1,
          'rejectDate': 1525755232,
          'reason': 'Approved'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4052)
            res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest19Msg)
            done()
          }
        })
    })
  }).timeout(50000)
  it(responseMessages.adminDataSpec.adminDataTest20, (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((HRtoken) => {
      HELPER.get_token(mockData.user3.email, 'Cel@123').then((token) => {
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

            chai.request(ServerAddr)
            .post(REJ_REQ)
            .set('Authorization', HRtoken)
            .send({
              'requestID': 2,
              'rejectDate': 1525755232,
              'reason': 'Rejected'
            })
            .end((err, res) => {
              if (err) {
                throw err
              } else {
                res.body.responseCode.should.equal(2000)
                res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest20Msg)
                done()
              }
            })
          })
        })
    })
  }).timeout(50000)
  it('HR should approve user updated information', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(APPR_REQ)
        .set('Authorization', token)
        .send({
          'requestID': 2,
          'rejectDate': 1525755232,
          'reason': 'Approved'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4066)
            res.body.message.should.equal('Already request has been rejected. You cannot approve')
            done()
          }
        })
    })
  }).timeout(50000)
  it('HR should get error for already rejected user information', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(REJ_REQ)
        .set('Authorization', token)
        .set('employeeId', 3)
        .send({
          'requestID': 2,
          'rejectDate': 1525755232,
          'reason': 'Rejected'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4053)
            res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest21Msg)
            done()
          }
        })
    })
  }).timeout(50000)

  it('User does not exist while rejecting request', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(REJ_REQ)
        .set('Authorization', token)
        .set('employeeId', 3)
        .send({
          'requestID': 100,
          'rejectDate': 1525755232,
          'reason': 'Rejected'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4030)
            res.body.message.should.equal('No Such Request ID exists')
            done()
          }
        })
    })
  }).timeout(50000)

  it('HR should reject user updated information', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(REJ_REQ)
        .set('Authorization', token)
        .set('employeeId', 3)
        .send({
          'requestID': 1,
          'rejectDate': 1525755232,
          'reason': 'Rejected'
        })
        .end((err, res) => {
          if (err) {
            throw err
          } else {
            res.body.responseCode.should.equal(4067)
            res.body.message.should.equal('Already request has been approved.You cannot reject')
            done()
          }
        })
    })
  }).timeout(50000)

  it('User is not authorized to reject request', (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .post(REJ_REQ)
        .set('Authorization', token)
        .set('employeeId', 3)
        .send({
          'requestID': 1,
          'rejectDate': 1525755232,
          'reason': 'Rejected'
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

  it('Get Admin data of organization', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(ADMIN_DATA)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest22Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.adminDataSpec.adminDataTest23, function (done) {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(SEARCH_USER+'?searchQuery=Admin')
        .set('Authorization', token)
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest23Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.adminDataSpec.adminDataTest24, function (done) {
    HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(SEARCH_USER)
        .set('Authorization', token)
        .end((err, res) => {
          console.log(err)
          res.body.responseCode.should.equal(4060)
          res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest24Msg)
          done()
        })
    })
  }).timeout(50000)

  it(responseMessages.adminDataSpec.adminDataTest25, (done) => {
    HELPER.get_token(mockData.user3.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(ADMIN_DATA)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(401)
          res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest25Msg)
          done()
        })
    })
  }).timeout(50000)
  it('Get Employee OTC', (done) => {
    HELPER.get_token(mockData.user2.email, PASSWORD).then((token) => {
      chai.request(ServerAddr)
        .get(EMPLOYEE+'?email='+mockData.user1.email)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.responseCode.should.equal(2000)
          res.body.message.should.equal('Successfully Sent Employee OTC')
          done()
        })
    })
  }).timeout(50000)
  it('No user found while deleting the user', function (done) {
    chai.request(ServerAddr)
      .delete(DELETE_USER+ '?email=demo@celestialsys.com')
      .send()
      .end((err, res) => {
        console.log(err)
        res.body.responseCode.should.equal(2000)
        res.body.message.should.equal('No user found')
        done()
      })
  }).timeout(50000)
  it('Delete the user and employee record', function (done) {
    chai.request(ServerAddr)
      .delete(DELETE_USER+ '?email='+mockData.user2.email)
      .send()
      .end((err, res) => {
        console.log(err)
        res.body.responseCode.should.equal(2000)
        res.body.message.should.equal(responseMessages.adminDataSpec.adminDataTest26Msg + mockData.user2.email)
        done()
      })
  }).timeout(50000)
})
