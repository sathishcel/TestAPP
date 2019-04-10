/* add all the seed data in this file */
'use strict'

var Promise = require('bluebird')
var bcrypt = Promise.promisifyAll(require('bcrypt'))
var securityConfig = require('./security-config')
var dbConfig = require('./database-config')
var knex = require('knex')(dbConfig)

/* build default data */
var userData = [{ email: 'ewaadmin@celsysemail.celsyswtc.in', password: bcrypt.hashSync('Cel@123', securityConfig.saltRounds), role_id: 1, firstname: 'Celestial', lastname: 'Admin', status: 2, created_at: new Date(), updated_at: new Date(), permissions: [2, 3, 4, 21,25] },
  { email: 'ewaemployee@celsysemail.celsyswtc.in', password: bcrypt.hashSync('Cel@123', securityConfig.saltRounds), role_id: 2, firstname: 'Celestial', lastname: 'User', status: 2, created_at: new Date(), updated_at: new Date(), permissions: [1, 2, 3, 4, 18, 19, 13, 15, 16, 17, 19] },
  { email: 'ewaemployee1@celsysemail.celsyswtc.in', password: bcrypt.hashSync('Cel@123', securityConfig.saltRounds), role_id: 2, firstname: 'Celestial', lastname: 'User', status: 2, created_at: new Date(), updated_at: new Date(), permissions: [18, 13, 15, 16, 17] },
  { email: 'rgarg@celestialsys.com', password: bcrypt.hashSync('Caliva@123', securityConfig.saltRounds), role_id: 1, firstname: 'rahul', lastname: 'garg', status: 2, created_at: new Date(), updated_at: new Date(), permissions: [1, 18, 19, 13, 15, 16, 17] },
  { email: 'jitesh@celestialsys.com', password: bcrypt.hashSync('Caliva@123', securityConfig.saltRounds), role_id: 1, firstname: 'Jitesh', lastname: 'gupta', status: 2, created_at: new Date(), updated_at: new Date(), permissions: [1, 18, 19, 13, 15, 16, 17] },
  { email: 'prathi@celestialsys.com', password: bcrypt.hashSync('Caliva@123', securityConfig.saltRounds), role_id: 1, firstname: 'Palak', lastname: 'rathi', status: 2, created_at: new Date(), updated_at: new Date(), permissions: [1, 2, 3, 4, 21] },
  { email: 'karthik@celestialsys.com', password: bcrypt.hashSync('Caliva@123', securityConfig.saltRounds), role_id: 1, firstname: 'Karthik', lastname: 'Kedlaya', status: 2, created_at: new Date(), updated_at: new Date(), permissions: [1, 2, 3, 4, 21] },
  { email: 'jgupta@celestialsys.com', password: bcrypt.hashSync('Cel@123', securityConfig.saltRounds), role_id: 2, firstname: 'Jitesh', lastname: 'Gupta', status: 2, created_at: new Date(), updated_at: new Date(), permissions: [18, 19, 13, 15, 16, 17] }
]
var employeeData = [{ emp_id: 1, org_id: 1, user_id: 1, theme_settings_id: 1, firstname: 'Celestial', lastname: 'Admin', father_name: '', grade_id: 1, group_ids: '[1]', manager_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_hr_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_fin_email: 'ewaadmin@celsysemail.celsyswtc.in', email: 'ewaadmin@celsysemail.celsyswtc.in',image:'http://52.9.78.11:4000/public/images/user.png', location_id: 1, created_at: new Date(), updated_at: new Date() },
  { emp_id: 2, org_id: 1, user_id: 2, theme_settings_id: 1, firstname: 'Celestial', lastname: 'User', grade_id: 1, group_ids: '[1]', manager_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_hr_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_fin_email: 'ewaadmin@celsysemail.celsyswtc.in', email: 'ewaemployee@celsysemail.celsyswtc.in',image:'http://52.9.78.11:4000/public/images/user.png', location_id: 1, created_at: new Date(), updated_at: new Date() },
  { emp_id: 3, org_id: 1, user_id: 3, theme_settings_id: 1, firstname: 'Celestial', lastname: 'User', grade_id: 1, group_ids: '[1]', manager_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_hr_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_fin_email: 'ewaadmin@celsysemail.celsyswtc.in', email: 'ewaemployee1@celsysemail.celsyswtc.in',image:'http://52.9.78.11:4000/public/images/user.png', location_id: 1, created_at: new Date(), updated_at: new Date() },
  { emp_id: 4, org_id: 1, user_id: 4, theme_settings_id: 1, firstname: 'rahul', lastname: 'garg', grade_id: 1, group_ids: '[1]', manager_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_hr_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_fin_email: 'ewaadmin@celsysemail.celsyswtc.in', email: 'rgarg@celestialsys.com',image:'http://52.9.78.11:4000/public/images/user.png', location_id: 1, created_at: new Date(), updated_at: new Date() },
  { emp_id: 5, org_id: 1, user_id: 5, theme_settings_id: 1, firstname: 'Jitesh', lastname: 'gupta', grade_id: 1, group_ids: '[1]', manager_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_hr_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_fin_email: 'ewaadmin@celsysemail.celsyswtc.in', email: 'jitesh@celestialsys.com',image:'http://52.9.78.11:4000/public/images/user.png', location_id: 1, created_at: new Date(), updated_at: new Date() },
  { emp_id: 6, org_id: 1, user_id: 6, theme_settings_id: 1, firstname: 'Palak', lastname: 'rathi', grade_id: 1, group_ids: '[1]', manager_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_hr_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_fin_email: 'ewaadmin@celsysemail.celsyswtc.in', email: 'prathi@celestialsys.com',image:'http://52.9.78.11:4000/public/images/user.png', location_id: 1, created_at: new Date(), updated_at: new Date() },
  { emp_id: 7, org_id: 1, user_id: 7, theme_settings_id: 1, firstname: 'Karthik', lastname: 'Kedlaya', grade_id: 1, group_ids: '[1]', manager_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_hr_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_fin_email: 'ewaadmin@celsysemail.celsyswtc.in', email: 'karthik@celestialsys.com',image:'http://52.9.78.11:4000/public/images/user.png', location_id: 1, created_at: new Date(), updated_at: new Date() },
  { emp_id: 8, org_id: 1, user_id: 8, theme_settings_id: 1, firstname: 'Jitesh', lastname: 'Gupta', grade_id: 1, group_ids: '[1]', manager_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_hr_email: 'ewaadmin@celsysemail.celsyswtc.in', manager_fin_email: 'ewaadmin@celsysemail.celsyswtc.in', email: 'jgupta@celestialsys.com',image:'http://52.9.78.11:4000/public/images/user.png', location_id: 1, created_at: new Date(), updated_at: new Date() }
]
var roleData = [{ name: 'admin', created_at: new Date(), updated_at: new Date() }, { name: 'employee', created_at: new Date(), updated_at: new Date() }]
var orgData = [{ name: 'Celestialsys' }]
var themeData = [{
  org_id: 1,
  settingPageData: [{
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
    type: 'radioButton',
    fieldName: '',
    key: 'isBackgroundImage',
    value: true
  }, {
    type: 'image',
    fieldName: 'Background Image',
    key: 'backgroundImage',
    value: 'samplImage.jpg'
  }, {
    type: 'colorPicker',
    fieldName: 'Background Color',
    key: 'backgroundColor',
    value: '#fffff'
  }, {
    type: 'radioButton',
    fieldName: '',
    key: 'isUserPanelImage',
    value: false
  }, {
    type: 'image',
    fieldName: 'User Panel Image',
    key: 'userPanelImage',
    value: 'samplImage.jpg'
  }, {
    type: 'colorPicker',
    fieldName: 'User Panel Color',
    key: 'userPanelColor',
    value: '#fffddd'
  }, {
    type: 'colorPicker',
    fieldName: 'Header Color',
    key: 'headerColor',
    value: '#00000'
  }]
}]

