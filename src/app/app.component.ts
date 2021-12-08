import { ApiService } from 'src/app/core/api.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'sba7-app';
  isLoggin: Observable<boolean>;

  constructor( private apiService: ApiService) {
    
  }

  isAutenticated(): Observable<boolean> {
    return this.apiService.isAuthenticated();
  }
}
