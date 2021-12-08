import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { MessageService } from 'src/app/core/message.service';
import { ApiService } from 'src/app/core/api.service';

import { UserDTO } from 'src/app/core/model/userDTO';

import { Component, OnInit } from '@angular/core';
import {  
    trigger,
    state,
    style,
    animate,
    transition } from '@angular/animations';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
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
export class ChangePasswordComponent implements OnInit {
  backgroundImage = '../../assets/img/background.svg';
  submitted = false;
  user = { password: '', matchingPassword: ''};
  changePasswordForm: FormGroup;
  passwordGroup: FormGroup;
  formGroup: FormGroup;
  userId: any;
  busy: Subscription;

repass = '';
formSuccess = false;
formFeedback = '';

   constructor(
        private formBuilder: FormBuilder, 
        private apiService: ApiService, 
        private messageService: MessageService,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

  ngOnInit() {
         // subscribe to router event
     this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.userId = param[''];
        //localStorage.getItem('id');
        console.log('ngOnInit');
      });
     this.passwordGroup = this.formBuilder.group({
        //first_name:        ['', Validators.required],
        matching_password: this.formBuilder.group({
            password: ['', Validators.required],
            confirm:  ['', Validators.required]
        }, this.matchPassword)
    });

  }

matchPassword(group): any {
    const password = group.controls.password;
    const confirm = group.controls.confirm;

    // Don't kick in until user touches both fields   
    if (password.pristine || confirm.pristine) {
      return null;
    }

    // Mark group as touched so we can add invalid class easily
    group.markAsTouched();

    if (password.value === confirm.value) {
      return null;
    }

    return {
      isValid: false
    };
}

  salvaPassword(): void {
    this.submitted = true;
    const token = localStorage.getItem('token');
    this.busy = this.apiService.savePassword(this.user.password, token)
      .subscribe((account) => {
        this.submitted = false;
        this.messageService.showSuccess('Senha alerada com sucesso!', 'Acesse o Curso Spring Boot e Angular 7!');
        this.router.navigate(['/login']);
      },
      error => {
        this.submitted = false;
        this.messageService.showError('Senha invalida!', '');
      });
}

}
