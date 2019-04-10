const bookshelf = require('../../config/bookshelf-instance')
const ThemeSetting = require('./theme-setting')
const Employee = require('../employee')
const OrgAddress = require('../admin/orgConfig/orgAddress')
const Grades = require('../admin/orgConfig/grades')
const Groups = require('../admin/orgConfig/groups')

module.exports = bookshelf.Model.extend({
  tableName: 'organizations',
  employee: function () {
    return this.hasOne(Employee)
  },
  theme: function () {
    return this.hasOne(ThemeSetting, 'org_id')
  },
  orgAddress: function () {
    return this.hasMany(OrgAddress, 'org_id')
  },
  grades: function () {
    return this.hasMany(Grades, 'org_id')
  },
  groups: function () {
    return this.hasMany(Groups, 'org_id')
  }
})
