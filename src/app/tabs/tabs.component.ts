import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  
  tab2Selected() {
    console.log('My tab was selected!');
  }

  logout() {
    this.authService.logout();
  }

}
