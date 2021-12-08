import { Component, OnInit } from '@angular/core';

2
3
 
import { Location } from '@angular/common';
@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component  {

  constructor(private location: Location) { 
  }

  goBack() {
    this.location.back();
  }

}
