const sendResponse = (res, success, statusCode, data) => {
  return res.status(statusCode).json({
    success,
    count: data && data.length > 1 ? data.length : undefined,
    data: data ? data : undefined,
  });
};

export default sendResponse;
