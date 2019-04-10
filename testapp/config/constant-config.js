module.exports = {
  'SORTBYDATE': 'created_at',
  'ORDER': 'asc',
  'Pending': 1,
  'Approved': 2,
  'Rejected': 3,
  'TOTALPERMISSIONS': 24,
  'ORGCONFIG': 21,
  'ADDUSER': 1,
  'VIEW_PER_CONT': 2,
  'VIEW_EMP_CTC': 3,
  'VIEW_GOVT_DOCS': 4,
  'VIEW_EMP_PERM': 5,
  'VIEW_OTHER_INFO': 6,
  'EDIT_BAS_INFO': 7,
  'EDIT_EMER_INFO': 8,
  'EDIT_EMP_CTC': 9,
  'EDIT_GOV_DOCS': 10,
  'EDIT_EMP_PERM': 11,
  'EDIT_EMP_OTHER': 12,
  'APP_REJ': 19,
  'EDIT_PERS_CONTACT': 20,
  'VIEW_FAM_DETAIL': 23,
  'EDIT_FAM_DETAIL': 24,
  'THEME_SET': 25,
  'APP_REJ_PEER': 69,
  'APP_REJ_SR': 70,
  'APP_REJ_JR': 68,
  'VIEW_LEAV_REQ': 18,
  'VIEW_LEAV_REQ_JR': 65,
  'VIEW_LEAV_REQ_PEER': 66,
  'VIEW_LEAV_REQ_SR': 67,
  'UPL_USER_DATA': 17,
  'UPL_ATTEND': 16,
  'CALEN_INFO': 15,
  'VIEW_ATTEND': 13,
  'HRCONFIG': [1, 18, 19, 13, 15, 16, 17],
  'HRJRCONFIG': [1, 2, 3, 4, 18, 19, 13, 15, 16, 17],
  'INT_MAX': 2147483647,
  'userStatus': {
    'notVerified': 0,
    'verified': 1,
    'active': 2
  },
  'otcLimit': 3,
  'moxtra_sandbbox': {
    'client_id': 'n6DrIE277vI',
    'client_secret': 'gNs8X_5qx8k',
    'grant_type': 'http://www.moxtra.com/auth_uniqueid'
  },
  'role': {
    'admin': 'admin',
    'employee': 'employee'
  },
  'port': {
    'ui': ':3000'
  },
  'mailType':'text',
  'otcString': 'abcdefghijklm0123456789nopqrstuvwxyz0123456789ABCDEFGHIJKLM0123456789NOPQRSTUVWXYZ0123456789',
  'error_mail': {
    appenders: {
      error_log: {
        type: 'smtp',
        sender: 'ewa.support@celsysemail.celsyswtc.in',
        recipients: ['shivashankar@celsysemail.celsyswtc.in'],
        subject: 'An Error occurred in EWA Backend application',
        transport: 'SMTP',
        SMTP: {
          host: 'celsysemail.celsyswtc.in',
          port: 587,
          auth: {
            user: 'ewa.support@celsysemail.celsyswtc.in',
            pass: 'Cel@123'
          }
        }
      },
      info_log: { type: 'file', filename: 'log/ewa_backend.log' }
    },
    categories: {
      error_log: { appenders: ['info_log'], level: 'error' },
      info_log: { appenders: ['info_log'], level: 'info' },
      default: { appenders: ['info_log'], level: 'error' }
    }
  },
  'static_images': {
    'fav_icon': 'celestial.ico',
    'default_logo': 'logo/Celestial-LogoInner.png'
  }
}
