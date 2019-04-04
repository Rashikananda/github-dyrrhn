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
  cityCircle;
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
        center: { lat: 20.2961, lng: 85.8245 },
        zoom: 12,
        disableDefaultUI: true
      });

    this.clickListener = this.map.addListener('click', (event) => {
      this.addMarker(event.latLng);
    });
     this.cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      center: { lat: 20.2961, lng: 85.8245 },
      radius: 500,
      editable:true,
       draggable: true,
  geodesic: true
    });
    this.cityCircle.setMap(this.map);
    this.map.addListener(this.cityCircle, 'radius_changed', (event) => {
      console.log(event);
    });
    });
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

