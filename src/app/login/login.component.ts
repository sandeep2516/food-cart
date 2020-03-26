import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/UserService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private fb: FormBuilder, private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  loginUser() {
    this.userService.loginUser(this.form.value).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      this.router.navigate(['/dashboard']);
    }, (error) => {
      console.log(error);
    })
  }

}
