import { Component, Inject, ElementRef, ViewChild, OnInit } from '@angular/core';
import GoogleMapsLoader from 'google-maps';
declare const google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentLat;
  currentLong;
    constructor() {
    GoogleMapsLoader.KEY = 'AIzaSyBAyMH-A99yD5fHQPz7uzqk8glNJYGEqus';
  }

  @ViewChild('mapDiv') mapDiv: ElementRef;
  public map: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private clickListener: google.maps.MapsEventListener;

  initMap() {

    GoogleMapsLoader.load(g => {
      this.map = new google.maps.Map(this.mapDiv.nativeElement, {
        center: { lat: 51.921, lng: -10.037 },
        zoom: 8,
        disableDefaultUI: true
      });

    this.clickListener = this.map.addListener('click', (event) => {
      this.addMarker(event.latLng);
    });
    });
    this.trackMe();
  }

  showPosition(position) {
    console.log(position);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.markers) {
      this.markers = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      // this.markers.setPosition(location);
    }
  }
  trackMe() {
    if (navigator.geolocation) {
      // this.isTracking = true;
      console.log("track")
      navigator.geolocation.watchPosition((position) => {
      console.log("")
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  private addMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    this.markers.push(marker);
    
  }


  ngOnInit() {
    this.initMap();
  }
}