var predefine_themes = [{
  name: 'Red Skin',
  id: 'theme1',
  backgroundColor: '#e9e9e9',
  foregroundColor: '#F44336',
  userPanelColor: '#090909'
}, {
  name: 'Pink Skin',
  id: 'theme2',
  backgroundColor: '#e9e9e9',
  foregroundColor: '#E91E63',
  userPanelColor: '#e01937'
}, {
  name: 'Purple Skin',
  id: 'theme3',
  backgroundColor: '#e9e9e9',
  foregroundColor: '#9C27B0',
  userPanelColor: '#e01937'
}, {
  name: 'Deep Purple Skin',
  id: 'theme5',
  backgroundColor: '#e9e9e9',
  foregroundColor: '#673AB7',
  userPanelColor: '#e01937'
}, {
  name: 'Indigo Skin',
  id: 'theme6',
  backgroundColor: '#e9e9e9',
  foregroundColor: '#3F51B5',
  userPanelColor: '#e01937'
}, {
  name: 'Blue Skin',
  id: 'theme7',
  backgroundColor: '#e9e9e9',
  foregroundColor: '#2196F3',
  userPanelColor: '#e01937'
}]

const perm_without_factors = [{
  perm_id: 1,
  name: 'Add a User',
  description: 'Add a User'
}, {
  perm_id: 15,
  name: 'Upload Calendar Info',
  description: 'Upload Calendar Info'
}, {
  perm_id: 16,
  name: 'Upload Time sheet info',
  description: 'Upload Time sheet info'
}, {
  perm_id: 17,
  name: 'Import Export User Data',
  description: 'Import Export User Data'
}, {
  perm_id: 21,
  name: 'Org Admin',
  description: 'Org Admin'
}, {
  perm_id: 22,
  name: 'View Admin Logs',
  description: 'View Admin Logs'
}, {
  perm_id: 25,
  name: 'Theme Change',
  description: 'Theme Change'
}]

