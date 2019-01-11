import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import { DatePipe, formatDate } from '@angular/common'
import { Subscription,interval } from 'rxjs';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {

  city:any='';
  lastUp:any='';
  description:any='Loading ...'
  sunSet:any='';
  sunRise:any='';
  icon:any='';
  temp:any="Loading ...";
  humidity:any="Loading ...";
  subscription: Subscription;

  constructor(
    private locationService:LocationService,
    private weatherService: WeatherService,
  ) { }

  ngOnInit() {
    this.getWeather();
    const source = interval(10000);
    this.subscription = source.subscribe(val => {
      this.getWeather();
    });
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

}
