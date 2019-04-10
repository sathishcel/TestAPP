module.exports = {
    'login':{
        'emailNotFound': 'Entered Email address is not registered',
        'emailPasswordIncorrect':'Email address or Password is incorrect',
        'apiInputMissing':'API inputs are missing',
        'successfullyAuthenticated':'User is Authenticated successfully',
        'wrongTimezone': 'Wrong Timezone Value. Please pass correct timezone'
    },
    'register':{
        'emailInvalid':'Email address is invalid',
        'noAssignedPermissions':'No assigned permissions for the entered Email address.Please assign permissions',
        'registerSuccess':'Registered Successfully',
        'emailExit':'The entered Email address is already registered',
     },
    'verifyOtc':{
        'OtcMatch':'User OTC matches',
        'invalidOtc':'Invalid OTC entered'
     },
     'forget':{
         'emailNotRegOrg':'Email is not registered with organisation. Ask for invitation link',
         'emailNotRegEwa':'Email is not registered with EWA. Complete Registration process',
         'limitReached':'Maximum limit reached, Please try after 00.00 hour',
         'emailVerify':'Email is verified and OTC has been sent to your Email Address'
     },
     'verifyEmail':{
        'emailVerified':'Email is verified',
     },
     'resetPassword':{
       'passwordChanged':'Password changed Successfully',
       'oldNewPasswordMatched': 'New Password should not be same as Old Password. Please use different Password.'
     },
     'resendCode':{
        'OtcResend':'OTC has been re-sent to Email Address'
     },
     'moxtraAccessToken':{
        'moxtraSucces':'Moxtra Authentication Successful'
     },
     'sendChatInvite':{
          'groupChat':'Choose group-chat for more than one invitee',
          'chatInvit':'Chat Invitation sent successfully',
          'noMail':'No Mailer to send chat invite'
     },
     'getUserProfile':{
          'emailNotExit':'User profile for given email doesn\'t exist',
          'userDetails':'User details fetched successfully'
     },
     'getInputFilterData':{
        'successfullyFetched':'Successfully fetched filter data',
     },
     'updateUserProfile':{
         'updatedProfile':'Updated User profile data'
     },
     'getPendingEditRequests':{
        'succesfullfetchReq':'Successfully fetched pending edit requests'
     },
     'getPastEditRequests':{
      'successfullyFetchedRequests':'Successfully fetched all edit requests'
     },
     'searchUserProfile':{
        'userNotFount':'No such user exist',
        'orgNotExit':'Given Org Address Id doesn\'t exist',
        'searchResult':'Successfully fetched search results'
     },
     'userData':{
       'sucessfullySendInformation':'Sucessfully sent User Information',
       'logUserNotFound':'No User Information for logged-in user'
     },
     'organizationConfig':{
          'error':'Error in getting Organization configuration',
     },
     'sendMeetInvite':{
        'groupChatInvite':'Choose group-chat for more than one invitee',
        'meetChat':'Meet Invitation sent successfully',
        'noMailSend':'No Mailer to send meet invite'
     },
     'cancelMeetSchedule':{
      'cancelMet':'Canceled Meet message sent successfully',
      'noMailCancel':'No Mailer to send cancel meet'
     },
     'headerInfo':{
       'header':'Sucessfully sent Header Information',
       'headerData':'No Header Information for logged-in user'
     },
     'employeeList':{
         'sendEmplist':'Successfully Sent Employee List',
    },
    'removeuser':{
          'userNotfound':'No user found',
          'daletedSuccessfully':'Successfully Deleted'
    },
    'getGroupsRoles':{
        'groupRule':'Groups, Roles and Permissions are fetched',
        'noQuery':'No query parameters passed',
        'noGroups':'No groups to delete',
        'deleteGroup':'Group deleted successfully',
        'noSuchGroup':'No such group exists',
        'listSent':'Groups list sent successfully',
        'deleteGroupInfo':'Delete info for group'
    },
    'searchUser':{
           'userDetails':'User details is fetched',
           'noUser':'No such user exist'
    },
    'adminData':{
          'emailNotExit':'Entered Email address is not registered',
          'adminAvailable':'Admin information is now available',
          'permissionDenied':'Permission denied'
    },
    'employee':{
          'successfullySendOtc':'Successfully Sent Employee OTC',
          'noOtc':'No OTC',
          'userCreated':'User created successfully',
          'empOtherDetails':'Employee Other details are added',
          'alreadyAdd':'Already other details have been added',
          'empDetailsUpdated':'Employee Other details are updated',
          'noOtherInfo':'No other info details exists'
    },
    'addEmployeeBasicInfo':{
          'gradeEmpNotExit':'Grade for employee doesn\'t exist.Please create grade',
          'validOrg':'Please enter valid organization name',
          'groupNotExit':'Selected groups doesn\'t exist. Please create',
          'fieldNotFormate':'Fields are not in required format',
          'validJobLocation':'Please enter valid Job location id',
          'validEmail':'Similar Email address already exists'
    },
    'addEmployeePermissions':{
          'empPermissionsInvalid':'Employee Permissions are Empty/Invalid',
          'empIdNotExit':'Entered employee ID does\'t exist',
          'empPermissionsAdd':'Already Employee Permissions have been added',
          'selectedPermissionsNotExit':'Selected Permissions doesn\'t exist',
          'empPermsnUpdated':'Employee Permissions are Updated',
          'empPermissionMissing': 'Please enter Permission Id\'s',
          'empGroupsMissing': 'Please enter selected Group Id\'s',
          'permissionGroupIds': 'Employee Permissions / GroupIds are Empty/Invalid',
          'empPermissionsAdded': 'Employee Permissions are added'
    },
    'addEmployeeBankInfo':{
           'empIdNull':'Employee ID is null',
           'empFinanceAdd':'Employee Financial details are added',
           'allBankDetailsAdd':'Already Bank details have been added',
           'empFinanceEdit':'Employee Financial details edited successfully',
           'empNoBank':'No Bank Info details exists',
    },
    'addGovtDocsInfo':{
         'govtInfoAdd':'Govt. Doc Info added successfully',
         'alreadyGovetDetailsAdd':'Already government details have been added',
         'govtInfoEdit':'Govt. Doc info edited successfully',
         'noGovtExist':'No government details exists'
    },
    'addEmployeeEmergencyInfo':{
             'EmergencyContact':'Emergency Contact info added successfully',
             'alreadyEmergencyAdd':'Already emergency details have been added',
             'emergencyEdited':'Emergency Contact info edited successfully',
             'noEmergency':'No Emergency details exists'
    },
    'addEmployeeContactInfo':{
      'contctAdd':'Contact info added successfully',
      'alreadyAddContact':'Already contact details have been added',
      'contactsEdited':'Contact info edited successfully',
      'noContacts':'No Contact details exists'
    },
    'addEmployeeFamilyInfo':{
        'familyInfoAdd':'Family info added successfully',
        'alreadyAddFamily':'Already Family details have been added',
        'govtDocSucces':'Govt. Docs are successfully fetched',
        'govtAcctSucces':'Govt. Account are successfully fetched',
        'familyInfoEdited':'Family info edited successfully',
        'noFamily':'No family details exists'
    },
    'approveRequest':{
        'noIdExit':'No Such Request ID exists',
        'alreadyArrvd':'Already request has been approved',
        'alreadyApproved':'Already request has been approved.You cannot reject',
        'Rejected':'Already request has been rejected',
        'belowReqApprvd':'Below Request changes has been Approved',
        'belowRejected':'Below Request changes has been rejected',
        'successApprvd':'Successfully approved request',
        'rejectedRequest':'Successfully rejected request',
        'reject':'Already request has been rejected. You cannot approve'
    },
    'addGradeInfo':{
       'gradeAllrdyExt':'Similar grade already exists',
       'gradeNameExt':'Similar grade name already exists',
       'gradeSuccss':'Grade added successfully',
    },
    'editGradeInfo':{
        'nogrdExit':'No such GradeId exist',
        'grdSucces':'Grade edited successfully'
    },
    'deleteGradeInfo':{
       'noGrdDelet':'No Grades to Delete',
       'GrdDelet':'Grade Deleted successfully',
    },
    'gradeList':{
        'grdList':'Grades List sent successfully',
        'deleteGrade':'Delete info for grade',
        'fieldContent':'This field cannot be deleted as it is linked with some number of accounts'
    },
    'addGroupInfo':{
             'grpAlrdyExit':'Similar group already exists',
             'grpNameExit':'Similar group name already exists',
             'grpPrnsExit':'Similar permission group exist under the name',
             'grdPrmsEmpty':'Grades permissions are Empty/Invalid',
             'emailNotReg':'Entered Email Address is not registered',
             'prmsnNotExt':'Selected permissions doesn\'t exist',
             'grpAddSucss':'Group added successfully',
             'noSuchGroup':'No such GroupId exist',
             'similarGroupExit':'Similar group already exists',
             'similarPermisionExit':'Similar permission group exist under the name',
             'gradePermissionEmpty':'Grades permissions are Empty/Invalid',
             'selectedPemissionNotExit':'Selected permissions doesn\'t exist',
             'groupEditedSuccess':'Group edited successfully'
    },
    'orgAddress_controller':{
              'similarAddressExit':'Similar address already exists',
              'similarShortExit':'Similar short name already exists',
              'addressAddSuccess':'Address added successfully',
              'emailAddressNotRegister':'Entered Email Address is not registered',
              'permissionDenied':'Permission denied',
              'noSuchOrgAddressExit':'No such Org Address ID exists',
              'addressDelete':'Address deleted successfully',
              'permissionDenied':'Permission denied',
              'deleteInfoAddress':'Delete info for address',
              'fieldCanNotDelete':'This field cannot be deleted as it is linked with some number of accounts',
              'orgAddressList':'Organization address List',
              'editUser':'User edited successfully',
              'editAddress':'Address edited successfully',
              'noAddress':'No such org Address exists'
    },
    'permissions_controller':{
              'pemissionDataSent':'Permissions data sent successfully',
              'pemissionDenied':'Permission denied'
    },
    'roles_controller':{
               'similarRoleExit':'Similar role already exists',
               'similarRoleNameExit':'Similar role name already exists',
               'noSuchRoleExit':'No such Role Group exists',
               'newRoleCreate':'New Role is created',
               'permissionDenied':'Permission denied',
               'noSuchRoleExit':'No such RoleId exist',
               'roleEdited':'Role edited successfully',
               'noSuchRole':'No such Role to Delete',
               'roleDelete':'Role deleted successfully',
               'roleList':'Roles list sent successfully',
               'groupMissing': 'Please pass Group Id',
               'roleCreated':'Role is already created under the name of'
    },
    'predefined_themes_controller':{
                'successfullySend':'Sucessfully sent Predefined Theme settings',
                'predefineThemes':'Predefined themes does\'t exist',
                'permissionDenied':'Permission denied'
    },
    'theme_settings_controller':{
        'emailNotRegister':'Entered Email address is not registered',
        'successfullySendTheme':'Sucessfully sent Theme settings',
        'errorInTheme':'Error in getting theme settings',
        'themeSettingTableNotExit':'Theme settings table doesn\'t exist',
        'imageAllow':'Only Images are allowed',
        'errorInUpdate':'Error in Updating Theme Settings'
    },
    'address':{
        'addressLine1': '-', 
        'addressLine2': '-', 
        'city': '-', 
        'state': '-', 
        'country': '-', 
        'zipCode': '-' 
    }

}