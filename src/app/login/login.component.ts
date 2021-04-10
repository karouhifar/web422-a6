import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User = {
    _id: null,
    userName: '',
    password: '',
  };
  public warning: string;
  public loading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(f: NgForm): void {

  if (this.user.userName && this.user.password){

    this.loading = true;
    this.auth.login(this.user).subscribe((passed) => {
      this.warning = null;
      this.loading = false;
      localStorage.setItem('access_token',passed.token);
      this.router.navigate(['/newReleases']);
    },
    (err)=>{
      this.warning = err.error.message;
      this.loading = false;
    });
  }

}
}
