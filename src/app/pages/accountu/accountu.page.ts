import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Storage } from '@ionic/storage';
import { interval, Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { LocationService } from '../../services/location.service';
import { DatePipe, formatDate } from '@angular/common'
import { NavController, AlertController, ToastController } from '@ionic/angular';


declare var google;
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
  ) { }

  ngOnInit() {
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

            });
          });}      
    });}  
    

  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
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

}
