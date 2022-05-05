import AbstractModal from "./AbstractModal.js";

export default class extends AbstractModal {
  constructor(id) {
    super();

    console.log('id:', id);

    this.init({
      modal: 'mod-image',
      openBtn: `${id}-comment`
    });
  }
}