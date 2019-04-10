
/* log4js will be used to log the error and email the same */
const Promise = require('bluebird')
const log4js = require('log4js')
const constantConfig = require('../config/constant-config')
const logger = log4js.getLogger('error_log')
const messages = require('../config/responseMessages')
log4js.configure(constantConfig.error_mail)

module.exports = {
  checkPermissionData: function(req, res, employeeId) {
    return new Promise((resolve, reject) => {
      var permissionIds = req.body.selectedPermissionsID
      var selectedGroups = req.body.selectedGroups
      if (employeeId == '' || employeeId == undefined || employeeId === 'null') {
        res.json({ responseCode: 4051, message: messages.addEmployeeBankInfo.empIdNull })
      } else if(!req.body.hasOwnProperty('selectedPermissionsID')) {
        res.json({ responseCode: 4068, message: messages.addEmployeePermissions.empPermissionMissing })
      } else if(!req.body.hasOwnProperty('selectedGroups')) {
        res.json({ responseCode: 4069, message: messages.addEmployeePermissions.empGroupsMissing })
      } else if ((permissionIds.length == 0 || selectedGroups.length == 0) || (permissionIds == undefined || selectedGroups == undefined)) {
        res.json({ responseCode: 4054, message: messages.addEmployeePermissions.permissionGroupIds })
      } else if (req.get('employeeId') > constantConfig.INT_MAX) {
        res.json({ responseCode: 4050, message: messages.addEmployeePermissions.empIdNotExit })
      } else {
        resolve('Continue')
      }
    })
  },
    /**
 * Function to get sort data by key
 * @data {selected data from DB to be parsed}
 */
  getSortedDataByKey: function (data, key) {
    return new Promise(function (resolve, reject) {
      data.sort(function (a, b) {
        var x = a[key].toLowerCase() < b[key].toLowerCase() ? -1 : 1
        return x
      })
      resolve(data)
    })
  },
  /**
 * Function to get sort data
 * @data {selected data from DB to be parsed}
 */
  getSortedData: function (data) {
    return new Promise(function (resolve, reject) {
      data.sort(function (a, b) {
        var x = a['id'] < b['id'] ? -1 : 1
        return x
      })
      resolve(data)
    })
  },
  /**
 * Function to get concation of firstname and lastname
 * @data {selected data from DB to be parsed}
 */
  getUserName: (data) => {
    var firstName = ''
    var lastName = ''
    var fullName = ''

    if (data.get('firstname')) {
      firstName = data.get('firstname')
    }
    if (data.get('lastname')) {
      lastName = data.get('lastname')
    }
    if (firstName || lastName) {
      fullName = firstName + ' ' + lastName
    } else {
      fullName = ''
    }
    return { firstName, lastName, fullName }
  },
  /**
   * Function to get concatenated URL
   */
  get_url: /* istanbul ignore next */function (req) {
    var newUrl = req.method + ' http://' + req.headers.host + req.url
    return newUrl
  },
  getUserProfileContent: function (req, div, message) {
    const HOSTNAME = req.headers.host

    return `<!DOCTYPE html>
    <html>
    <title>Moxtra Invite</title>
    <body style="background-color:#f2f2f2; font-family: Arial, Helvetica, sans-serif;">
      <div style="background-color:#f2f2f2;height:420px;">
        <!-- main body content -->
        <div style="width:100%; margin:0 auto;">
            <!-- logo container-->
            <div align="right" style="border-bottom:#cdcdcd 1px solid; padding: 10px 0px; margin: 0 20px;">
            <img src="http://${HOSTNAME}/public/images/celestial-Logo.png" title="Moxtra" alt="" height="40px" width="192px"/>
            </div>
    
            <div style="padding: 10px 20px; font-size: 0.9em;">
              <p> ${message} : </p>
                ${div}
            </div>
        </div>
      </div>
    </body>
    </html> `
  },
  /**
   * Function to get Mailcontent
   */
  getMailContent: (otc, req) => {
    const HOSTNAME = req.headers.host

    return `<!DOCTYPE html>
    <html>
    <title>EWA Invite</title><!-- Google Fonts -->
     <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <body style="background:#f2f2f2; font-family: Roboto;">
      <div style="background:#f2f2f2;">
        <!-- main body content -->
        <div style="width:100%; margin:0 auto;">
            <!-- logo container-->
            <div style="border-bottom:#cdcdcd 1px solid; padding: 10px 0px; margin: 0 20px;" />
                <div style="display:inline-block; width:49%; vertical-align: bottom;">
                    <h3 style="margin-bottom: 1;">EWA Invite</h3>
                </div>
                <div style="display:inline-block; width:40%;padding: 10px 0px; margin: 0 20px;" align="right">
                    <img src='http://${HOSTNAME}/public/images/celestial-Logo.png' title="Celestial Systems" alt="Celestial Logo" rel="" />
                </div>
            </div>
    
            <div style="padding: 10px 20px; font-size: 0.9em;">
                <p>Celestial Systems has invited you to Join Intranet Web Application.<br /><br />
                    You can register yourself by clicking on the below link <br /><br /><br />
                    <a href="http://${req.hostname}${constantConfig.port.ui}/start/verifyUser" style="color:#4a8ddb; text-decoration: underline;" rel="" title=""><b> VerifyUser </b></a></a>
                </p>
                <p>Kindly enter this OTC after your email id is verified - <strong>${otc}</strong></p>
            </div>
    
            <div style="border-top:#cdcdcd 1px solid; padding: 10px 0px; margin: 30px 20px 0 20px; font-size:0.8rem">
                &copy; 2016 - 2018  <a href="http://celestialsys.com" style="color:#4a8ddb; text-decoration: none;" rel="" title="">Celestial Systems Inc.,</a>
            </div>
        </div>
      </div>
    </body>
    </html> `
  },
  /**
   * Function to send error message
   */
  send_error: /* istanbul ignore next */function (req, err) {
    logger.error('Something went wrong at ' + this.get_url(req), err)
  },
  /**
   * Function to send html either for group or one-one chat
   */
  getChatWebPage: (senderName, senderImage, isGroupChat, groupChatBinder, joinUrl, req) => {
    let html = ''
    const HOSTNAME = req.headers.host

    if (isGroupChat === true) {
      html = `<!DOCTYPE html>
      <html>
      <title>Moxtra Invite</title>
      <body style="background:#ffffff; font-family: Arial, Helvetica, sans-serif;">
      
          <!-- main body content -->
          <div style="width:100%; margin:0 auto;">
              <!-- logo container-->
              <div style="border-bottom:#cdcdcd 1px solid; padding: 10px 0px; margin: 0 20px;" />
                  <div style="display:inline-block; width:49%; vertical-align: bottom;">
                      <h3 style="margin-bottom: 0;">Invite</h3>
                  </div>
                  <div style="display:inline-block; width:49%;" align="right">
                      <img src="http://${HOSTNAME}/public/images/moxtra-logo.png" title="Moxtra" alt="" height="40px" width="192px"/>
                  </div>
              </div>
      
              <div style="padding:0 0 0 60px;
                          margin: 10px 20px; 
                          font-size: 0.9em; 
                          background-image: url('${senderImage}');
                          background-repeat: no-repeat;
                          min-height:50px;
                          background-size:50px 50px;">
                      <p> 
                          <b>${senderName}  has invited you to join "Moxtra ${groupChatBinder.binderName} "</b>
                      </p>
                      <p>"Kindly accept the invitation."</p>
              </div>
      
              <div style="background: #f7f7f7;
                          border:#cdcdcd 1px solid;
                          border-top:#4a8ddb 10px solid;
                          min-height:150px;
                          padding:20px;
                          margin: 10px 20px;">
      
                  <div style="background-image: url('http://${HOSTNAME}/public/images/chat_Icon.png');
                              padding:0 0 0 80px;
                              background-repeat: no-repeat;
                              min-height:80px;
                              background-size:50px 50px;">
                      <h2 style="margin: 5px 0;">Moxtra ${groupChatBinder.binderName}</h2>
                      <p style="font-size:12px;">Created by ${senderName} . ${groupChatBinder.noOfMembers} Member . ${groupChatBinder.noOfPage} Page . ${groupChatBinder.noOfToDo} To-Do</p>
                  </div>
      
                  <a style="border: none;
                              background: #4a8ddb;
                              border-radius:10px;
                              font-size:14px;
                              font-weight:bold;
                              padding:10px 30px;
                              cursor:pointer;
                              color:#ffffff;text-decoration:none;"
                              href=${joinUrl}
                              target='_blank'>
                      Join </a>
              </div>
          </div>
      </body>
      </html> `
    } else {
      html = `<!DOCTYPE html>
      <html>
      <title>Moxtra Invite</title>
      <body style="background-color:#f2f2f2; font-family: Arial, Helvetica, sans-serif;">
        <div style="background-color:#f2f2f2;height:420px;">
          <!-- main body content -->
          <div style="width:100%; margin:0 auto;">
              <!-- logo container-->
              <div align="right" style="border-bottom:#cdcdcd 1px solid; padding: 10px 0px; margin: 0 20px;">
              <img src="http://${HOSTNAME}/public/images/moxtra-logo.png" title="Moxtra" alt="" height="40px" width="192px"/>
              </div>
      
              <div style="padding: 10px 20px; font-size: 0.9em;">
                  <p>${senderName} has invited you to chat via Moxtra.</p>
                  <div style="margin: 30px 0;">
                      <img src="${senderImage}" title="User Name" alt="" width="100" height="100" />
                  </div>
                        <a style="border: none;
                        background: #4a8ddb;
                        border-radius:10px;
                        font-size:14px;
                        font-weight:bold;
                        padding:10px 30px;
                        cursor:pointer;
                        color:#ffffff;text-decoration:none;"
                        href=${joinUrl}
                        target='_blank'>
                Join Now</a>
              </div>
          </div>
        </div>
      </body>
      </html> `
    }
    return html
  },
  getMeetWebPage: (senderName, meetTitle, noOfMembers, isScheduleMeet, joinUrl, req) => {
    const HOSTNAME = req.headers.host
    var scheduleMeet = ''
    if (isScheduleMeet === true) {
      scheduleMeet = req.body.scheduleMeet
      var html =
    `<!DOCTYPE html>
  <html>
  <title>Moxtra Invite</title>
  <body style="background:#ffffff; font-family: Arial, Helvetica, sans-serif;">

      <!-- main body content -->
      <div style="width:100%; margin:0 auto;">
          <!-- logo container-->
          <div style="border-bottom:#cdcdcd 1px solid; padding: 10px 0px; margin: 0 20px;" />
              <div style="display:inline-block; width:49%; vertical-align: bottom;">
                  
              </div>
              <div style="display:inline-block; width:40%;" align="right">
                  <img src="http://${HOSTNAME}/public/images/moxtra-logo.png" title="Moxtra" alt="" />
                  <h3 style="margin-bottom: 0;font-zie:30px;">Meet</h3>
              </div>
          </div>

          <div style="min-height:150px;
                      padding:20px;
                      margin: 26px 20px;">
              
   </div>
      <div style="padding: 10px 20px; font-size: 0.9em;margin-top:-205px;">
        <p>EWA: Discussion on ${meetTitle}</p>
        <p>When : ${scheduleMeet.date}</p>
      </div>
      <div style="padding:10px 20px; font-size: 0.9em;">
        Meet Id: ${scheduleMeet.meetID}
      </div>
      <div style="padding: 10px 20px; font-size: 0.9em;">
       <p>Click on the link below to join Moxtra Meet at the scheduled time:</p>
       <p> ${joinUrl}</p>
      </div>
  </body>
  </htm>`
    } else {
      var html = `<!DOCTYPE html>
    <html>
    <title>Moxtra Invite</title>
    <body style="background:#ffffff; font-family: Arial, Helvetica, sans-serif;">
  
        <!-- main body content -->
        <div style="width:100%; margin:0 auto;">
            <!-- logo container-->
            <div style="border-bottom:#cdcdcd 1px solid; padding: 10px 0px; margin: 0 20px;" />
                <div style="display:inline-block; width:49%; vertical-align: bottom;">
                    <h3 style="margin-bottom: 0;">Meet Invite</h3>
                </div>
                <div style="display:inline-block; width:40%;" align="right">
                    <img src="http://${HOSTNAME}/public/images/moxtra-logo.png" title="Moxtra" alt="" />
                </div>
            </div>
  
            <div style="background: #f7f7f7;
                        border:#cdcdcd 1px solid;
                        border-top:#F39C12 6px solid;
                        min-height:150px;
                        padding:20px;
                        margin: 26px 20px;">
  
                <div style="background-image: url('http://${HOSTNAME}/public/images/meetImage.jpg');
                            padding:0 0 0 80px;
                            background-repeat: no-repeat;
                            min-height:80px;">
                    <h2 style="margin: 5px 0;">${meetTitle}</h2>
                    <p style="font-size:12px;">Hosted by ${senderName} </p>
                </div>
                <a style="border: none;
                            background: #F39C12;
                            border-radius:10px;
                            font-size:14px;
                            font-weight:bold;
                            padding:10px 30px;
                            cursor:pointer;
                            color:#ffffff;text-decoration:none;"
                            href=${joinUrl}
                            target='_blank'>
                    Join
                </a>
     </div>
        <div style="padding: 10px 20px; font-size: 0.9em;margin-left:480px;margin-top:-165px;">
  
                <div style="margin: 30px 0;width:94px;">
                <p>${noOfMembers} Participant</p>
                    <img src="http://${HOSTNAME}/public/images/user.png" title="User Name" alt="" width="50" height="50" />
                </div>
            </div>
  
        </div>
        <div>
          ${scheduleMeet}
        </div>
    </body>
    </html> `
    }
    return html
  },
  getCancelMeetWebPage : (meetTitle, date, req) => {
    const HOSTNAME = req.headers.host
    var html =
    `<!DOCTYPE html>
  <html>
  <title>Moxtra Invite</title>
  <body style="background:#ffffff; font-family: Arial, Helvetica, sans-serif;">

      <!-- main body content -->
      <div style="width:100%; margin:0 auto;">
          <!-- logo container-->
          <div style="border-bottom:#cdcdcd 1px solid; padding: 10px 0px; margin: 0 20px;" />
              <div style="display:inline-block; width:49%; vertical-align: bottom;">
                  
              </div>
              <div style="display:inline-block; width:40%;" align="right">
                  <img src="http://${HOSTNAME}/public/images/moxtra-logo.png" title="Moxtra" alt="" />
                  <h3 style="margin-bottom: 0;font-zie:30px;">Meet</h3>
              </div>
          </div>

          <div style="min-height:150px;
                      padding:20px;
                      margin: 26px 20px;">
              
   </div>
      <div style="padding: 10px 20px; font-size: 0.9em;margin-top:-205px;">
        <p>This meeting has been cancelled.</p>
        <p>${meetTitle}</p>
        <p>When : ${date}</p>
      </div>      
      
  </body>
  </htm>`

  return html
  }
}
