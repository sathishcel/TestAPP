'use strict'

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const securityConfig = require('./security-config')
const User = require('../models/user')

module.exports = function () {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = securityConfig.jwtSecret
  passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
    User.where('id', jwtPayload.id).fetch()
      .then(user => new Date(user.get('created_at')).getTime()  === new Date(jwtPayload.created_at).getTime() ? done(null, user) : done(null, false))
      .catch(err => done(err, false))
  }))
}
