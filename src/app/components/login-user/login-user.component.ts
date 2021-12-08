import { Role } from './../../core/model/role';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserLogin } from 'src/app/core/model/login';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserDTO } from 'src/app/core/model/userDTO';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit, OnDestroy {
  backgroundImage = '../../assets/img/background.svg';
  user = new UserLogin();
  submitted = false;
  private unsubscribeMessage = new Subject(); 

  userDTO = new UserDTO();
  userRoles: Array<Role> = [];
  role = new Role();
    /***TESTE DE SELECT */
    roles = ['ADM', 'USER', 'GUEST'];

  constructor(private apiService: ApiService, 
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.notfyObservable$.pipe(takeUntil(this.unsubscribeMessage)).subscribe(result => {
      if (result === true) {
        this.submitted = false;
      }
    } );
  }


  roleChanged(event) {
    this.role.name =  event;
    this.userRoles.push(this.role);
    this.userDTO.roles =  this.userRoles;
    console.log('Roles ' + JSON.stringify(this.userDTO));
  }



  public login() {
    localStorage.clear();
    this.submitted = true;
    this.apiService.login(this.user).subscribe(data => {
      console.log('Login sucesso...........................................')
      this.loginSuccess(data);
      console.log(data);
    }, error => {
      this.messageService.showError('Login', 'Falha de autenticação');
    });
  }

  public loginSuccess(data: any) {
    localStorage.clear();
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    this.apiService.getMainUser(localStorage.getItem('accessToken')).subscribe(user => {
      this.redirectPage(user);
      this.messageService.showSuccess('Bem Vindo ao Curso', 'Curso de Spring Boot e Angular 7');
    }, error => {
      this.messageService.showError('Usuário principal', 'Falha ao carregar usuário principal');
    });
  }

  public  redirectPage(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['welcome']);
  }
  ngOnDestroy() {
    this.unsubscribeMessage.next();
    this.unsubscribeMessage.complete();
  }
}
