import { getAllImage, getImage, removeImage, updateSocialInfo } from "../service/file.js";
import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle('Gallery');
  }

  async getHtml() {
    return `
      <h1>Gallery</h1>

      <hr>

      <ul id="gallery-collect">
    `;
  }

  async getAllCollect() {
    const res = await getAllImage().then(res => res);
    const fileArray = Array.from(res.files).sort((file1, file2) => {
      return file1.date < file2.date ? file1 : file2;
    });

    for (const file of fileArray) {
      await this.createImage(file);
    }
  }

  async createImage(file) {
    const collect = document.getElementById('gallery-collect');
    
    const newList = document.createElement('li');
    const newImage = document.createElement('img');
    let deleteImgBtn = undefined;

    const data = await getImage(file.id);
    if (data && data.user === file.user) {
      deleteImgBtn = document.createElement('span');
      deleteImgBtn.id = data.id;
      deleteImgBtn.classList.add('material-icons');
      deleteImgBtn.innerHTML = 'close';
      deleteImgBtn.onclick = async () => {
        await this.deleteImage(newList, file.id);
      }
    }

    newImage.id = file.id;
    newImage.src = file.data;

    collect.appendChild(newList);
    newList.appendChild(newImage);
    if (data && deleteImgBtn) {
      newList.appendChild(deleteImgBtn);
    }

    this.createSocialInfo(newList, file.id);
  }

  createSocialInfo(parentNode, id) {
    const socialDiv = document.createElement('div');
    const socialLike = document.createElement('span');
    const socialComment = document.createElement('span');

    socialLike.classList.add('material-icons');
    socialComment.classList.add('material-icons');

    socialLike.innerHTML = 'favorite_border'; // full: favorite
    socialComment.innerHTML = 'chat';

    socialLike.id = `${id}-like`;
    socialComment.id = `${id}-comment`;

    parentNode.appendChild(socialDiv);
    socialDiv.appendChild(socialLike);
    socialDiv.appendChild(socialComment);

    this.socialComment(parentNode, id);
    this.socialClick(socialLike, socialComment, document.getElementById(`${id}-form`));
  }

  async deleteImage(imageNode, nodeId) {
    const collect = document.getElementById('gallery-collect');

    const res = await removeImage(nodeId).then(data => data);
    if (res) alert(`Image ${nodeId} has delete!`);
    else {
      alert('Something wrong!');
      return ;
    }
    collect.removeChild(imageNode);
  }

  async socialClick(likeNode, commentNode, postNode) {
    likeNode.onclick = async (e) => {
      console.log(e.target);
    }

    commentNode.onclick = async (e) => {
      console.log(e.target);
    }

    postNode.onsubmit = async (e) => {
      e.preventDefault();

      const id = String(e.target.id).split('-')[0];
      const commentForm = document.forms[`${e.target.id}`][`${e.target.id}-input`];
      const res = await updateSocialInfo({ comment: String(commentForm.value) }, id)
        .then(data => data);

      if (!res) alert('SomethingWrong');
      else commentForm.value = '';
    }
  }

  async socialComment(parentNode, id) {
    const commentForm = document.createElement('form');
    const commentInput = document.createElement('input');
    const commentPost = document.createElement('button');

    commentForm.name = `${id}-form`;
    commentForm.id = `${id}-form`;
    commentForm.method = 'post';

    commentInput.placeholder = 'add a comment ...';
    commentInput.name = `${id}-form-input`;
    commentInput.required = true;

    commentPost.type = 'submit';
    commentPost.innerHTML = 'Post';

    parentNode.appendChild(commentForm);
    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentPost);
  }
}