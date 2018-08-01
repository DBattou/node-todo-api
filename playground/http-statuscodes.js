var statusCodes = {};

statusCodes[exports.BAD_REQUEST = 400] = "Bad Request";
statusCodes[exports.NOT_FOUND = 404] = "Not Found";
sstatusCodes[exports.OK = 200] = "OK";
sstatusCodes[exports.UNAUTHORIZED = 401] = "Unauthorized";
s
exports.getStatusText = function(statusCode) {
  if (statusCodes.hasOwnProperty(statusCode)) {
    return statusCodes[statusCode];
  } else {
    throw new Error("Status code does not exist: " + statusCode);
  }
};
