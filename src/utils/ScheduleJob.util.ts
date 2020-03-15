class ScheduleJobUtil {
  /**
   * This will run a function every (x) milliseconds.
   * 
   * @param {number} minutes The number of minutes.
   * @param {Function} jobToRun The function to run.
   */
  runEvery = (minutes: number = 1, jobToRun: Function) => {
    const milliseconds = minutes * 60 * 1000;
    setInterval(() => jobToRun(), milliseconds);
  }
}

export default ScheduleJobUtil;
