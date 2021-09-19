import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, NgZone, OnInit } from '@angular/core';
import { ObjectManagerService } from './main/services/object-manager.service';

import { SceneManagerService } from './main/services/scene-manager.service';
import { MaterialManagerService } from './main/services/material-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private sceneManager: SceneManagerService,
    private objectManager: ObjectManagerService,
    private textureManager: MaterialManagerService,
    @Inject(DOCUMENT) private readonly documentRef: Document,
    private ngZone: NgZone
  ) {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {});
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event) {
      this.sceneManager.updateSize(
        event.target?.innerWidth,
        event.target?.innerHeight
      );
    }
  }

  ngOnInit(): void {
    const winWidth = this.documentRef.defaultView?.innerWidth || 1;
    const winHeight = this.documentRef.defaultView?.innerHeight || 1;

    this.sceneManager.updateSize(winWidth, winHeight);

    this.objectManager.InitShapes(this.sceneManager.scene);

    this.textureManager.OnProgress.subscribe((progress) => {
      console.log(progress);
    });

    this.sceneManager.scene.position.z = -10;
    this.sceneManager.scene.position.x = -5;

    this.animate();
  }

  private animate(): void {
    this.objectManager.UpdateShapes(this.sceneManager.scene);

    this.sceneManager.RenderScene();

    requestAnimationFrame(() => {
      this.animate();
    });
  }
}
