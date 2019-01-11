import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertController, NavController, LoadingController, ToastController} from '@ionic/angular';
import { LocationService } from '../../services/location.service';
import { Storage } from '@ionic/storage';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  credentialsForm: FormGroup;
  checksuper: boolean;
  checkuser: boolean;
  
 
  constructor(
    private storage: Storage, 
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private navContrl: NavController, 
    public loadingController: LoadingController, 
    public locationService: LocationService,
    private toastCtrl: ToastController
  ) { }
 
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


 
  onSubmit() {
 
    this.authService.login(this.credentialsForm.value).subscribe(resp=>this.presentLoadingWithOptions());
  }
 
  registerP() {
    this.navContrl.navigateRoot('/register');
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

  presentToast(m) {
    let toast = this.toastCtrl.create({
      message: m,
      duration: 1500,
      position: 'bottom'
    });
    toast.then(res=>res.present());
  }


}