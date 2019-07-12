"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScheduleJobUtil = /** @class */ (function () {
    function ScheduleJobUtil() {
        /**
         * This will run a function every (x) milliseconds.
         *
         * @param {number} minutes The number of minutes.
         * @param {Function} jobToRun The function to run.
         */
        this.runEvery = function (minutes, jobToRun) {
            if (minutes === void 0) { minutes = 1; }
            var milliseconds = minutes * 60 * 1000;
            setInterval(function () { return jobToRun(); }, milliseconds);
        };
    }
    return ScheduleJobUtil;
}());
exports.default = ScheduleJobUtil;
