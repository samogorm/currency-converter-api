"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var APIRequestUtil = /** @class */ (function () {
    function APIRequestUtil() {
        this.get = function (url, params) {
            return axios_1.default.get(url, { params: params })
                .then(function (response) {
                if (response.status !== 200)
                    return Promise.reject(response.data);
                Promise.resolve(response.data);
                return response.data;
            })
                .catch(function (error) {
                console.log(error);
            });
        };
    }
    return APIRequestUtil;
}());
exports.default = APIRequestUtil;
