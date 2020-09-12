import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'displayName': new FormControl(null, [Validators.required])
    })
  }

  signUp() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const displayName = this.signupForm.value.displayName;
    this.authService.signUp(email, password, displayName)
      .then(resolve => this.router.navigate(['/chat']))
      .catch(error => {
        this.errorMsg = error.message; console.log(this.errorMsg);
      })
  }

  isInvalid(field: string) {
    switch (field) {
      case 'email':
        return this.signupForm.get('email').touched && this.signupForm.get('email').invalid;
      case 'password':
        return this.signupForm.get('password').touched && this.signupForm.get('password').invalid;
      case 'displayName':
        return this.signupForm.get('displayName').touched && this.signupForm.get('displayName').invalid;
    }
  }

}
