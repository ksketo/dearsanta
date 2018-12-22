// Based on errorHandlers.js of course https://learnnode.com

/**
 * Catch Errors Handler
 * 
 * With async/await, you need some way to catch errors
 * Instead of using try{} catch(e) {} in each controller, we wrap the function in catchErrors(), 
 * catch and errors they throw, and pass it along to our express middleware with next()
 */
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/**
 * Not Found Error Handler
 * 
 * If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
 */
exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

/**
 * Production Error Handler
 * 
 * No stacktraces are leaked to user
 */
exports.productionErrors = (err, req, res, next) => {
  const status = err.status || 500;

  res.status(status);
  res.render('error', {
    status: status,
    message: status === 404 ? err.message : "Internal server error",
    error: {}
  });
};
