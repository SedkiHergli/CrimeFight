import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Storage } from '@ionic/storage';
import { interval, Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { LocationService } from '../../services/location.service';
import { DatePipe, formatDate } from '@angular/common'
import { ModalController, NavController, AlertController, ToastController } from '@ionic/angular';
import {AddCrimePage} from '../add-crime/add-crime.page'
import { VerifyCrimePage } from '../verify-crime/verify-crime.page';



const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';



@Component({
  selector: 'app-accountu',
  templateUrl: './accountu.page.html',
  styleUrls: ['./accountu.page.scss'],
})
export class AccountuPage implements OnInit {
  user:any;
  token:any;
  temp:any="Loading ...";
  humidity:any="Loading ...";
  subscription: Subscription;
  subscriptionn: Subscription;
  city:any='';
  lastUp:any='';
  description:any='Loading ...'
  sunSet:any='';
  sunRise:any='';
  icon:any='';


  constructor(
    private alertController: AlertController, 
    private navContrl: NavController,
    private locationService: LocationService, 
    private weatherService:WeatherService, 
    private authService: AuthService, 
    private storage:Storage,
    private toastCtrl: ToastController,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.storage.get(REFRESH_TOKEN_KEY).then(tokeni => {
      this.storage.get(TOKEN_KEY).then(tokenn => {
      this.authService.updateToken("auth",tokeni,tokenn).subscribe(resp=>{
        this.storage.set(TOKEN_KEY,resp["access_token"]);
      });
    });});
    this.getWeather();
    const sourcee = interval(3599000);
    this.subscriptionn = sourcee.subscribe(val => {
      this.storage.get(REFRESH_TOKEN_KEY).then(tokeni => {
        this.storage.get(TOKEN_KEY).then(tokenn => {
        this.authService.updateToken("auth",tokeni,tokenn).subscribe(resp=>{
          this.storage.set(TOKEN_KEY,resp["access_token"]);
        });
      });});      
      });
    if(!this.token){
      this.storage.get("access_token").then(tokenn => {
        this.token=tokenn;
        if(!this.user){
          this.storage.get("User").then(userr => {
            this.user=userr;
            const source = interval(10000);
            this.subscription = source.subscribe(val => {
              this.getWeather();
            });
          });}      
    });}  
    
 
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getWeather(){
    this.locationService.getLocation().then(loc=>{
      this.weatherService.getWeather(loc).subscribe(resp=>{
        this.city ='You are at ' + resp.name + ', ' + resp.sys.country;
        this.description = resp.weather[0].description;
        this.icon ='http://openweathermap.org/img/w/'+resp.weather[0].icon+'.png';
        this.humidity = 'Humidity: ' + resp.main.humidity + ' %';
        this.temp = 'Temperature: ' + resp.main.temp + ' °C';
        var datePipe = new DatePipe("en-US");
        this.sunRise = 'Sunrise: ' + String(datePipe.transform((resp.sys.sunrise*1000),"hh:mm a"));
        this.sunSet = 'Sunset: ' + String(datePipe.transform((resp.sys.sunset*1000),"hh:mm a"));
        var today= new Date();
        this.lastUp='Last Updated: '+String(formatDate(today, 'dd-MM-yyyy hh:mm a', 'en-US'));
      });
    });
  
  }

  openWeather(){
    this.navContrl.navigateRoot('/tabs/(weather:weather)');
  }


  logout() {
    this.authService.logout();
  }

presentToast(m) {
  let toast = this.toastCtrl.create({
    message: m,
    duration: 1500,
    position: 'bottom'
  });
  toast.then(res=>res.present());
}

async openAddCrime() {
  const modal = await this.modalController.create({
    component: AddCrimePage,
    componentProps: { value: 123 },
    animated:true
  });
  return await modal.present();
}

async openVerify() {
  const modal = await this.modalController.create({
    component: VerifyCrimePage,
    componentProps: { value: 123 },
    animated:true
  });
  return await modal.present();
}

}
