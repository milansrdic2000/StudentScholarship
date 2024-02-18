export function errorHandler(err, req, res, next) {
    console.error(err.statusCode);
    res.status(err.statusCode).send(err.message);
}
//# sourceMappingURL=error-handler.js.map