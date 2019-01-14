import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Storage } from '@ionic/storage';
import { CrimeDetailPage } from '../crime-detail/crime-detail.page';

@Component({
  selector: 'app-verify-crime',
  templateUrl: './verify-crime.page.html',
  styleUrls: ['./verify-crime.page.scss'],
})
export class VerifyCrimePage implements OnInit {
  crimes:any;
  constructor(
    private modalCtrl:ModalController,
    private userService: UserService,
    private storage: Storage
  ) {

   }

  ngOnInit() {
    this.getCrimes();
  }
  
  closeModal()
  {
    this.modalCtrl.dismiss();
  }

  getCrimes(){
    this.storage.get("User").then(user=>{
      this.storage.get("access_token").then(tokenn => {
        this.userService.getApiUser(user.email,tokenn).subscribe(usser=>{
          this.crimes = usser[0].crimeReports;
        });
      });
    });
  }

  async goTouser(p){
      const modal = await this.modalCtrl.create({
        component: CrimeDetailPage,
        componentProps: {crime: p},
        animated:true
      });
      return await modal.present();
    }

}
