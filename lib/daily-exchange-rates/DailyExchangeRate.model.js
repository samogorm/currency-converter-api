"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DailyExchangeRate_schema_1 = __importDefault(require("./DailyExchangeRate.schema"));
var DailyExchangeRate = /** @class */ (function () {
    function DailyExchangeRate() {
        var _this = this;
        /**
         * Stores a currency rate to our database.
         *
         * @param String base The base currency.
         */
        this.store = function (exchangeRate) { return __awaiter(_this, void 0, void 0, function () {
            var dailyExchangeRateSchema;
            return __generator(this, function (_a) {
                dailyExchangeRateSchema = new DailyExchangeRate_schema_1.default();
                dailyExchangeRateSchema.date = exchangeRate.date;
                dailyExchangeRateSchema.base_currency = exchangeRate.base;
                dailyExchangeRateSchema.rates = exchangeRate.rates;
                dailyExchangeRateSchema.archivable = false;
                return [2 /*return*/, dailyExchangeRateSchema.save(function (err) {
                        if (err) {
                            console.log("ERROR: " + err);
                            return false;
                        }
                        return true;
                    })];
            });
        }); };
        /**
         * Gets exchange rates for the base currency.
         *
         * @param {String} base the base currency code.
         */
        this.getByBase = function (base) { return __awaiter(_this, void 0, void 0, function () {
            var exchangeRates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DailyExchangeRate_schema_1.default.findOne({ base_currency: base }).then(function (data) {
                            exchangeRates = data;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, exchangeRates];
                }
            });
        }); };
        /**
         * Removes old entries from the database if they are older
         * than yesterday.
         *
         * If we have only ONE set of data for a specific day, and that
         * data is 3 days old or older, we will keep that last record set.
         */
        this.removeOldEntries = function () { return __awaiter(_this, void 0, void 0, function () {
            var today, yesterday;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        today = new Date();
                        yesterday = new Date().setDate(today.getDate() - 1);
                        return [4 /*yield*/, DailyExchangeRate_schema_1.default.find({ datetime_retrieved: { $lte: yesterday } }).remove(function (err) {
                                if (err)
                                    return false;
                                return true;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    return DailyExchangeRate;
}());
exports.default = DailyExchangeRate;
