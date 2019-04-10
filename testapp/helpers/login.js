const jwt = require('jwt-simple')
const User = require('../models/user')
const Promise = require('bluebird')
const fetch = require('node-fetch')
const Organization = require('../models/admin/organization')
const securityConfig = require('../config/security-config')
const constantConfig = require('../config/constant-config')
const sideBarConfig = require('./sideBar')
const messages = require('../config/responseMessages') 
const moment = require('moment-timezone')
var imageTypes = ['organizationLogo', 'backgroundImage', 'headerImage', 'userPanelImage']

/* this helper will give the login api json response */
module.exports = {
  syncMoxtraData: (user, req, res, text) => {
    return new Promise(function (resolve, reject) {
      var timestamp = +new Date()
      var firstname = user.get('firstname')
      var lastname = user.get('lastname')
      var email = user.get('email')
      var timezone = req.body.timezone
      var moxtraAuthApi = ''
      if (req.body.timezone) {
        if (!moment.tz.zone(timezone)) {
          res.json({
            responseCode: 4006,
            message: messages.login.wrongTimezone
          })
          return
        }
        moxtraAuthApi = 'https://apisandbox.moxtra.com/v1/oauth/token?client_id=' +
                constantConfig.moxtra_sandbbox.client_id + '&client_secret=' +
                constantConfig.moxtra_sandbbox.client_secret + '&grant_type=' +
                constantConfig.moxtra_sandbbox.grant_type + '&uniqueid=' + email +
                '&timestamp=' + timestamp + '&timezone=' + timezone + '&firstname=' + firstname + '&lastname=' + lastname
      } else {
        moxtraAuthApi = 'https://apisandbox.moxtra.com/v1/oauth/token?client_id=' +
                constantConfig.moxtra_sandbbox.client_id + '&client_secret=' +
                constantConfig.moxtra_sandbbox.client_secret + '&grant_type=' +
                constantConfig.moxtra_sandbbox.grant_type + '&uniqueid=' + email +
                '&timestamp=' + timestamp + '&firstname=' + firstname + '&lastname=' + lastname
      }

      fetch(moxtraAuthApi, { method: 'POST' })
        .then(function (res) {
          return res.json()
        }).then(function (moxtraResponse) {
          var moxtraProfileApi = 'https://apisandbox.moxtra.com/me?access_token=' +
                        moxtraResponse.access_token
          fetch(moxtraProfileApi, { method: 'GET' })
            .then(function (res) {
              return res.json()
            }).then(function (profileResponse) {
              var responseData = {}

              if (text === 'moxtra') {
                responseData = {
                  accessToken: moxtraResponse.access_token,
                  clientId: constantConfig.moxtra_sandbbox.client_id,
                  firstName: profileResponse.data.first_name,
                  lastName: profileResponse.data.last_name,
                  orgId: profileResponse.data.org_id
                }
                resolve(responseData)
              } else {
                responseData = {
                  accessToken: moxtraResponse.access_token,
                  clientId: constantConfig.moxtra_sandbbox.client_id,
                  orgId: profileResponse.data.org_id
                }
                resolve(responseData)
              }
            })
        }).catch(err => {
          /* Exception handler for moxtra Auth failure */
          var responseData = {
            accessToken: '-',
            clientId: '-',
            orgId: '-'
          }
          resolve(responseData)
        })
    })
  },
  get_response: function (user, req, res, moxtraData, usage, message) {
    return new Promise(function (resolve, reject) {
      var token = jwt.encode(user.pick('id', 'email', 'created_at'), securityConfig.jwtSecret)
      var username = [user.attributes.firstname, user.attributes.lastname].join(' ')
      user = user.toJSON()
      var imageUrl = 'http://' + req.headers.host + '/public/images/'
      Organization.where('id', user.employee.org_id).fetch({ withRelated: ['theme'] }).then(function (org) {
        org = org.toJSON()

        var orgName = org.name

        var themeObj = org.theme
        var orgThemeData = {
          orgId: 'EWA-' + user.employee.org_id,
          orgName: orgName,
          organizationIcon: imageUrl + constantConfig.static_images.fav_icon
        }
        for (var i = 0; i < themeObj.settingPageData.length; i++) {
          if (imageTypes.indexOf(themeObj.settingPageData[i].key) > -1) {
            orgThemeData[themeObj.settingPageData[i].key] = imageUrl + themeObj.settingPageData[i].value
          } else {
            orgThemeData[themeObj.settingPageData[i].key] = themeObj.settingPageData[i].value
          }
        }
        let sidebar = []
        if (usage === 'login') {
          User.forge({
            id: user.id,
            status: constantConfig.userStatus.active
          }).save().then(function () {
            var userPermission = user.permissions
            if(userPermission.indexOf(constantConfig.THEME_SET) > -1) {
              orgThemeData['showSettings'] = true
            } else {
              orgThemeData['showSettings'] = false
            }
            
            sidebar = []
            sidebar = [...sideBarConfig.staticBar]
            var orgFlag = 0
            var hrFlag = 0
            if (userPermission.indexOf(constantConfig.ORGCONFIG) > -1) {
              let tmp = JSON.stringify(sideBarConfig.orgAdmin)
              tmp = JSON.parse(tmp)
              tmp.push(sideBarConfig.orgAdmin)
              sidebar.push(tmp[0])
              orgFlag = orgFlag + 1
            }
            if (userPermission.indexOf(constantConfig.ADDUSER) > -1) {
              if (hrFlag == 0) {
                var tmp1 = JSON.stringify(sideBarConfig.HR[0])
                tmp1 = JSON.parse(tmp1)
                tmp1.child.push(sideBarConfig.ADDUSER)
                sidebar.push(tmp1)
                hrFlag = hrFlag + 1
              } else {
                let sLen = sidebar.length
                var tmp2 = JSON.stringify(sidebar[sLen - 1])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.ADDUSER)
                sidebar[sLen - 1] = tmp2
              }
            }
            if (userPermission.indexOf(constantConfig.APP_REJ) > -1 ||
                    userPermission.indexOf(constantConfig.APP_REJ_JR) > -1 ||
                    userPermission.indexOf(constantConfig.APP_REJ_PEER) > -1 ||
                    userPermission.indexOf(constantConfig.APP_REJ_SR) > -1) {
              if (hrFlag == 0) {
                let tmp2 = JSON.stringify(sideBarConfig.HR[0])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.PROF_REQU)
                sidebar.push(tmp2)
                hrFlag = hrFlag + 1
              } else {
                let sLen = sidebar.length
                let tmp2 = JSON.stringify(sidebar[sLen - 1])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.PROF_REQU)
                sidebar[sLen - 1] = tmp2
              }
            }
            if (userPermission.indexOf(constantConfig.VIEW_LEAV_REQ) > -1 ||
              userPermission.indexOf(constantConfig.VIEW_LEAV_REQ_JR) > -1 ||
              userPermission.indexOf(constantConfig.VIEW_LEAV_REQ_PEER) > -1 ||
              userPermission.indexOf(constantConfig.VIEW_LEAV_REQ_SR) > -1) {
              if (hrFlag == 0) {
                let tmp2 = JSON.stringify(sideBarConfig.HR[0])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.VIEW_LEAV)
                sidebar.push(tmp2)
                hrFlag = hrFlag + 1
              } else {
                let sLen = sidebar.length
                let tmp2 = JSON.stringify(sidebar[sLen - 1])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.VIEW_LEAV)
                sidebar[sLen - 1] = tmp2
              }
            }
            if (userPermission.indexOf(constantConfig.UPL_USER_DATA) > -1) {
              if (hrFlag == 0) {
                let tmp2 = JSON.stringify(sideBarConfig.HR[0])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.UPL_USER_DATA)
                sidebar.push(tmp2)
                hrFlag = hrFlag + 1
              } else {
                let sLen = sidebar.length
                let tmp2 = JSON.stringify(sidebar[sLen - 1])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.UPL_USER_DATA)
                sidebar[sLen - 1] = tmp2
              }
            }
            if (userPermission.indexOf(constantConfig.UPL_ATTEND) > -1) {
              if (hrFlag == 0) {
                let tmp2 = JSON.stringify(sideBarConfig.HR[0])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.UPL_ATTEND)
                sidebar.push(tmp2)
                hrFlag = hrFlag + 1
              } else {
                let sLen = sidebar.length
                let tmp2 = JSON.stringify(sidebar[sLen - 1])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.UPL_ATTEND)
                sidebar[sLen - 1] = tmp2
              }
            }

            if (userPermission.indexOf(constantConfig.CALEN_INFO) > -1) {
              if (hrFlag == 0) {
                let tmp2 = JSON.stringify(sideBarConfig.HR[0])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.CALEN_INFO)
                sidebar.push(tmp2)
                hrFlag = hrFlag + 1
              } else {
                let sLen = sidebar.length
                let tmp2 = JSON.stringify(sidebar[sLen - 1])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.CALEN_INFO)
                sidebar[sLen - 1] = tmp2
              }
            }

            if (userPermission.indexOf(constantConfig.VIEW_ATTEND) > -1) {
              if (hrFlag == 0) {
                let tmp2 = JSON.stringify(sideBarConfig.HR[0])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.VIEW_ATTEND)
                sidebar.push(tmp2)
                hrFlag = hrFlag + 1
              } else {
                let sLen = sidebar.length
                let tmp2 = JSON.stringify(sidebar[sLen - 1])
                tmp2 = JSON.parse(tmp2)
                tmp2.child.push(sideBarConfig.VIEW_ATTEND)
                sidebar[sLen - 1] = tmp2
              }
            }
            resolve({
              responseCode: 2000,
              message: message,
              user: {
                name: username,
                email: user.email,
                userImage: imageUrl + 'user.png',
                accessToken: `JWT ${token}`,
                orgConfig: orgThemeData
              },
              'sidebar': sidebar,
              moxtraData: moxtraData
            })
          })
        } else {
          /* this response is for getting organizationConfig alone */
          resolve({
            body: {
              responseCode: 2000,
              orgConfig: orgThemeData
            }
          })
        }
      })
    })
  }

}
