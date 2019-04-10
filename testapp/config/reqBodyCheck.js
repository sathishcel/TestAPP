module.exports = function (req,res) {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.json({
      responseCode: 4040,
      message: 'Empty Request Body'
    })
  }
}