const per_with_factors = [{
  perm_id: 2,
  name: 'View Personal Contact Details',
  description: 'View Personal Contact Details',
  parent_id: 0
}, {
  perm_id: 3,
  name: 'View Employee CTC, View Employee Bank Info & Govt. Bank Info',
  description: 'View Employee CTC, View Employee Bank Info & Govt. Bank Info',
  parent_id: 0
}, {
  perm_id: 4,
  name: 'View Govt. Docs Info',
  description: 'View Govt. Docs Info',
  parent_id: 0
}, {
  perm_id: 5,
  name: 'View Employee Permissions, Access Roles and Groups',
  description: 'View Employee Permissions, Access Roles and Groups',
  parent_id: 0
}, {
  perm_id: 6,
  name: 'View Other Info of an Employee',
  description: 'View Other Info of an Employee',
  parent_id: 0
}, {
  perm_id: 7,
  name: 'Edit Basic Info',
  description: 'Edit Basic Info',
  parent_id: 0
}, {
  perm_id: 8,
  name: 'Edit Emergency Info',
  description: 'Edit Emergency Info',
  parent_id: 0
}, {
  perm_id: 9,
  name: 'Edit Employee CTC, Edit Employee Bank Info & Govt. Bank Info',
  description: 'Edit Employee CTC, Edit Employee Bank Info & Govt. Bank Info',
  parent_id: 0
}, {
  perm_id: 10,
  name: 'Edit Govt. Docs Info',
  description: 'Edit Govt. Docs Info',
  parent_id: 0
}, {
  perm_id: 11,
  name: 'Edit Employee Permissions, Access Roles and Groups',
  description: 'Edit Employee Permissions, Access Roles and Groups',
  parent_id: 0
}, {
  perm_id: 12,
  name: 'Edit Other Info of the Employee',
  description: 'Edit Other Info of the Employee',
  parent_id: 0
}, {
  perm_id: 13,
  name: 'View time sheets.',
  description: 'View time sheets.',
  parent_id: 0
}, {
  perm_id: 14,
  name: 'Edit time sheets.',
  description: 'Edit time sheets.',
  parent_id: 0
}, {
  perm_id: 18,
  name: 'View Leave Requests',
  description: 'View Leave Requests',
  parent_id: 0
}, {
  perm_id: 19,
  name: 'View, Approve/Reject Profile Edit Requests',
  description: 'View, Approve/Reject Profile Edit Requests',
  parent_id: 0
}, {
  perm_id: 20,
  name: 'Edit Personal Contact Info',
  description: 'Edit Personal Contact Info',
  parent_id: 0
}, {
  perm_id: 23,
  name: 'View Family Info',
  description: 'View Family Info',
  parent_id: 0
}, {
  perm_id: 24,
  name: 'Edit Family Info',
  description: 'Edit Family Info',
  parent_id: 0
}]

