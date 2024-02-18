var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var OracleError = (function (_super) {
    __extends(OracleError, _super);
    function OracleError(code, message) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.name = 'OracleError';
        Object.setPrototypeOf(_this, OracleError.prototype);
        return _this;
    }
    return OracleError;
}(Error));
export { OracleError };
export function oracleErrorHandler(err, req, res, next) {
    if (err.code.startsWith('ORA-')) {
        var oracleError = new OracleError(err.code, err.message);
        next(oracleError);
    }
    else {
        next(err);
    }
}
//# sourceMappingURL=oracle-error-handler.js.map