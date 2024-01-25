import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  url = "http://localhost:8000/"
  data: any
  onSubmit() {
    this.data = this.loginForm.value
    this.http.post(this.url + "loginUser", this.data).subscribe({
      next(res) {
        console.log(res)
      },
      error(err) {
        console.log(err)
      }
    })
  }
}
