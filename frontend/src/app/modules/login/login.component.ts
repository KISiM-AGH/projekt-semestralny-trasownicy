import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../core/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin = false;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      // email: this.loginForm.controls.username.value,
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };

    this.apiService.login(loginPayload).subscribe(data => {
        if (data.token != null) {
          window.localStorage.setItem('token', data.token);
          window.localStorage.setItem('currentUser', data.user.id);
          window.localStorage.setItem('currentUserName', data.user.name);
          window.localStorage.setItem('currentUserRole', data.user.role);
          if (data.user.role === 'admin') {
            this.router.navigate(['factory1']);
          }
        }},
      error => {
        this.invalidLogin = true;
        alert('Wrong login or password');
      });
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }
}

