export default class {
  constructor() {}

  // initialize dialog html template
  init() {}

  // open dialog
  open() {}

  // close dialog
  close() {}

  // action about accept button (if exist)
  async accept(callback) {
    callback();
  }

  // action about cancel button (if exist)
  async cancel(callback) {
    callback();
  }
}