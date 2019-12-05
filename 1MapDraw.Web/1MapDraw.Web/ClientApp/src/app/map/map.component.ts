import { Component, AfterViewInit, ViewChild, Inject, Injectable } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { reserveSlots } from '@angular/core/src/render3/instructions';
import { Observable } from 'rxjs';
import { MapService } from './map.service';
import { MapPath } from './map.paths.model';
import { MapPoint } from './map.point.model';

declare var Microsoft: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements AfterViewInit {
  width = 500;
  height = 500;
  length = 20;

  @ViewChild('mapCanvas') mapCanvas;

  location: MapPoint;
  lineLength = 20;
  path: MapPath;

  paths: MapPath[];

  degrees = new FormControl(null, [
    Validators.required,
    Validators.min(0),
    Validators.max(360)
  ]);

  constructor(private mapService: MapService) {
    this.getPaths();
  }

  ngAfterViewInit() {
    this.reset();
  }

  move() {    
      var degrees = parseInt(this.degrees.value);

      this.drawLine(degrees);
  }

  save() {
    this.savePath();
  }

  getPaths() {
    this.mapService.getPaths().subscribe(result => {
      this.paths = result;
      console.log(this.paths);
    }, error => console.error(error));
  }

  savePath() {
    if (this.path.points.length > 0) {
      this.mapService.savePath(this.path).subscribe(result => {
        var path = this.path;
        this.reset();
        this.paths.push(path);

        console.log("path saved");
      }, error => console.error(error));
    } else {
      alert('No points');
    }
  }

  addPoint(point: MapPoint) {
    this.path.points.push(point);
    this.location = point;
  }

  drawLine(degrees: number) {
    var ctx = this.mapCanvas.nativeElement.getContext("2d");
    let x1 = this.location.x;
    let y1 = this.location.y;
    let r = this.length;
    let x2 = x1 + r * Math.cos(Math.PI * degrees / 180.0);
    let y2 = y1 + r * Math.sin(Math.PI * degrees / 180.0);

    if (x2 < 0 || x2 > this.width) {
      alert('x error');
      return;
    }

    if (y2 < 0 || y2 > this.height) {
      alert('y error');
      return;
    }

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    //console.log({ x1: x1, y1: y1, x2: x2, y2: y2 });

    this.addPoint({ x: x2, y: y2 });
  }

  reset() {
    this.path = new MapPath();
    this.path.points = [];
    let point: MapPoint = { x: this.width / 2, y: this.height / 2 };
    this.addPoint(point);
  }
}
