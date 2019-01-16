import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LocationService } from '../../services/location.service';
import { interval, Subscription } from 'rxjs';
import { CrimesService } from '../../services/crimes.service';



declare var google;
const TOKEN_KEY = 'access_token';


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
  myVar:Boolean=false;
  token:any;
  icon:any="assets/icon/arrow-down.png";
  crimes:any=[];
  label:any=['ASSAULT', 'BATTERY', 'BURGLARY', 'HOMICIDE', 'INTIMIDATION',
  'KIDNAPPING', 'MOTOR VEHICLE THEFT', 'OBSCENITY', 'OTHER OFFENSE',
  'PUBLIC PEACE VIOLATION', 'ROBBERY', 'SEX OFFENSE', 'THEFT',
  'WEAPONS VIOLATION'];

  constructor(
    private locationService: LocationService, 
    private storage: Storage, 
    private geolocation: Geolocation, 
    private plt: Platform,
    private crimeService: CrimesService
  ) { }

  ngOnInit() {
    this.storage.get(TOKEN_KEY).then(tokenn => {
      this.token=tokenn;
    this.ionViewDidLoad(this.token);
  });
    const source = interval(60000);
    this.subscription = source.subscribe(val =>{ 
      this.ionViewDidLoad(this.token);
  });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ionViewDidLoad(token) {
    this.plt.ready().then(() => { 
      let mapOptions = {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.geolocation.getCurrentPosition().then(pos => {
        var data={"latitude":pos.coords.latitude,"longitude":pos.coords.longitude};
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(16);
        this.crimeService.predictCrime(token,data).subscribe(resp=>{
          if(resp.result){
            this.addMarker("The most probably crime type that can happen is <h4>" + resp.result.result+ "</h4>");
            this.crimes=[];
            var i=0;
            for(let t of resp.result.percentage){
              this.crimes.push({"type":this.label[i],"perc":String(t[this.label[i]])});
              i=i+1;
            }
          }
          else{
            this.addMarker(resp.error);
            this.crimes=[{"type":"Loading ...","perc":"Loading ..."}];
          }
          
        });
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

  openCrime(){
    if(this.myVar){
    this.myVar=false;
    this.icon="assets/icon/arrow-down.png";
  }
    else{
    this.myVar=true;
    this.icon="assets/icon/arrow-up.png";
    }
  }

}
