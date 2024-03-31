var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import oracledb from 'oracledb';
import { formatDate } from '../utils/date-helper.js';
export var hello = 'hi mom!';
export var DBBroker = (function () {
    function DBBroker() {
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    }
    DBBroker.getInstance = function () {
        try {
            if (this._instance === null) {
                this._instance = new DBBroker();
            }
            return this._instance;
        }
        catch (err) {
            console.error(err);
        }
    };
    DBBroker.prototype.openConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4, oracledb.getConnection({
                                user: 'c##mr',
                                password: 'c##mr',
                                connectString: 'localhost/orcl',
                            })];
                    case 1:
                        _a.connection = _b.sent();
                        return [3, 3];
                    case 2:
                        err_1 = _b.sent();
                        throw err_1;
                    case 3: return [2];
                }
            });
        });
    };
    DBBroker.prototype.closeConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.connection.close()];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        err_2 = _a.sent();
                        return [2, err_2];
                    case 3: return [2];
                }
            });
        });
    };
    DBBroker.prototype.getFieldsForSchema = function (entitySchema) {
        var sql = '';
        entitySchema.columns.forEach(function (item, index) {
            sql += " ".concat(entitySchema.tableAlias, ".").concat(item.getter ? item.getter : String(item.name), " ");
            sql += " as \"".concat(item.alias ? item.alias : String(item.name), "\" ");
            if (index < entitySchema.columns.length - 1) {
                sql += ' , ';
            }
        });
        return sql;
    };
    DBBroker.prototype.getWhereQuery = function (entitySchema) {
        var sql = '';
        var criteria = entitySchema.filter;
        sql += ' WHERE ';
        Object.keys(criteria).forEach(function (key, index) {
            sql += "".concat(entitySchema.tableAlias, ".").concat(key, " = ");
            if (typeof criteria[key] === 'string') {
                sql += "'".concat(criteria[key], "'");
            }
            else {
                sql += criteria[key];
            }
            if (index < Object.keys(criteria).length - 1) {
                sql += ' AND ';
            }
        });
        return sql;
    };
    DBBroker.prototype.getJoinRecursive = function (mainSchema) {
        var _this = this;
        var sql = '';
        var joinMeta = mainSchema.joinMeta;
        if ((joinMeta === null || joinMeta === void 0 ? void 0 : joinMeta.length) > 0) {
            joinMeta.forEach(function (join, index) {
                var subSchema = join.subJoin;
                sql += " ".concat(join.joinType, " JOIN ").concat(subSchema.tableName, " ").concat(subSchema.tableAlias, " ON ");
                join.joinKeys.forEach(function (key, j) {
                    sql += "".concat(mainSchema.tableAlias, ".").concat(join.joinKeys[j], " = ").concat(subSchema.tableAlias, ".").concat(subSchema.joinKey[j], " ");
                    if (j < join.joinKeys.length - 1)
                        sql += ' AND ';
                });
                if (subSchema.joinMeta) {
                    sql += _this.getJoinRecursive(subSchema);
                }
            });
        }
        return sql;
    };
    DBBroker.prototype.getFieldsRecursive = function (mainSchema) {
        var _this = this;
        var sql = '';
        sql += this.getFieldsForSchema(mainSchema);
        var joinMeta = mainSchema.joinMeta;
        joinMeta === null || joinMeta === void 0 ? void 0 : joinMeta.forEach(function (join) {
            sql += ',' + _this.getFieldsRecursive(join.subJoin);
        });
        return sql;
    };
    DBBroker.prototype.select = function (mainSchema) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'SELECT ' + this.getFieldsRecursive(mainSchema);
                        sql += " FROM ".concat(mainSchema.tableName, " ").concat(mainSchema.tableAlias);
                        sql += this.getJoinRecursive(mainSchema);
                        if (mainSchema.filter) {
                            sql += this.getWhereQuery(mainSchema);
                        }
                        return [4, this.executeQuery(sql)];
                    case 1:
                        response = _a.sent();
                        return [2, response.rows];
                }
            });
        });
    };
    DBBroker.prototype.delete = function (entitySchema) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = "DELETE FROM ".concat(entitySchema.tableName, " ").concat(entitySchema.tableAlias, " ");
                        if (!entitySchema.filter)
                            throw new Error('No filter specified');
                        command += this.getWhereQuery(entitySchema);
                        return [4, this.executeQuery(command)];
                    case 1:
                        response = _a.sent();
                        return [4, this.connection.commit()];
                    case 2:
                        _a.sent();
                        return [2, response];
                }
            });
        });
    };
    DBBroker.prototype.insert = function (entitySchema) {
        return __awaiter(this, void 0, void 0, function () {
            var command, output, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = "INSERT INTO ".concat(entitySchema.tableName, " ").concat(entitySchema.insertQuery, " ");
                        output = {};
                        if (entitySchema.autoIncrement) {
                            command += "RETURNING ".concat(entitySchema.autoIncrement, " INTO :id ");
                            output = { id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } };
                        }
                        return [4, DBBroker._instance.connection.execute(command, output)];
                    case 1:
                        result = _a.sent();
                        return [4, this.connection.commit()];
                    case 2:
                        _a.sent();
                        return [2, result];
                }
            });
        });
    };
    DBBroker.prototype.update = function (entitySchema) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = "UPDATE ".concat(entitySchema.tableName, " ").concat(entitySchema.tableAlias, " ").concat(entitySchema.updateQuery);
                        command += this.getWhereQuery(entitySchema);
                        return [4, this.executeQuery(command)];
                    case 1:
                        response = _a.sent();
                        return [4, this.connection.commit()];
                    case 2:
                        _a.sent();
                        return [2, response];
                }
            });
        });
    };
    DBBroker.prototype.patch = function (entitySchema) {
        return __awaiter(this, void 0, void 0, function () {
            var command, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = "UPDATE ".concat(entitySchema.tableName, " ").concat(entitySchema.tableAlias, " SET ");
                        Object.keys(entitySchema.payload).forEach(function (key, index) {
                            var prop = entitySchema.payload[key];
                            if (typeof prop === 'object' && !(prop instanceof Date)) {
                                return;
                            }
                            command += "".concat(key, " = ");
                            if (prop && prop instanceof Date) {
                                command += "'".concat(formatDate(prop), "'");
                            }
                            else if (typeof prop === 'string') {
                                command += "'".concat(prop, "'");
                            }
                            else if (typeof prop !== 'object') {
                                command += prop;
                            }
                            if (index < Object.keys(entitySchema.payload).length - 1) {
                                command += ' , ';
                            }
                        });
                        command += this.getWhereQuery(entitySchema);
                        return [4, this.executeQuery(command)];
                    case 1:
                        response = _a.sent();
                        return [4, this.connection.commit()];
                    case 2:
                        _a.sent();
                        return [2, response];
                }
            });
        });
    };
    DBBroker.prototype.executeQuery = function (sql, binds) {
        if (binds === void 0) { binds = []; }
        return this.connection.execute(sql, binds);
    };
    DBBroker._instance = null;
    return DBBroker;
}());
//# sourceMappingURL=dbBroker.js.map