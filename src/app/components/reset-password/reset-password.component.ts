import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'src/app/core/message.service';
import { ApiService } from 'src/app/core/api.service';

import { UserDTO } from 'src/app/core/model/userDTO';

import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
    trigger,
    state,
    style,
    animate,
    transition } from '@angular/animations';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
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
export class ResetPasswordComponent implements OnInit {
  backgroundImage = '../../assets/img/background.svg';
  submitted = false;
  public  user = new UserDTO();
  public resetPasswordForm: FormGroup;
  public loadingButton = false;
  private unsubscribeMessage = new Subject();
  constructor(
        private apiService: ApiService,
        private messageService: MessageService,
        private router: Router) {
    }

  ngOnInit() {
    this.messageService.notfyObservable$.pipe(takeUntil(this.unsubscribeMessage)).subscribe(result => {
      if (result === true) {
        this.loadingButton = false;
      }
    } );
  }

  resetPassword(): void {
     this.loadingButton = true;
     this.submitted = true;
     this.apiService.resetPassword(this.user.email)
            .subscribe((account) => {
              this.submitted = false;
              this.messageService.showSuccess('Vamos enviar uma mensagem que autoriza a mudança de senha para o seu email!',
                                                  'Email enviado com sucesso!');
              this.router.navigate(['/login']);
            },
            error => {
              this.submitted = false;
              this.messageService.showError('Usuário não cadastrado!', this.user.email);
            });
    }

}
