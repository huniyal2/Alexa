exports.errorHandler = (result, res) => {
  res.api.success = false;
  res.api.error.message = result.message || "Invalid Input";;
  res.api.error.details = result.details || [];
  res.api.statusCode = result.statusCode || 400;
  res.status(res.api.statusCode);

  return res.json(res.api);
};

exports.successHandler = (result, res) => {
  res.api.success = true;
  res.api.data = result.body || {};
  delete res.api.error;
  res.api.statusCode = result.statusCode || 200;
  res.status(res.api.statusCode);

  return res.json(res.api);
}