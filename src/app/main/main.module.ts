import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCanvasComponent } from './components/main-canvas/main-canvas.component';

@NgModule({
  declarations: [MainCanvasComponent],
  imports: [CommonModule],
  exports: [MainCanvasComponent],
})
export class MainModule {}
