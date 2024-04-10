import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.authService.signup(this.signUpForm.value).subscribe({
        next: (result) => {
          (alert(result.message));
          this.signUpForm.reset();
          this.router.navigate(['home']);
        },
        error: (error) => { alert(error?.error.message) }
      })
    }
    else {
      ValidateForm.validationAllFormFields(this.signUpForm)
      console.log('Form is not valid!');
    }
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
