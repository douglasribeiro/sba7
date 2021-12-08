import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from 'src/app/core/message.service';
import { ApiService } from 'src/app/core/api.service';

import { UserDTO } from 'src/app/core/model/userDTO';

import {
    trigger,
    state,
    style,
    animate,
    transition } from '@angular/animations';

@Component({
  selector: 'app-change-password',
  template: '<div>Loading...</div>',
  styleUrls: ['./change-password.component.scss'],
  animations: [
    trigger('flyInOut', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
        style({
        opacity: 0,
        transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
    ]),
    transition('* => void', [
        animate('0.2s 0.1s ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
        }))
    ])
    ])
  ]
})
export class ChechIdUserTokenComponent implements OnInit {

  private  user = new UserDTO();
  changePasswordForm: FormGroup;

   constructor(
        private apiService: ApiService,
        private messageService: MessageService,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

  ngOnInit() {
      console.log('teste')
      // subscribe to router event
      this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        const id = param.id;
        const token = param.token;
        localStorage.setItem('token', token);
       
        //Verifica se o token ainda é valido
        this.apiService.changePassword(id, token)
            .subscribe((account) => {
                this.router.navigate(['/save-password/', id]);
            },
            error => {
                this.messageService.showError('Solicite novamete a redefinição de senha!', 'O token expirou! ');
                this.router.navigate(['/login']);
            });
      });
  }
}
