import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { LocationService } from '../../services/location.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentialsForm: FormGroup;
  checkfemale: boolean;
  checkmale: boolean;
  sexe: string;


  constructor(private storage: Storage, public locationService: LocationService, public loadingController: LoadingController, private formBuilder: FormBuilder, private authService: AuthService, public alertController: AlertController, private navContrl: NavController) { 

  }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loginP() {
    this.navContrl.navigateRoot('/login');
  }

  register() {

    this.presentLoadingWithOptions();
    if(this.checkmale){
      this.sexe="Male";
    }else{this.sexe="Male";}
    var request = {
    "fullName": this.credentialsForm.value.fullName,
    "email": this.credentialsForm.value.email,
    "password": this.credentialsForm.value.password,
    "phone":this.credentialsForm.value.phone,
    "sexe":this.sexe,
    "stype":"User",
    };

    

   this.authService.register(request).subscribe(res => {
      this.authService.login(this.credentialsForm.value).subscribe();
    });
  }

  updateCheckmale(val){
    if(val.detail.checked && !this.checkmale){
      this.checkfemale=false;
      this.checkmale=true;
    }
  }

  updateCheckfemale(val){
    if(val.detail.checked && !this.checkfemale){
      this.checkmale=false;
      this.checkfemale=true;
    }
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      duration: 1000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

 


}
