import { isLogin } from "../service/auth.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();

    this.setTitle('Montage');
  }

  async getHtml() {
    return await isLogin().then(async res => {
      if (res) {
        return `
          <h1>Montage</h1>

          <hr>

          <div class="camera-container">
            <video id="open-camera" autoplay playsinline></video>
            <button id="button-snap" class="material-icons"">photo_camera</button>
            <div>
              <ul id="image-collect">
              </ul>
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

    const imageInfo = {
      width: openCamera.videoWidth,
      height: openCamera.videoHeight,
      imageIdx: 0
    };
  
    await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    .then(stream => {
      openCamera.srcObject = stream;

      snapBtn.onclick = () => {
        this.createNewThumbnails(openCamera, imageInfo);
      }
    })
    .catch(err => {
      alert('Your browser don\'t support camera!');
    });
  }

  createNewThumbnails(src, imageInfo) {
    const imageCollect = document.getElementById('image-collect');
    const imageList = document.createElement('li');
    const imageCanvas = document.createElement('canvas');

    imageList.id = `image-${imageInfo.imageIdx++}`;

    imageCollect.appendChild(imageList);
    imageList.appendChild(imageCanvas);

    imageCanvas.width = imageInfo.videoWidth;
    imageCanvas.height = imageInfo.videoHeight;
    imageCanvas.getContext('2d').drawImage(src, 0, 0);

    console.log('id:', imageList.id);
  }
}