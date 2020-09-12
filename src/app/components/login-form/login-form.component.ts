import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  errorMsg: string;
  loginForm: FormGroup

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }

  login() {    
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .catch(error => this.errorMsg = error.message);
  }

  isInvalid(field: string) {
    switch (field) {
      case 'email':
        return this.loginForm.get('email').touched && this.loginForm.get('email').invalid;
      case 'password':
        return this.loginForm.get('password').touched && this.loginForm.get('password').invalid;
    }
  }
}