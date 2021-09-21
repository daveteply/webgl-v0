import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Scene } from 'three';
import { ObjMesh } from '../models/obj-mesh';
import { MaterialManagerService } from './material-manager.service';

@Injectable({
  providedIn: 'root',
})
export class ObjectManagerService {
  private _meshes: ObjMesh[] = [];

  private _time = 0;
  private _maxShapes = 20;

  constructor(private materialManager: MaterialManagerService) {}

  public InitShapes(scene: Scene): void {
    this.materialManager.InitTextures();
    this.materialManager.OnLoad.subscribe(() => {
      this.addShape(scene);
    });
  }

  public UpdateShapes(scene: Scene): void {
    this._time += 1;

    for (let i = 0; i < this._meshes.length; i++) {
      this._meshes[i]?.updateProjectile();
    }

    if ((this._time % this._maxShapes) / 2 === 0) {
      this.addShape(scene);
      this.cleanUpShapes(scene);
    }
  }

  private addShape(scene: Scene): void {
    if (this._meshes.length < this._maxShapes) {
      let shape!: ObjMesh;

      switch (THREE.MathUtils.randInt(0, 5)) {
        case 0:
          shape = new ObjMesh(
            new THREE.CylinderGeometry(
              THREE.MathUtils.randFloat(0.5, 1),
              THREE.MathUtils.randFloat(0.5, 1),
              THREE.MathUtils.randFloat(1, 1.5),
              24
            ),
            this.materialManager.RandomTexture()
          );
          break;

        case 1:
          shape = new ObjMesh(
            new THREE.SphereGeometry(THREE.MathUtils.randFloat(0.5, 1)),
            this.materialManager.RandomSphereTexture()
          );
          break;

        case 2:
          shape = new ObjMesh(
            new THREE.TorusGeometry(
              THREE.MathUtils.randFloat(0.75, 1.0),
              THREE.MathUtils.randFloat(0.3, 0.5),
              24,
              24
            ),
            this.materialManager.RandomDoughnut()
          );
          break;

        default:
          shape = new ObjMesh(
            new THREE.BoxGeometry(
              THREE.MathUtils.randFloat(0.75, 1),
              THREE.MathUtils.randFloat(0.75, 1),
              THREE.MathUtils.randFloat(0.75, 1)
            ),
            this.materialManager.RandomTexture()
          );
      }
      this._meshes.push(shape);
      scene.add(shape.mesh);
    }
  }

  private cleanUpShapes(scene: Scene): void {
    while (this._meshes[0].expired) {
      this._meshes[0].dispose();
      scene.remove(this._meshes[0].mesh);
      this._meshes.shift();
    }
  }
}
