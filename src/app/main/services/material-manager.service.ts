import { EventEmitter, Injectable } from '@angular/core';
import {
  BEACH_BALL_ASSET_01,
  BILLIARD_BALL_08,
  DOUGHNUT_ASSET_01,
  DOUGHNUT_ASSET_02,
  DOUGHNUT_ASSET_03,
  EARTH_ASSET_01,
  PAPER_ASSET_01,
  PLANT_ASSET_01,
  STONE_ASSET_01,
  WOOD_ASSET_01,
} from 'src/app/constants';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';

enum AppTextures {
  STONE_01,
  WOOD_01,
  PAPER_01,
  PLANT_01,
  BEACH_BALL_01,
  EARTH_01,
  BILLIARD_BALL_08,
  DOUGHNUT_01,
  DOUGHNUT_02,
  DOUGHNUT_03,
}

export interface TextureLoadProgress {
  url: string;
  loaded: number;
  total: number;
}

export interface AppMaterial {
  texture: THREE.Texture;
  material: MeshStandardMaterial;
}

@Injectable({
  providedIn: 'root',
})
export class MaterialManagerService {
  private _loadManager: THREE.LoadingManager;
  private _loader: THREE.TextureLoader;
  private _texturesSrc = [
    STONE_ASSET_01,
    WOOD_ASSET_01,
    PAPER_ASSET_01,
    PLANT_ASSET_01,
    BEACH_BALL_ASSET_01,
    EARTH_ASSET_01,
    BILLIARD_BALL_08,
    DOUGHNUT_ASSET_01,
    DOUGHNUT_ASSET_02,
    DOUGHNUT_ASSET_03,
  ];
  private _materials: AppMaterial[] = [];

  public OnLoad: EventEmitter<boolean>;
  public OnProgress: EventEmitter<TextureLoadProgress>;

  constructor() {
    this.OnLoad = new EventEmitter<boolean>();
    this.OnProgress = new EventEmitter<TextureLoadProgress>();

    this._loadManager = new THREE.LoadingManager(
      () => {
        this.OnLoad.emit(true);
      },
      (url: string, loaded: number, total: number) => {
        this.OnProgress.emit({ url, loaded, total });
      }
    );
    this._loader = new THREE.TextureLoader(this._loadManager);
  }

  public InitTextures(): void {
    this._texturesSrc.forEach((textureSrc) => {
      const texture = this._loader.load(textureSrc);
      this._materials.push({
        texture: texture,
        material: new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.4,
          transparent: true,
        }),
      });
    });
  }

  public RandomSphereTexture(): AppMaterial {
    switch (THREE.MathUtils.randInt(0, 2)) {
      case 0:
        return this._materials[AppTextures.BEACH_BALL_01];
      case 1:
        return this._materials[AppTextures.EARTH_01];
      default:
        return this._materials[AppTextures.BILLIARD_BALL_08];
    }
  }

  public RandomTexture(): AppMaterial {
    switch (THREE.MathUtils.randInt(0, 3)) {
      case 0:
        return this._materials[AppTextures.STONE_01];
      case 1:
        return this._materials[AppTextures.WOOD_01];
      case 2:
        return this._materials[AppTextures.PLANT_01];
      default:
        return this._materials[AppTextures.PAPER_01];
    }
  }

  public RandomDoughnut(): AppMaterial {
    switch (THREE.MathUtils.randInt(0, 3)) {
      case 0:
        return this._materials[AppTextures.DOUGHNUT_02];
      case 1:
        return this._materials[AppTextures.DOUGHNUT_03];
      case 2:
        return this._materials[AppTextures.BILLIARD_BALL_08];
      default:
        return this._materials[AppTextures.DOUGHNUT_01];
    }
  }
}
