module.exports =  {
  'staticBar': [
    {key: 'home', value: 'Home', icon: 'home', child: [], isMobile: true},
    {key: 'timeline', value: 'Timeline', icon: 'chat', child: [], isMobile: true},
    {key: 'meet', value: 'Meet', icon: 'call', child: [], isMobile: true},
    {key: 'myProfile', value: 'My Profile', icon: 'supervised_user_circle', child: [], isMobile: true},
    {key: 'myLeaves', value: 'My Leaves', icon: '', child: [
      {key: 'applyLeave', value: 'Apply Leave', icon: '', isMobile: true},
      {key: 'leaveLogs', value: 'Leave Logs', icon: '', isMobile: true},
    ], isMobile: true},
    {key: 'myAttendance', value: 'My Attendance', icon: '', child: [], isMobile: true/false},
    {key: 'holidayCalendar', value: 'Holiday Calendar', icon: '', child: [], isMobile: true/false},
  ], 
  'HR':  [
    {key: 'hr', value: 'HR', icon: '', child: [], isMobile: true}
  ],
  'VIEW_ATTEND': {key: 'viewAttendance', value: 'View Attendance', icon: '', isMobile: true},
  'CALEN_INFO': {key: 'uploadHolidays', value: 'Upload Holidays', icon: '', isMobile: true},
  'UPL_ATTEND': {key: 'uploadAttendance', value: 'Upload Attendance', icon: '', isMobile: true},  
  'UPL_USER_DATA':{key: 'uploadUserDB', value: 'Upload User Data', icon: '', isMobile: true},
  'ADDUSER' : {key: 'addUser', value: 'Add User', icon: '', isMobile: true},
  'VIEW_LEAV': {key: 'leaveRequests', value: 'Leave Requests', icon: '', isMobile: true},
  'PROF_REQU': {key: 'editProfileRequest', value: 'Profile Change Requests', icon: '', isMobile: true},
  'orgAdmin': [  
    {key: 'admin', value: 'Admin', icon: 'how_to_reg', child: [
    {key: 'groups', value: 'Groups', icon: 'people', isMobile: false},
    {key: 'roles', value: 'Roles', icon: 'scatter_plot', isMobile: false},
    {key: 'grades', value: 'Grades', icon: 'insert_link', isMobile: false},
    {key: 'orgAddress', value: 'Org Addresses', icon: 'location_on', isMobile: false},
    {key: 'leaveAllotment', value: 'Leave Allotment', icon: 'receipt', isMobile: false}
    ], isMobile: false}
  ],
  'IS': [
    {key: 'home', value: 'Home', icon: '', child: [], isMobile: true},
    {key: 'timeline', value: 'Timeline', icon: '', child: [], isMobile: true},
    {key: 'meet', value: 'Meet', icon: '', child: [], isMobile: true},
    {key: 'myProfile', value: 'My Profile', icon: '', child: [], isMobile: true},   
    {key: 'myLeaves', value: 'My Leaves', icon: '', child: [
      {key: 'applyLeave', value: 'Apply Leave', icon: '', isMobile: true},
      {key: 'leaveLogs', value: 'Leave Logs', icon: '', isMobile: true},
    ], isMobile: true},
    {key: 'myAttendance', value: 'My Attendance', icon: '', child: [], isMobile: true},
    {key: 'holidayCalendar', value: 'Holiday Calendar', icon: '', child: [], isMobile: true},
  ]
}
