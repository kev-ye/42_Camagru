import { haveAccess } from "../service/auth.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle('Montage');
  }

  async getHtml() {
    return await haveAccess().then(async res => {
      if (res) {
        return `
          <h1>Montage</h1>

          <hr>

          <div class="camera-container">
            <div>
              <video id="open-camera" class="open-camera" autoplay playsinline></video>
            </div>
            <div>
              <button id="button-snap" class="material-icons"">photo_camera</button>
            </div>
            <div>
              <ul id="image-collect" class="image-collect-container"></ul>
            </div>
          </div>
        `;
      }
      else return '';
    })
  }

  async openCamera() {
    const openCamera = document.getElementById('open-camera');
    const snapBtn = document.getElementById('button-snap');
  
    await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    .then(stream => {
      openCamera.srcObject = stream;
      openCamera.addEventListener('loadedmetadata', async () => {
        const imageInfo = {
          width: openCamera.videoWidth,
          height: openCamera.videoHeight,
          imageIdx: 0
        };

        snapBtn.onclick = () => {
          this.createNewThumbnails(openCamera, imageInfo);
        }
      });
    })
    .catch(err => {
      alert('Your browser don\'t support camera!');
    });
  }

  createNewThumbnails(src, imageInfo) {
    const imageCollect = document.getElementById('image-collect');

    if (Array.from(imageCollect.childNodes).length >= 9) {
      alert('You can only take 9 photos on same time!');
      return ;
    }

    const imageList = document.createElement('li');
    const imageCanvas = document.createElement('canvas');
    const imageDelete = document.createElement('span');

    imageList.id = `image-${imageInfo.imageIdx}`;
    imageList.classList.add('image-collect-thumbnail-container');

    imageCanvas.classList.add('image-collect-thumbnail');

    imageDelete.id = `image-delete-${imageInfo.imageIdx}`;
    imageDelete.classList.add('image-delete', 'material-icons');

    imageDelete.innerHTML = 'close';

    imageCollect.appendChild(imageList);
    imageList.appendChild(imageDelete);
    imageList.appendChild(imageCanvas);

    imageCanvas.width = imageInfo.width;
    imageCanvas.height = imageInfo.height;
    imageCanvas.getContext('2d').drawImage(src, 0, 0);

    imageDelete.onclick = () => {
      imageCollect.removeChild(imageList);
    }

    imageInfo.imageIdx++;

    // console.log(imageCanvas.toDataURL('image/jpeg', 1.0));
  }

  async uploadThumbnails() {
    const imageCollect = document.getElementById('image-collect');

    // need create a request in back,
    // user readSyncFile to create a image file by dataUrl
  }
}