const perm_factors = [{
  perm_id: 26,
  name: 'View Personal Contact Details - Group Jr ',
  description: 'View Personal Contact Details - Group Jr ',
  parent_id: 2
}, {
  perm_id: 27,
  name: 'View Personal Contact Details - Group Peer ',
  description: 'View Personal Contact Details - Group Peer ',
  parent_id: 2
}, {
  perm_id: 28,
  name: 'View Personal Contact Details - Group Sr ',
  description: 'View Personal Contact Details - Group Sr ',
  parent_id: 2
}, {
  perm_id: 29,
  name: 'View Employee CTC, View Employee Bank Info & Govt. Bank Info - Group Jr ',
  description: 'View Employee CTC, View Employee Bank Info & Govt. Bank Info - Group Jr ',
  parent_id: 3
}, {
  perm_id: 30,
  name: 'View Employee CTC, View Employee Bank Info & Govt. Bank Info - Group Peer',
  description: 'View Employee CTC, View Employee Bank Info & Govt. Bank Info - Group Peer',
  parent_id: 3
}, {
  perm_id: 31,
  name: 'View Employee CTC, View Employee Bank Info & Govt. Bank Info - Group Sr',
  description: 'View Employee CTC, View Employee Bank Info & Govt. Bank Info - Group Sr',
  parent_id: 3
}, {
  perm_id: 32,
  name: 'View Govt. Docs Info - Group Jr ',
  description: 'View Govt. Docs Info - Group Jr ',
  parent_id: 4
}, {
  perm_id: 33,
  name: 'View Govt. Docs Info - Group Peer ',
  description: 'View Govt. Docs Info - Group Peer ',
  parent_id: 4
}, {
  perm_id: 34,
  name: 'View Govt. Docs Info - Group Sr ',
  description: 'iew Govt. Docs Info - Group Sr ',
  parent_id: 4
}, {
  perm_id: 35,
  name: 'View Employee Permissions, Access Roles and Groups - Group Jr ',
  description: 'View Employee Permissions, Access Roles and Groups - Group Jr ',
  parent_id: 5
}, {
  perm_id: 36,
  name: 'View Employee Permissions, Access Roles and Groups - Group Peer ',
  description: 'View Employee Permissions, Access Roles and Groups - Group Peer ',
  parent_id: 5
}, {
  perm_id: 37,
  name: 'View Employee Permissions, Access Roles and Groups - Group Sr ',
  description: 'View Employee Permissions, Access Roles and Groups - Group Sr ',
  parent_id: 5
}, {
  perm_id: 38,
  name: 'View Other Info of an Employee - Group Jr ',
  description: 'View Other Info of an Employee - Group Jr ',
  parent_id: 6
}, {
  perm_id: 39,
  name: 'View Other Info of an Employee - Group Peer ',
  description: 'View Other Info of an Employee - Group Peer ',
  parent_id: 6
}, {
  perm_id: 40,
  name: 'View Other Info of an Employee - Group Sr ',
  description: 'View Other Info of an Employee - Group Sr ',
  parent_id: 6
}, {
  perm_id: 41,
  name: 'Edit Basic Info - Group Jr ',
  description: 'Edit Basic Info - Group Jr ',
  parent_id: 7
}, {
  perm_id: 42,
  name: 'Edit Basic Info - Group Peer ',
  description: 'Edit Basic Info - Group Peer ',
  parent_id: 7
}, {
  perm_id: 43,
  name: 'Edit Basic Info - Group Sr ',
  description: 'Edit Basic Info - Group Sr ',
  parent_id: 7
}, {
  perm_id: 44,
  name: 'Edit Emergency Info - Group Jr ',
  description: 'Edit Emergency Info - Group Jr ',
  parent_id: 8
}, {
  perm_id: 45,
  name: 'Edit Emergency Info - Group Peer ',
  description: 'Edit Emergency Info - Group Peer ',
  parent_id: 8
}, {
  perm_id: 46,
  name: 'Edit Emergency Info - Group Sr ',
  description: 'Edit Emergency Info - Group Sr ',
  parent_id: 8
}, {
  perm_id: 47,
  name: 'Edit Employee CTC, Edit Employee Bank Info & Govt. Bank Info - Group Jr ',
  description: 'Edit Employee CTC, Edit Employee Bank Info & Govt. Bank Info - Group Jr ',
  parent_id: 9
}, {
  perm_id: 48,
  name: 'Edit Employee CTC, Edit Employee Bank Info & Govt. Bank Info - Group Peer ',
  description: 'Edit Employee CTC, Edit Employee Bank Info & Govt. Bank Info - Group Peer ',
  parent_id: 9
}, {
  perm_id: 49,
  name: 'Edit Employee CTC, Edit Employee Bank Info & Govt. Bank Info - Group Sr ',
  description: 'Edit Employee CTC, Edit Employee Bank Info & Govt. Bank Info - Group Sr ',
  parent_id: 9
}, {
  perm_id: 50,
  name: 'Edit Govt. Docs Info - Group Jr ',
  description: 'Edit Govt. Docs Info - Group Jr ',
  parent_id: 10
}, {
  perm_id: 51,
  name: 'Edit Govt. Docs Info - Group Peer ',
  description: 'Edit Govt. Docs Info - Group Peer ',
  parent_id: 10
}, {
  perm_id: 52,
  name: 'Edit Govt. Docs Info - Group Sr ',
  description: 'Edit Govt. Docs Info - Group Sr ',
  parent_id: 10
}, {
  perm_id: 53,
  name: 'Edit Employee Permissions, Access Roles and Groups - Group Jr ',
  description: 'Edit Employee Permissions, Access Roles and Groups - Group Jr ',
  parent_id: 11
}, {
  perm_id: 54,
  name: 'Edit Employee Permissions, Access Roles and Groups - Group Peer ',
  description: 'Edit Employee Permissions, Access Roles and Groups - Group Peer ',
  parent_id: 11
}, {
  perm_id: 55,
  name: 'Edit Employee Permissions, Access Roles and Groups - Group Sr ',
  description: 'Edit Employee Permissions, Access Roles and Groups - Group Sr ',
  parent_id: 11
}, {
  perm_id: 56,
  name: 'Edit Other Info of the Employee - Group Jr ',
  description: 'Edit Other Info of the Employee - Group Jr ',
  parent_id: 12
}, {
  perm_id: 57,
  name: 'Edit Other Info of the Employee - Group Peer ',
  description: 'Edit Other Info of the Employee - Group Peer ',
  parent_id: 12
}, {
  perm_id: 58,
  name: 'Edit Other Info of the Employee - Group Sr ',
  description: 'Edit Other Info of the Employee - Group Sr ',
  parent_id: 12
}, {
  perm_id: 59,
  name: 'View time sheets - Group Jr ',
  description: 'View time sheets - Group Jr ',
  parent_id: 13
}, {
  perm_id: 60,
  name: 'View time sheets - Group Peer ',
  description: 'View time sheets - Group Peer ',
  parent_id: 13
}, {
  perm_id: 61,
  name: 'View time sheets - Group Sr ',
  description: 'View time sheets - Group Sr ',
  parent_id: 13
}, {
  perm_id: 62,
  name: 'Edit time sheets - Group Jr ',
  description: 'View Personal Contact Details - Group Jr ',
  parent_id: 14
}, {
  perm_id: 63,
  name: 'Edit time sheets - Group Peer ',
  description: 'Edit time sheets - Group Peer ',
  parent_id: 14
}, {
  perm_id: 64,
  name: 'Edit time sheets - Group Sr ',
  description: 'Edit time sheets - Group Sr ',
  parent_id: 14
}, {
  perm_id: 65,
  name: 'View Leave Requests - Group Jr ',
  description: 'View Personal Contact Details - Group Jr ',
  parent_id: 18
}, {
  perm_id: 66,
  name: 'View Leave Requests - Group Peer ',
  description: 'View Leave Requests - Group Peer ',
  parent_id: 18
}, {
  perm_id: 67,
  name: 'View Leave Requests - Group Sr ',
  description: 'View Leave Requests - Group Sr ',
  parent_id: 18
}, {
  perm_id: 68,
  name: 'View, Approve/Reject Profile Edit Requests - Group Jr ',
  description: 'View, Approve/Reject Profile Edit Requests - Group Jr ',
  parent_id: 19
}, {
  perm_id: 69,
  name: 'View, Approve/Reject Profile Edit Requests - Group Peer ',
  description: 'View, Approve/Reject Profile Edit Requests - Group Peer ',
  parent_id: 19
}, {
  perm_id: 70,
  name: 'View, Approve/Reject Profile Edit Requests - Group Sr ',
  description: 'View, Approve/Reject Profile Edit Requests - Group Sr ',
  parent_id: 19
}, {
  perm_id: 71,
  name: 'Edit Personal Contact Info - Group Jr ',
  description: 'Edit Personal Contact Info - Group Jr ',
  parent_id: 20
}, {
  perm_id: 72,
  name: 'Edit Personal Contact Info - Group Peer ',
  description: 'Edit Personal Contact Info - Group Peer ',
  parent_id: 20
}, {
  perm_id: 73,
  name: 'Edit Personal Contact Info - Group Sr ',
  description: 'Edit Personal Contact Info - Group Sr ',
  parent_id: 20
}, {
  perm_id: 74,
  name: 'View Family Info - Group Jr ',
  description: 'View Family Info - Group Jr ',
  parent_id: 23
}, {
  perm_id: 75,
  name: 'View Family Info - Group Peer ',
  description: 'View Family Info - Group Peer ',
  parent_id: 23
}, {
  perm_id: 76,
  name: 'View Family Info - Group Sr ',
  description: 'View Family Info - Group Sr ',
  parent_id: 23
}, {
  perm_id: 77,
  name: 'Edit Family Info - Group Jr ',
  description: 'Edit Family Info - Group Jr ',
  parent_id: 24
}, {
  perm_id: 78,
  name: 'Edit Family Info - Group Peer ',
  description: 'Edit Family Info - Group Peer ',
  parent_id: 24
}, {
  perm_id: 79,
  name: 'Edit Family Info - Group Sr ',
  description: 'Edit Family Info - Group Sr ',
  parent_id: 24
}]

