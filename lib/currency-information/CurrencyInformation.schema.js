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
var CurrencyInformationSchema = new mongoose_1.Schema({
    country: String,
    currency: String,
    code: String,
    number: String,
    archived: Boolean,
    created_at: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model('CurrencyInformation', CurrencyInformationSchema);
