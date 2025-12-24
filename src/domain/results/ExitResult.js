// domain/result/ExitResult.js
class ExitResult {
  constructor(success, data, message) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}

module.exports = ExitResult;
