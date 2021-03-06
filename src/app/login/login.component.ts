import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '';
  error = '';
  // url = new FormControl('', Validators.required);
  // user = new FormControl('', Validators.required);
  // token = new FormControl('', Validators.required);
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private appService: AppService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      url: ['https://demo.zimagi.com:5123/', Validators.required],
      user: ['admin', Validators.required],
      token: ['uy5c8xiahf93j2pl8s00e6nb32h87dn3', Validators.required],
    });
  }

  /* Handle form errors */
  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  };

  onSubmit() {
    console.log(this.loginForm.value);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      // console.log(this.loginForm);
      return;
    }

    this.appService.url = this.loginForm.value.url;
    this.appService.user = this.loginForm.value.user;
    this.appService.token = this.loginForm.value.token;
    this.router.navigate(['/commands']);
    // this.authService.login(this.user, this.token).subscribe((data) => {
    //   console.log('Is Login Success: ' + data);

    //   if (data) this.router.navigate(['/commands']);
    // });

    // this.loading = true;
    // this.authenticationService
    //   .login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     (error) => {
    //       this.error = error;
    //       this.loading = false;
    //     }
    //   );
  }
}
