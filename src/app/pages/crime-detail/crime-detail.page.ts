import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, Platform, ModalController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-crime-detail',
  templateUrl: './crime-detail.page.html',
  styleUrls: ['./crime-detail.page.scss'],
})
export class CrimeDetailPage implements OnInit {
  p:any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(
    private navParam: NavParams,
    private plt: Platform,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.p = this.navParam.get('crime');
    this.ionViewDidLoad(this.p);
    }

  ionViewDidLoad(p) {
    this.plt.ready().then(() => { 
      let mapOptions = {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        let latLng = new google.maps.LatLng(Number(p.lat), Number(p.lng));
        this.map.setCenter(latLng);
        this.addMarker(p.locationDescription);
        this.map.setZoom(16);
    });
  }

  addMarker(message){

    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    let content = "<h6>"+ message + "</h6>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });

  }

  closeModal()
  {
    this.modalCtrl.dismiss();    
  }

} 
