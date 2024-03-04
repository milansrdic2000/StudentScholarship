import { HttpError } from 'http-errors';
import { OracleError } from './oracle-error-handler.js';
export function errorHandler(err, req, res, next) {
    var response = {
        success: false,
        message: err.message,
    };
    console.log('usao u error handle');
    if (err instanceof HttpError) {
        res.status(err.statusCode || 500).send(response);
    }
    else if (err instanceof OracleError) {
        res.status(500).send(response);
    }
    else {
        console.error(err);
        res.status(500).send(response);
    }
}
//# sourceMappingURL=error-handler.js.map