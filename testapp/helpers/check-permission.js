const Promise = require('bluebird')
const Permissions = require('../models/admin/orgConfig/permissions')

module.exports = {
  /**
  * Function to check permission of user
  * @user {user object}
  * @resource {resource object to be accessed by user}
  * @action {user action on resource}
  */
  checkPermission: function (user, resource, permissions) {
    return new Promise((resolve, reject) => {
      Permissions.where({
        perm_id: parseInt(resource)
      }).fetch().then((data) => {
        if (permissions.indexOf(data.get('perm_id')) > -1) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }
}