const groupData = {
  'org_id': 1,
  'name': 'G1',
  'description': 'Group description',
  'permissions': [2, 3]
}

const gradeData = {
  'org_id': 1,
  'name': 'Grade1',
  'description': 'Grade Description'
}

const orgAddress = {
  'org_id': 1,
  'line1': '112',
  'line2': 'l2',
  'city': 'Bangalore',
  'state': 'Karnatakqa',
  'country': 'India',
  'zipcode': '1212312',
  'short_name': 'cel',
  'fax': '12342345',
  'contact_number': '345345',
  'alternative_number': '345456567',
  'currency': 'R',
  'timezone': 'Asia/Calcutta',
  'country_code': '+91'
}

const bankInfo = {
  'org_id': 1,
  'org_address_id': 1,
  'label_name': 'IFSC1',
  'info_type': 'text',
  'mandatory': true
}

const govAccInfo = {
  'org_id': 1,
  'org_address_id': 1,
  'label': 'GovtAcc1',
  'type': 'text',
  'mandatory': true
}

const govDocInfo = {
  'org_id': 1,
  'org_address_id': 1,
  'label': 'GovtDoc1',
  'type': 'text',
  'mandatory': true
}

/* formating the tables before insertion */
knex('roles').truncate().then(function (id) {})
knex('users').truncate().then(function (id) {})
knex('employees').truncate().then(function (id) {})
knex('theme_settings').truncate().then(function (id) {})
knex('predefined_themes').truncate().then(function (id) {})
knex('organizations').truncate().then(function (id) {})
knex('groups').truncate().then(function (id) {})
knex('grades').truncate().then(function (id) {})
knex('permissions').truncate().then(function (id) {})
knex('org_address').truncate().then(function (id) {})
knex('bank_info').truncate().then(function (id) {})
knex('govt_accounts').truncate().then(function (id) {})
knex('govt_docs').truncate().then(function (id) {})

