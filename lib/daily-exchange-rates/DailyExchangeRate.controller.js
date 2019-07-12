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
var APIRequest_util_1 = __importDefault(require("./../utils/APIRequest.util"));
var DailyExchangeRate_model_1 = __importDefault(require("./DailyExchangeRate.model"));
var CurrencyInformation_controller_1 = __importDefault(require("../currency-information/CurrencyInformation.controller"));
var DailyExchangeRateController = /** @class */ (function () {
    function DailyExchangeRateController() {
        var _this = this;
        this.currencyInformation = new CurrencyInformation_controller_1.default();
        /**
         * This will iterate over the available currency information
         * and then query each currency code to get the latest exchange
         * rates each day.
         */
        this.storeDailyCurrencyCodes = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve(this.currencyInformation.getCurrencyInformation()).then(function (values) {
                            values.map(function (value) { return __awaiter(_this, void 0, void 0, function () {
                                var exchangeRates;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getExchangeRatesFromAPI(value.code)];
                                        case 1:
                                            exchangeRates = _a.sent();
                                            return [4 /*yield*/, this.storeExchangeRates(exchangeRates)];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
        * Gets all currency rates for the provided currency.
        *
        * @param String base The base currency.
        */
        this.getExchangeRatesFromAPI = function (baseCurrency) { return __awaiter(_this, void 0, void 0, function () {
            var url, params, apiRequest, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "" + process.env.APP_EXCHANGE_RATE_API_URL;
                        params = { base: baseCurrency };
                        apiRequest = new APIRequest_util_1.default();
                        return [4 /*yield*/, apiRequest.get(url, params).then(function (data) {
                                return data;
                            })];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, data];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        /**
         * Stores the exchange rate in our database schema.
         *
         * @param any The exchange rate data.
         * @param any The API response.
         */
        this.storeExchangeRates = function (exchangeRates) { return __awaiter(_this, void 0, void 0, function () {
            var dailyExchangeRate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dailyExchangeRate = new DailyExchangeRate_model_1.default();
                        return [4 /*yield*/, dailyExchangeRate.store(exchangeRates)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        /**
         * Removed old/stale exhange rate entries to save storage on the db.
         *
         * @param {Number} days the number of days in minutes.
         */
        this.removeExchangeRates = function () { return __awaiter(_this, void 0, void 0, function () {
            var dailyExchangeRate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dailyExchangeRate = new DailyExchangeRate_model_1.default();
                        return [4 /*yield*/, dailyExchangeRate.removeOldEntries()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    return DailyExchangeRateController;
}());
exports.default = DailyExchangeRateController;
