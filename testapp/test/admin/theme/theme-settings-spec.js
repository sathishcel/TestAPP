process.env.NODE_ENV = 'test'
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const securityConfig = require('../../../config/security-config')
const dbConfig = require('../../../config/database-config')
const knex = require('knex')(dbConfig)

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../../app')
let should = chai.should()
let expect = chai.expect

chai.use(chaiHttp)

let ServerAddr = 'http://localhost:4000'
const mockData = require('../../data')

const GETTHEMEAPI = '/admin/themeSettings/settingsPageInfo'
const PUTTHEMEAPI = '/admin/themeSettings/modifySettings'
const USERNAME = mockData.user1.email
const PASSWORD = 'Cel@123'
const HELPER = require('../../common-functions')
const schema = require('../../../schema/admin/theme-settings')
const path = require('path')

var IMAGEPATH = path.join(__dirname, '/celestialLogo.png')
var FILENAME = 'celestialLogo.png'
var WRONGEXTPATH = path.join(__dirname, '../../common-functions.js')
var ALTFILENAME = 'common-functions.js'

describe('Admin Settings', function () {
  describe('should handle Error Test Cases', () => {
    // Test life cycle hooks to insert data

    // Before executing test case
    beforeEach(function (done) {
      knex.insert(mockData.roleData).into('roles').then(function (id) {})
      knex.insert([mockData.user1, mockData.user2]).into('users').then(function (id) {})
      knex.insert(mockData.organization1).into('organizations').then(function (id) {})
      knex.insert(mockData.themeData).into('theme_settings').then(function (id) {})
      knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
      knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})
      knex.insert(mockData.perm_factors).into('permissions').then(function (id) {
        console.log('Permissions data inserted')
      })
      knex.insert([mockData.employee1, mockData.employee2, mockData.employee3, mockData.employee4]).into('employees').then(function (id) {
        done()
      })
    })
    // After executing test case
    afterEach(function (done) {
      knex('roles').truncate().then(function (id) {})
      knex('users').truncate().then(function (id) {})
      knex('employees').truncate().then(function (id) {})
      knex('theme_settings').truncate().then(function (id) {})
      knex('permissions').truncate().then(function (id) {})
      knex('org_address').truncate().then(function (id) {})
      knex('organizations').truncate().then(function (id) {
        done()
      })
    })
    it('should Update Organization theme settings if only admin user', (done) => {
      HELPER.get_token(mockData.user2.email, 'Cel@123').then((token) => {
        chai.request(ServerAddr)
          .put(PUTTHEMEAPI).send({})
          .set('Authorization', token)
          .field('isLight', 'false')
          .field('fontFamily', 'Arial')
          .attach('organizationLogo', IMAGEPATH, FILENAME)
          .field('isBackgroundImage', 'true')
          .attach('backgroundImage', IMAGEPATH, FILENAME)
          .field('backgroundColor', 'blue')
          .field('isUserPanelImage', 'false')
          .field('userPanelColor', 'blue')
          .attach('userPanelImage', IMAGEPATH, FILENAME)
          .field('headerColor', 'red')
          .end((err, res) => {
            console.log(err)
            res.body.responseCode.should.equal(401)
            res.body.message.should.equal('Permission denied')
            done()
          })
      })
    }).timeout(50000)

    it('should get admin theme-settings data', function (done) {
      HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
        knex('theme_settings').truncate().then(function (id) {})
        chai.request(ServerAddr)
          .get(GETTHEMEAPI)
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            expect(res).to.be.status(200)
            res.body.responseCode.should.equal(3004)
            res.body.message.should.equal('Error in getting theme settings')
            done()
          })
      })
    }).timeout(50000)
    it('should get Error on Update Organization theme settings data', (done) => {
      HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
        knex('theme_settings').truncate().then(function (id) {})
        chai.request(ServerAddr)
          .put(PUTTHEMEAPI)
          .set('Authorization', token)
          .field('isLight', 'false')
          .field('fontFamily', 'Arial')
          .attach('organizationLogo', IMAGEPATH, FILENAME)
          .field('isBackgroundImage', 'true')
          .attach('backgroundImage', IMAGEPATH, FILENAME)
          .field('backgroundColor', 'blue')
          .field('isUserPanelImage', 'false')
          .field('userPanelColor', 'blue')
          .attach('userPanelImage', IMAGEPATH, FILENAME)
          .field('headerColor', 'red')
          .end((err, res) => {
            console.log(err)
            res.body.responseCode.should.equal(3003)
            res.body.message.should.equal('Error in Updating Theme Settings')
            done()
          })
      })
    }).timeout(50000)
  })

  describe('should handle passed Test Cases', () => {
    // Test life cycle hooks to insert data
    // before executing test case
    before(function (done) {
      knex('roles').truncate().then(function (id) {})
      knex('users').truncate().then(function (id) {})
      knex('employees').truncate().then(function (id) {})
      knex('theme_settings').truncate().then(function (id) {})
      knex('predefined_themes').truncate().then(function (id) {})
      knex('organizations').truncate().then(function (id) {})
      knex.insert(mockData.roleData).into('roles').then(function (id) {})
      knex.insert([mockData.user1, mockData.user2]).into('users').then(function (id) {})
      knex.insert(mockData.employee1).into('employees').then(function (id) {})
      knex.insert(mockData.predefinedThemes).into('predefined_themes').then(function (id) {
        console.log('Predefined themes data inserted')
      })
      knex.insert(mockData.perm_without_factors).into('permissions').then(function (id) {})
      knex.insert(mockData.perm_with_factors).into('permissions').then(function (id) {})
      knex.insert(mockData.perm_factors).into('permissions').then(function (id) {
        console.log('Permissions data inserted')
      })
      knex.insert(mockData.organization1).into('organizations').then(function (id) {
        console.log('Organization data inserted')
        knex.insert(mockData.themeData).into('theme_settings').then(function (id) {})
      }).finally(function () {
        console.log('ThemeSettings data inserted')
        done()
      })
    })

    after(function (done) {
      knex('roles').truncate().then(function (id) {})
      knex('users').truncate().then(function (id) {})
      knex('employees').truncate().then(function (id) {})
      knex('theme_settings').truncate().then(function (id) {})
      knex('predefined_themes').truncate().then(function (id) {})
      knex('permissions').truncate().then(function (id) {})
      knex('organizations').truncate().then(function (id) {})
      done()
    })
    it('should not be allowed to access without jwt token', (done) => {
      chai.request(ServerAddr)
        .get(GETTHEMEAPI)
        .end((err, res) => {
          console.log(err)
          expect(res).to.have.status(401)
          done()
        })
    }).timeout(50000)
    it('should Update Organization theme settings data', (done) => {
      HELPER.get_token(mockData.user1.email, PASSWORD).then((token) => {
        console.log(token)
        chai.request(ServerAddr)
          .put(PUTTHEMEAPI)
          .set('Authorization', token)
          .field('isLight', 'false')
          .field('fontFamily', 'Arial')
          .attach('organizationLogo', IMAGEPATH, FILENAME)
          .field('isBackgroundImage', 'true')
          .attach('backgroundImage', IMAGEPATH, FILENAME)
          .field('backgroundColor', 'blue')
          .field('isUserPanelImage', 'false')
          .field('userPanelColor', 'blue')
          .attach('userPanelImage', IMAGEPATH, FILENAME)
          .field('headerColor', 'red')
          .end((err, res) => {
            console.log(err)
            expect(res).to.be.status(200)
            expect(res.body.responseCode).to.equal(2000)
            done()
          })
      })
    }).timeout(50000)
    it('should get admin settings data', function (done) {
      HELPER.get_token(USERNAME, PASSWORD).then((token) => {
        chai.request(ServerAddr)
          .get(GETTHEMEAPI)
          .set('Authorization', token)
          .end((err, res) => {
            console.log(err)
            expect(res).to.be.status(200)
            res.body.should.be.a('object')
            expect(res.body).to.be.jsonSchema(schema.theme_response)
            res.body.message.should.equal('Sucessfully sent Theme settings')
            done()
          })
      }).catch(function (err) {
        console.log(err)
      })
    }).timeout(50000)
    it('should allow only images in attachment for post theme settings', (done) => {
      HELPER.get_token(USERNAME, PASSWORD).then((token) => {
        knex('theme_settings').truncate().then(function (id) {})
        chai.request(ServerAddr)
          .put(PUTTHEMEAPI)
          .set('Authorization', token)
          .field('isImage', 'true')
          .field('isLight', 'true')
          .field('fontFamily', 'Arial')
          .attach('organizationLogo', IMAGEPATH, FILENAME)
          .attach('backgroundImage', IMAGEPATH, FILENAME)
          .attach('headerImage', WRONGEXTPATH, ALTFILENAME)
          .attach('userPanelImage', IMAGEPATH, FILENAME)
          .field('backgroundColor', 'blue')
          .field('headerColor', 'red')
          .field('userPanelColor', 'blue')
          .end((err, res) => {
            console.log(err)
            expect(res).to.be.status(200)
            res.body.should.be.a('object')
            res.body.responseCode.should.equal(3001)
            res.body.message.should.equal('Only Images are allowed')
            done()
          })
      })
    }).timeout(50000)
  })
})
