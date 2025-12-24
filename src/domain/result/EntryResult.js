class EntryResult {
  constructor(success, data = null, message = '') {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}

module.exports = EntryResult;
