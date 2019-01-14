import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LocationService } from '../../services/location.service';
import { interval, Subscription } from 'rxjs';



declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public distanceView="Loading ...";
  subscription: Subscription;

  constructor(
    private locationService: LocationService, 
    private storage: Storage, 
    private geolocation: Geolocation, 
    private plt: Platform
  ) { }

  ngOnInit() {
    this.ionViewDidLoad();
    const source = interval(60000);
    this.subscription = source.subscribe(val =>{ 
      this.ionViewDidLoad();
  });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ionViewDidLoad() {
    this.plt.ready().then(() => { 
      let mapOptions = {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.addMarker(latLng);
        this.map.setZoom(16);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }

  addMarker(message){

    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    let content = "<h5>"+ message + "</h5>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });

  }

}
