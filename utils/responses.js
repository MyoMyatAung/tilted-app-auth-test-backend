exports.successResponse = (res, status, message, meta, data) => {
  return res.status(status).json({
    statusCode: status,
    message: message,
    data,
    meta,
  });
};

exports.errorResponse = (res, status, message, error) => {
  return res.status(status).json({
    statusCode: status,
    message: message,
    error,
  });
};