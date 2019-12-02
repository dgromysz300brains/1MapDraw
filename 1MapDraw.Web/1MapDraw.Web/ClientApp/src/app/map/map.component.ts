import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent  {
  @ViewChild('myMap') myMap;

  map: any;
  location: any;
  path: MapPath;

  degrees = new FormControl(null, [
    Validators.required,
    Validators.min(0),
    Validators.max(360)
  ]);

  ngAfterViewInit() {
    this.path = new MapPath();
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

    this.path.points = [];
    this.path.points.push({ x: this.location.latitude, y: this.location.longitude });
  }

  move() {
    if (this.degrees.value) {
      var degrees = 0.001 * parseInt(this.degrees.value);

      let newLocation = new Microsoft.Maps.Location(this.location.latitude, this.location.longitude + degrees);
      var polyline = new Microsoft.Maps.Polyline([this.location, newLocation], null);
      this.location = newLocation;
      this.map.entities.push(polyline);

      this.path.points.push({ x: this.location.latitude, y: this.location.longitude });
    }
  }

  save() {
    console.log("save");
    console.log(this.path);
  }
}

class MapPoint {
  x: number;
  y: number;
}

class MapPath {
  points: MapPoint[];
}
