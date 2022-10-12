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
  loading!: boolean;
  submitted = false;
  returnUrl = '';
  error = '';
  error_message = '';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private appService: AppService
  ) {}
  ngOnInit(): void {
    // this.loading = this.appService.loading;
    // this.error_message = this.appService.errorMsg;
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
    // console.log(this.loginForm.value);
    // stop here if form is invalid
    if (
      this.loginForm.invalid &&
      this.loginForm.value.url.indexOf('http') == -1
    ) {
      this.error_message = 'Invalid url';
      return;
    }
    this.loading = true;
    this.appService.url = this.loginForm.value.url;
    this.appService.user = this.loginForm.value.user;
    this.appService.token = this.loginForm.value.token;

    this.appService.getAllCommands().subscribe(
      (data: any) => {
        // console.log(data);
        this.appService.commandsList = data;
        // Set creds in local
        localStorage.setItem(
          'zimagi',
          JSON.stringify({
            url: this.appService.url,
            user: this.appService.user,
            token: this.appService.token,
          })
        );
        // console.log('go to commands');
        this.router.navigate(['/commands']);
      },
      (err) => {
        this.loading = false;

        if (err == 0 || err == 404) {
          this.error_message =
            '<strong>Please verify your credentials</strong> ';
        }
      }
    );

    // this.authService.login();
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
