const bookshelf = require('../config/bookshelf-instance')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const Employee = require('./employee')
const ContactDetail = require('./admin/orgConfig/contactDetial')
const FamilyDetail = require('./admin/orgConfig/familyDetail')
const EmergencyDetail = require('./admin/orgConfig/emergencyDetail')
const OtherDetail = require('./admin/orgConfig/otherDetail')
const BankDetail = require('./admin/orgConfig/bankDetail')
const GovtDocsDetail = require('./admin/orgConfig/govtDocsDetial')
const Group = require('./admin/orgConfig/groups')
const Grade = require('./admin/orgConfig/grades')
const Organization = require('./admin/organization')

module.exports = bookshelf.Model.extend({
  tableName: 'users',
  initialize () {
    this.on('creating', model => {
      return Promise.coroutine(function * () {
        model.set({ 'created_at': new Date(), 'updated_at': new Date() })
      })()
    })
  },
  groups: function () {
    return this.hasOne(Group)
  },
  contactDetail: function () {
    return this.hasOne(ContactDetail, 'emp_id')
  },
  familyDetail: function () {
    return this.hasOne(FamilyDetail, 'emp_id')
  },
  emergencyDetail: function () {
    return this.hasOne(EmergencyDetail, 'emp_id')
  },
  otherDetail: function () {
    return this.hasOne(OtherDetail, 'emp_id')
  },
  bankDetail: function () {
    return this.hasOne(BankDetail, 'emp_id')
  },
  govtDocsDetail: function () {
    return this.hasOne(GovtDocsDetail, 'emp_id')
  },
  employee: function () {
    return this.hasOne(Employee, 'emp_id')
  },
  grade: function () {
    return this.hasOne(Grade, 'org_id').through(Organization, 'org_id')
  },
  validPassword (password) {
    return bcrypt.compareSync(password, this.attributes.password)
  }
})
