import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/core/model/userDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  backgroundImage = '../../assets/img/background.svg';
  public user = new UserDTO();

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

}
