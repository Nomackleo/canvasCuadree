import { Component, ViewChild, inject } from '@angular/core';
import { CanvasDisplayService } from 'src/app/core/services/features/canvas-display.service';
import { ColorFrameService } from 'src/app/core/services/features/color-frame.service';
import { PriceService } from 'src/app/core/services/features/price.service';
import { SliderService } from 'src/app/core/services/features/slider.service';
import { UploadImageService } from 'src/app/core/services/features/upload-image.service';
import { WallService } from 'src/app/core/services/features/wall.service';
import { ColorFrame } from 'src/app/models/color';
import { Wall } from 'src/app/models/wall';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent {
  private wallService = inject(WallService);
  private sliderService = inject(SliderService);
  private frameDisplayService = inject(CanvasDisplayService);
  private colorFrameService = inject(ColorFrameService);
  private uploadImageService = inject(UploadImageService);
  private priceService = inject(PriceService);
  // private modalService = inject (NgbModal)

  public walls: Wall[] = [];
  public colorFrames: ColorFrame[] = [];

  // @ViewChild('modal', { static: false }) modalTemplate!: TemplateRef<any>;
  // private modalRef!: NgbModalRef;

  constructor() {}

  ngOnInit(): void {
    this.walls = this.wallService.walls;
    console.log(this.walls);

    this.colorFrames = this.colorFrameService.colorFrames;
    this.simulatorFrame();
  }

  simulatorFrame() {
    this.wallService.wallTextures();
    this.sliderService.controlSlider();
    this.frameDisplayService.changeSizeFrame();
    this.colorFrameService.changeColorFrame();
    this.priceService.price();
  }

  openPicker() {
    this.uploadImageService.openPicker();
  }

  openModal() {
    // this.modalService.open(this.modalTemplate);
  }
}
