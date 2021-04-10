import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../RegisterUser';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerUser: RegisterUser = {
    userName: '',
    password: '',
    password2: '',
  };
  public warning: string;
  public success: boolean = false;
  public loading: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.registerUser = new RegisterUser();
  }
  onSubmit(f: NgForm): void {
    if (this.registerUser.userName && this.registerUser.password && this.registerUser.password2) {
      if ( this.registerUser.password === this.registerUser.password2) {
        this.loading = true;
        this.auth.register(this.registerUser).subscribe((passed) => {
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        (err)=>{
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        });
      }else {
        this.warning = "Passwords do not match";
      }
    }
    
  }
}
