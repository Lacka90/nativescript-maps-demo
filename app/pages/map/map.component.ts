import { Component, OnDestroy } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { Accuracy } from "ui/enums";

import * as geolocation from "nativescript-geolocation";
import { MapView } from 'nativescript-google-maps-sdk';
import * as Toast from "nativescript-toast";

registerElement('MapView', () => MapView);

@Component({
  moduleId: module.id,
  selector: 'map',
  template: `
    <GridLayout>
      <MapView #mapView [latitude]="latitude" [longitude]="longitude"
        [zoom]="zoom" [bearing]="bearing"
        [tilt]="tilt" i-padding="50,50,50,50" [padding]="padding" (mapReady)="onMapReady($event)"></MapView>
    </GridLayout>
  `,
})
export class MapComponent implements OnDestroy {
  watchId = null;
  mapView: MapView;

  latitude =  -33.86;
  longitude = 151.20;
  zoom = 8;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];

  onMapReady(event) {
    this.mapView = event.object;

    geolocation.enableLocationRequest().then(() => {
      this.findMyLocation();
      this.mapView.myLocationEnabled = true;
      this.watchId = geolocation.watchLocation((loc) => {
        Toast.makeText(`Lat: ${loc.latitude}, Long: ${loc.longitude}`).show();
      }, (err) => {
        console.log(err);
      }, { desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 });
    });
  }

  ngOnDestroy() {
    if (this.watchId) {
      geolocation.clearWatch(this.watchId);
    }
  }

  findMyLocation() {
    geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 }).then(loc => {
      this.longitude = loc.longitude;
      this.latitude = loc.latitude;
    });
  }
}
