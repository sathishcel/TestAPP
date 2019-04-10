const User = require('../models/user')
const constantConfig = require('../config/constant-config')

module.exports = {
  randomString: function () {
    var length = 6
    var chars = constantConfig.otcString
    var resultString = ''
    for (var i = length; i > 0; --i) resultString += chars[Math.floor(Math.random() * chars.length)]
    return resultString
  },

  generate_otc: function (email, otcType, otcCount) {
    var today = new Date()
    var randomOtc = this.randomString()
    User.where('email', email).fetch().then(function (user) {
      if (otcType === 'resend') {
        user.save({
          otc: randomOtc,
          resend_otc_at: new Date(today.setHours(0, 0, 0, 0)),
          resend_otc_count: otcCount + 1
        })
      } else if (otcType === 'forgot') {
        user.save({
          otc: randomOtc,
          forgot_otc_at: new Date(today.setHours(0, 0, 0, 0)),
          forgot_otc_count: otcCount + 1
        })
      } else {
        user.save({
          otc: randomOtc
        })
      }
    })
    return randomOtc
  }
}
