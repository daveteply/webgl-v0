import * as THREE from 'three';
import { BufferGeometry, Mesh, MeshStandardMaterial } from 'three';
import { AppMaterial } from '../services/material-manager.service';

export class ObjMesh {
  private _mesh!: Mesh;
  private _geometry!: BufferGeometry;
  private _material!: MeshStandardMaterial;

  private _velocity!: number;
  private _theta!: number;

  private _time!: number;
  private _ttl!: number;

  private _tumble!: THREE.Vector3;

  constructor(geometry: BufferGeometry, appMaterial: AppMaterial) {
    this._geometry = geometry;
    this._material = appMaterial.material.clone();

    this._mesh = new THREE.Mesh(this._geometry, this._material);

    this._velocity = THREE.MathUtils.randFloat(3, 4);
    this._theta = THREE.MathUtils.degToRad(THREE.MathUtils.randInt(35, 55));

    this._time = 0;
    this._ttl = THREE.MathUtils.randFloat(300, 400);

    this._tumble = new THREE.Vector3(
      THREE.MathUtils.randFloat(-0.05, 0.05),
      THREE.MathUtils.randFloat(-0.05, 0.05),
      THREE.MathUtils.randFloat(-0.05, 0.05)
    );
  }

  public get mesh(): Mesh {
    return this._mesh;
  }

  public get expired(): boolean {
    return this._time > this._ttl;
  }

  public updateProjectile(): void {
    this._time += 1;
    const interval = this._time * 0.05;
    this._mesh.position.x = Math.cos(this._theta) * interval;
    this._mesh.position.y =
      this._velocity * Math.sin(this._theta) * interval -
      0.2 * Math.pow(interval, 2);
    this._mesh.rotateX(this._tumble.x);
    this._mesh.rotateY(this._tumble.y);
    this._mesh.rotateZ(this._tumble.x);

    if (this._time / this._ttl > 0.75) {
      this._material.opacity -= 0.09;
    }
  }

  public dispose(): void {
    this._geometry.dispose();
    this._material.dispose();
  }
}
