import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { UserDTO } from 'src/app/core/model/userDTO';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-resend-registration-token',
  templateUrl: './resend-registration-token.component.html',
  styleUrls: ['./resend-registration-token.component.scss']
})
export class ResendRegistrationTokenComponent implements OnInit {
  backgroundImage = '../../assets/img/background.svg';
  user = new UserDTO();
  submitted = false;

  constructor(private apiService: ApiService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit() {
  }
  resendToken() {
    this.submitted = true;
    this.apiService.resendRegisterToken(this.user).subscribe(data => {
      this.submitted = false;
      this.messageService.showSuccess('Token de verificação', 'Novo token enviado com sucesso');
      this.router.navigate(['login']);
    }, error => {
      this.submitted = false;
      this.messageService.showError('Falha de Solicitação de Token', 'Falha ao enviar o novo token');
    });
  }
}
