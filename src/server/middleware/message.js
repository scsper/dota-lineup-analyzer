module.exports = function(req, res, next) {
    req.message = 'Hello Jess!';
    next();
};
