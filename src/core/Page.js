export class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('method get Root page');
  }

  afterRender() {

  }

  destroy() {

  }
}
