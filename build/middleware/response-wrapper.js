export function responseWrapper(req, res, next) {
    var _a;
    var apiRes = (_a = res.locals) === null || _a === void 0 ? void 0 : _a.apiResponse;
    if (!apiRes)
        next();
    var data = apiRes.data, code = apiRes.code, success = apiRes.success;
    res.status(code || 200).json({ success: success !== null && success !== void 0 ? success : true, data: data });
}
//# sourceMappingURL=response-wrapper.js.map