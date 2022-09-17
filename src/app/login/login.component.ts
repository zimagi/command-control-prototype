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
  error_message = '';
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
      url: ['', Validators.required],
      user: ['', Validators.required],
      token: ['', Validators.required],
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
    this.loading = true;
    this.appService.url = this.loginForm.value.url;
    this.appService.user = this.loginForm.value.user;
    this.appService.token = this.loginForm.value.token;

    this.appService.getAllCommands().subscribe(
      (data: any) => {
        // console.log(data.status);
        this.appService.commandsList = data;
        this.router.navigate(['/commands']);
      },
      (err) => {
        if (err == 0) {
          this.loading = false;
          this.error_message =
            '<strong>API Server is not responding.</strong> <br>Please contact your system administrator.';
        }
        // if (err == 0){

        // }
        // this.error_message = <any>err;

        // console.log('//////////////');
        // console.log(err);
        // console.log('//////////////');
      }
    );

    //this.router.navigate(['/commands']);
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
