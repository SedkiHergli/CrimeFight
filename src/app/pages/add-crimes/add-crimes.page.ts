import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CrimesService } from '../../services/crimes.service';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
@Component({
  selector: 'app-add-crimes',
  templateUrl: './add-crimes.page.html',
  styleUrls: ['./add-crimes.page.scss'],
})
export class AddCrimesPage implements OnInit {
  typecs = ['ARSON', 'ASSAULT', 'BATTERY','BURGLARY', 'CRIMINAL DAMAGE', 'CRIM SEXUAL ASSAULT'
,'DOMESTIC VIOLENCE', 'GAMBLING', 'HOMICIDE','HUMAN TRAFFICKING', 'INTERFERENCE WITH PUBLIC OFFICER',
 'INTIMIDATION','KIDNAPPING','LIQUOR LAW VIOLATION','NARCOTICS','OBSCENITY','OFFENSE INVOLVING CHILDREN','OTHER OFFENSE'
 ,'STALKING','THEFT','WEAPONS VIOLATION'];
  typec = 'ARSON';
  myDate:any;
  credentialsForm: FormGroup;
  data:any;

  constructor(
    private modalCtrl:ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder, 
    private storage: Storage,
    private crimesService: CrimesService,
    private navCtrl: NavController,
    private toastCtrl:ToastController
  ) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      ldescription: ['', [Validators.required]],
      myDate: ['', [Validators.required]],
         });
    this.data=this.navParams.get('data');
  }
  
  closeModal()
  {
    this.modalCtrl.dismiss();    
  }

  addCrime(){
    this.data["description"]=this.credentialsForm.value.description;
    this.data["locationDescription"]=this.credentialsForm.value.ldescription;
    this.data["date"]=this.credentialsForm.value.myDate;
    this.data["type"]=this.typec;
    this.data["arrest"]=false;
      this.storage.get(TOKEN_KEY).then(tokenn => {
        this.storage.get("User").then(user=>{
        this.crimesService.updateCrime(this.data,user.email,tokenn).subscribe(resp=>{
          this.presentToast("Choose crime location !!");
          this.closeModal();
        });
    }).catch(err=>{console.log(err);});
  }).catch(err=>{console.log(err);});
  }

  presentToast(m) {
    let toast = this.toastCtrl.create({
      message: m,
      duration: 1500,
      position: 'middle'
    });
    toast.then(res=>res.present());
  }


}
