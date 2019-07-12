"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var DailyExchangeRateSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true
    },
    base_currency: {
        type: String,
        required: true
    },
    rates: {
        type: Object,
        required: true
    },
    datetime_retrieved: {
        type: Date,
        default: Date.now
    },
    archivable: {
        type: Boolean,
        default: false,
        required: true
    }
});
exports.default = mongoose_1.default.model('DailyExchangeRate', DailyExchangeRateSchema);
