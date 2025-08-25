export const errorHandler = (err, req, res, next) => {
  if (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal server error',
      details: err.details
    })
  }
  next()
}
