import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout()
      .then(() => {
        this._router.navigate(['/login'])
      });
  }

}
