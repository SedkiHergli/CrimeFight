import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user:any;
  token:any;
  datan:any={};

  constructor(
    private toastCtrl: ToastController, 
    private authService: AuthService,
    public alertController: AlertController, 
    public storage:Storage,
    private userService:UserService,
    private locationService:LocationService,
    private navcrtl: NavController
  ) { }

  ngOnInit() {
    this.storage.get("User").then(userr => {this.user=userr;});
    this.storage.get("access_token").then(tokenn => {this.token=tokenn;});
  }


  async ChangeAccountU() {
    const alert = await this.alertController.create({
      header: 'Modify User',
      inputs: [
        {
          name: 'fullName',
          type: 'text',
          placeholder: this.user.fullName
        },
        {
          name: 'email',
          type: 'email',
          placeholder: this.user.email
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: this.user.phone
        }
      ],
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'SAVE',
          handler: (data) => {
            for (let item of Object.keys(data)) {
              if(!data[item]){
                this.datan[item]=this.user[item];
              }
              else{
                this.datan[item]=data[item];
              }
            
          }   
          var datta ={};
          datta["name_u"]=this.datan.fullName;
          datta["email_u"]=this.datan.email;
          datta["phone_u"]=this.datan.phone;
          this.userService.updateUser(this.datan,this.user.email,this.token).subscribe((res)=>{
                    this.logout();  
          });   
          }
        }
      ]
    });

    await alert.present();
  }

  async ChangePasswordU() {
    const alert = await this.alertController.create({
      header: 'Modify Password',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },
        {
          name: 'cpassword',
          type: 'password',
          placeholder: 'Confirm password'
        }
      ],
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'SAVE',
          handler: (data) => {
              if(!data["password"] || data["cpassword"]!=data["password"] || data["password"].length < 6  ){
                this.showAlert("Enter password again !!");
            }
            else{  
              this.userService.updateUser(data,this.user.email,this.token).subscribe((res)=>this.logout());   
            }
            
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.authService.logout();
    this.navcrtl.navigateRoot('/login');
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
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
