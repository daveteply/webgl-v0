import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SceneManagerService } from '../../services/scene-manager.service';

@Component({
  selector: 'app-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.scss'],
})
export class MainCanvasComponent implements AfterViewInit {
  @ViewChild('mainCanvas')
  public canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private sceneManager: SceneManagerService) {}

  ngAfterViewInit(): void {
    this.sceneManager.InitRenderer(this.canvas.nativeElement);
  }
}
