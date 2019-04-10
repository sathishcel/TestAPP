// This is the order of the test case file execution
// Execution is based on describe and it will avoid parallel execution
describe('APP.js', function () {
  require('./app-spec.js')
})
describe('Login', function () {
  require('./login-spec.js')
})
describe('Password', function () {
  require('./password-spec.js')
})
describe('Predefined Theme Settings', function () {
    require('./admin/theme/predefined-themes-spec')
  })
describe('Theme Settings', function () {
  require('./admin/theme/theme-settings-spec')
})
describe('Header Information', function () {
  require('./headerinfo-spec')
})
describe('User Information', function () {
  require('./userinfo-spec')
})
// describe('Employee', function () {
//   require('./employee-spec.js')
// })
describe('Permissions', function() {
  require('./admin/orgConfig/permission-spec')
})
describe('Grades', function() {
  require('./admin/orgConfig/grades-spec')
})
describe('Groups', function() {
  require('./admin/orgConfig/groups-spec')
})
describe('Roles', function() {
  require('./admin/orgConfig/roles-spec')
})
describe('Org Address', function() {
  require('./admin/orgConfig/orgAddress-spec')
})

describe('Moxtra Meet', function() {
  require('./moxtrameet-spec')
})
describe('Admin', function() {
  require('./admin/orgConfig/adminData-spec')
})
describe('Edit employee', function() {
  require('./admin/orgConfig/editEmployee-spec')
})
describe('User Profile', function() {
  require('./userProfile-spec')
})