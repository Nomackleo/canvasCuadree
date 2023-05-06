import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as filestack from 'filestack-js';


@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  private apikey: string = environment.filestack.apiKey;
  private client: any;
  constructor() {
    this.client = filestack.init(this.apikey);
  }

  openPicker() {
    const $filestackImg = document.querySelector(
      '.filestackImg'
    ) as HTMLElement;
    const $iconfilestackImg = document.querySelector(
      '.fa-file-image'
    ) as HTMLElement;
    const $pictureFilestack = document.querySelector('.picture') as HTMLElement;

    const options = {
      maxFiles: 1,
      fromSources: ['local_file_system', 'instagram', 'facebook'],
      accept: ['.pdf', 'image/*'],
      onUploadDone: (res: any) => {
        const imageFilestack = res.filesUploaded[0].url;
        $filestackImg.setAttribute('src', `${imageFilestack}`);
        $filestackImg.style.display = 'block';
        $iconfilestackImg.style.display = 'none';
        $pictureFilestack.style.backgroundColor = 'transparent';
      },
    };

    const picker = this.client.picker(options);
    const $fileStackButton = document.querySelector(
      '.filestack-button'
    ) as HTMLElement;
    const $fileStackButton2 = document.querySelector(
      '.filestack-button2'
    ) as HTMLElement;

    $fileStackButton.addEventListener('click', () => picker.open());
    $fileStackButton2.addEventListener('click', () => picker.open());
  }
}