console.log('tables formatted')

/* insert data */
knex.insert(roleData).into('roles').then(function (id) {})
knex.insert(userData).into('users').then(function (id) {})

console.log('created users')

knex.insert(employeeData).into('employees').then(function (id) {})
console.log('created 7 employee records')
knex.insert(predefine_themes).into('predefined_themes').then(function (id) {
  console.log('Predefined themes data inserted')
})
knex.insert(orgAddress).into('org_address').then(function (id) {
  console.log('OrgAddress data inserted')
})
knex.insert(bankInfo).into('bank_info').then(function (id) {})
knex.insert(govAccInfo).into('govt_accounts').then(function (id) {})
knex.insert(govDocInfo).into('govt_docs').then(function (id) {})
knex.insert(groupData).into('groups').then(function (id) {
  console.log('Groups data inserted')
})
knex.insert(gradeData).into('grades').then(function (id) {
  console.log('Grades data inserted')
})
knex.insert(orgData).into('organizations').then(function (id) {
  console.log('Organization data inserted')
  knex.insert(themeData).into('theme_settings').then(function (id) {})
  knex.insert(perm_without_factors).into('permissions').then(function (id) {})
  knex.insert(per_with_factors).into('permissions').then(function (id) {})
  knex.insert(perm_factors).into('permissions').then(function (id) {
    console.log('Permissions data inserted')
  })
}).finally(function () {
  console.log('ThemeSettings data inserted')
  /* knex.destroy() */
})
