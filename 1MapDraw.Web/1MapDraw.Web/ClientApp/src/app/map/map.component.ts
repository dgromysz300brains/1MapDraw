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
  @ViewChild('myMap') myMap;

  map: any;
  location: any;
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
    this.path = new MapPath();

    this.initMap();

    this.path.points = [];
    this.addPoint(this.mapPoint(this.location));
  }

  move() {
    if (this.degrees.value) {
      var degrees = 0.001 * parseInt(this.degrees.value);

      this.drawLine(degrees);

      this.addPoint(this.mapPoint(this.location));
    }
  }

  save() {
    this.savePath();
  }

  initMap() {
    this.location = new Microsoft.Maps.Location(57.700668, 11.96822);
    this.map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
      credentials: 'At7beKz6qfmtyHbb-YOLiDZOr1imz2d0py41s5ktQLGwHOfoKrXw6Wx51uizCLmE',
      center: this.location,
      zoom: 15
    });

    var pushpin = new Microsoft.Maps.Pushpin(this.map.getCenter(), null);

    var layer = new Microsoft.Maps.Layer();
    layer.add(pushpin);
    this.map.layers.insert(layer);
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
        this.paths.push(this.path);
        this.path = new MapPath();
        this.addPoint(this.mapPoint(this.location));

        console.log("path saved");
      }, error => console.error(error));
    } else {
      alert('No points');
    }
  }

  addPoint(point: MapPoint) {
    this.path.points.push(point);
  }

  mapPoint(uiMapPoint: any): MapPoint {
    let mapPoint = new MapPoint();
    mapPoint.x = this.location.latitude;
    mapPoint.y = this.location.longitude;

    return mapPoint;
  }

  drawLine(degrees: number) {
    let newLocation = new Microsoft.Maps.Location(this.location.latitude, this.location.longitude + degrees);
    var polyline = new Microsoft.Maps.Polyline([this.location, newLocation], null);
    this.location = newLocation;
    this.map.entities.push(polyline);
  }
}
