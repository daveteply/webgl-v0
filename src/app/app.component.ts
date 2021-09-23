import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, NgZone, OnInit } from '@angular/core';
import { ObjectManagerService } from './main/services/object-manager.service';

import { SceneManagerService } from './main/services/scene-manager.service';
import { MaterialManagerService } from './main/services/material-manager.service';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  textureLoadingProgress = 0;
  textureLoading = '';

  constructor(
    private sceneManager: SceneManagerService,
    private objectManager: ObjectManagerService,
    private materialManager: MaterialManagerService,
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

    this.sceneManager.SetCameraPos(new THREE.Vector3(10, 0, 10));

    this.materialManager.InitTextures();

    this.materialManager.OnProgress.subscribe((progress) => {
      this.textureLoading = progress.url;
      this.textureLoadingProgress = (progress.loaded / progress.total) * 100;
    });

    this.materialManager.OnLoad.subscribe(() => {
      this.animate();
    });
  }

  private animate(): void {
    this.objectManager.UpdateShapes(this.sceneManager.scene);

    this.sceneManager.RenderScene();

    requestAnimationFrame(() => {
      this.animate();
    });
  }
}
