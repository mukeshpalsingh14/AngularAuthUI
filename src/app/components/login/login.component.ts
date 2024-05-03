import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private toast: NgToastService) {
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value + "login sumbit");
      this.authService.Login(this.loginForm.value).subscribe({
        next: (result) => {
          // alert(result.message)
          this.toast.success({ detail: "Success", summary: result.message });
          this.authService.stroeToken(result.token);
          this.router.navigate(['dashboard']);
        },
        error: (error) => { this.toast.error({ detail: 'Error', summary: error.error.message }) }
      });
    }
    else {
      ValidateForm.validationAllFormFields(this.loginForm)
      console.log('Form is not valid!');
    }
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  // private validationAllFormFields(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach(field => {
  //     const control = formGroup.get(field);
  //     if (control instanceof FormControl) {
  //       control.markAsDirty({ onlySelf: true });

  //     }
  //     else if (control instanceof FormGroup) {
  //       this.validationAllFormFields(control);
  //     }
  //   })
  // }
}
