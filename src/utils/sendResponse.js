const sendResponse = (res, success, statusCode, data) => {
  return res.status(statusCode).json({
    success,
    count: data.length > 1 ? data.length : undefined,
    data,
  });
};

export default sendResponse;
