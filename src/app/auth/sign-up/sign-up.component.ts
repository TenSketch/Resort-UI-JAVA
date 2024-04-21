// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from '@angular/material/dialog';
// import { TermsModalComponentComponent } from 'src/app/modules/terms-modal-component/terms-modal-component.component';

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.scss'],
// })
// export class SignUpComponent implements OnInit {
//   form: FormGroup;
//   password_hide = true;
//   repeate_password_hide = true;
//   isChecked: boolean = false;
//   termsAccepted: boolean = false;
//   isLoading: boolean = false;
// showAlert: any;

//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private http: HttpClient,
//     private formBuilder: FormBuilder,
//     private snackBar: MatSnackBar,
//     private dialog: MatDialog
//   ) {}

//   ngOnInit(): void {
//     this.initForm();
//     this.route.queryParams.subscribe((params) => {
//       const verificationCode = params['code'];
//       if (verificationCode) {
//         this.verifyAccount(verificationCode);
//       }
//      // console.log(verificationCode)
//     });
//   }

//   initForm(): void {
//     this.form = this.formBuilder.group({
//       full_name: [
//         '',
//         Validators.compose([
//           Validators.required,
//           Validators.pattern('^[a-zA-Z]+(?:\\s[a-zA-Z]+)*$'),
//         ]),
//       ],
//       mobile_number: [
//         '',
//         Validators.compose([
//           Validators.required,
//           Validators.minLength(10),
//           Validators.maxLength(10),
//           Validators.pattern('^[0-9]*$'),
//         ]),
//       ],
//       email: [
//         '',
//         Validators.compose([Validators.required, Validators.email]),
//       ],
//       password: [
//         '',
//         Validators.compose([
//           Validators.required,
//           Validators.pattern(
//             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/
//           ),
//         ]),
//       ],
//       repeat_password: ['', Validators.required],
//     });
//   }

//   onSubmit(): void {
//     if (this.form.valid) {
//       const checklocaldata = localStorage.getItem('user');
//       const existingUser = JSON.parse(checklocaldata || '[]');
//       const isAlreadyRegistered = existingUser.some(
//         (user: any) => user.email === this.form.value.email
//       );
//     if (this.form.valid) {
//       const newUser = {
//         full_name: this.form.value.full_name,
//         email: this.form.value.email,
//         mobile_number: this.form.value.mobile_number,
//         password: this.form.value.password,
//       };

//       // this.isLoading = true;
//       // this.http.post('http://localhost:8080/api/users/signup', newUser).subscribe(
//       //   (response: any) => {
//       //     this.showSuccessAlert();
//       //     this.router.navigate(['success'])
//       //     this.isLoading = false;
//       //   },

//       this.isLoading = true;
//       this.http.post('http://localhost:8080/api/users/signup', newUser).subscribe(
//         (response: any) => {
//           // // Handle success
//           existingUser.push(newUser);
//           alert(newUser)
//           localStorage.setItem('user', JSON.stringify(existingUser));
//           this.showSuccessAlert();
//           this.isLoading = false;
//         },

//         (error: any) => {
//           this.showErrorAlert('Error occurred while signing up');
//           console.error('Error occurred:', error);
//           this.isLoading = false;
//         }
//       );
//     }
//   }

//   verifyAccount(verificationCode: string): void {
//     const url = `http://localhost:8080/api/users/verify?code=${verificationCode}`;
//     this.http.get(url).subscribe(
//       (response: any) => {
//         this.router.navigate(['/signin']);
//       },
//       (error: any) => {
//         console.error('Error occurred during account verification:', error);
//         this.showErrorAlert('Error occurred during account verification');
//       }
//     );
//   }
  

//   passwordMatchValidator(form: FormGroup) {
//     const password = form.get('password')?.value;
//     const repeatPassword = form.get('repeat_password')?.value;
//     if (password !== repeatPassword) {
//       form.get('repeat_password')?.setErrors({ passwordsNotMatch: true });
//     } else {
//       form.get('repeat_password')?.setErrors(null);
//     }

//     return null;
//   }

//   togglePasswordVisibility(): void {
//     this.password_hide = !this.password_hide;
//   }

//   toggleRepeatPasswordVisibility(): void {
//     this.repeate_password_hide = !this.repeate_password_hide;
//   }

//   showSuccessAlert() {
//     this.snackBar.open('Form submitted successfully!', 'Close', {
//       duration: 3000,
//     });
//   }

//   showErrorAlert(msg = '') {
//     this.snackBar.open(msg, 'Close', {
//       duration: 3000,
//     });
//   }

//   goToSignin() {
//     this.router.navigate(['/sign-in']);
//   }

//   openTermsModal(checked: any) {
//     this.termsAccepted = checked.checked;
//     this.isChecked = false;
//     if (!this.isChecked) {
//       const dialogRef = this.dialog.open(TermsModalComponentComponent, {
//         disableClose: true,
//       });

//       dialogRef.afterClosed().subscribe((result) => {
//         if (result === 'agree') {
//           this.isChecked = true;
//           checked = true;
//           this.termsAccepted = checked;
//         } else {
//           this.isChecked = false;
//           checked = false;
//           this.termsAccepted = checked;
//         }
//       });
//     }
//   }
// }





import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TermsModalComponentComponent } from 'src/app/modules/terms-modal-component/terms-modal-component.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  password_hide = true;
  repeate_password_hide = true;
  isChecked: boolean = false;
  termsAccepted: boolean = false;
  isLoading: boolean = false;
  showAlert: any;
  emailForm: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      const verificationCode = params['code'];
      if (verificationCode) {
        this.verifyAccount(verificationCode);
      }
      // console.log(verificationCode)
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      full_name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z]+(?:\\s[a-zA-Z]+)*$'),
        ]),
      ],
      mobile_number: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/
          ),
        ]),
      ],
      repeat_password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const checklocaldata = localStorage.getItem('user');
      const existingUser = JSON.parse(checklocaldata || '[]');
      const isAlreadyRegistered = existingUser.some(
        (user: any) => user.email === this.form.value.email
      );
      if (this.form.valid) {
        const newUser = {
          full_name: this.form.value.full_name,
          email: this.form.value.email,
          mobile_number: this.form.value.mobile_number,
          password: this.form.value.password,
        };

        this.isLoading = true;
        this.http.post('http://localhost:8080/api/users/signup', newUser).subscribe(
          (response: any) => {
            // // Handle success
            existingUser.push(newUser);
            alert(newUser);
            localStorage.setItem('user', JSON.stringify(existingUser));
            this.showSuccessAlert();
            this.isLoading = false;
            // this.router.navigate(['success'])
            this.router.navigate(['/success'], { queryParams: { email: this.form.value.email } });

          },

          (error: any) => {
            this.showErrorAlert('Error occurred while signing up');
            console.error('Error occurred:', error);
            this.isLoading = false;
          }
        );
      }
    }
  }

  // verifyAccount(verificationCode: string): void {
  //   const url = `http://localhost:8080/api/users/verify?code=${verificationCode}`;
  //   this.http.get(url).subscribe(
  //     (response: any) => {
  //       this.router.navigate(['/signin']);
  //     },
  //     (error: any) => {
  //       console.error('Error occurred during account verification:', error);
  //       this.showErrorAlert('Error occurred during account verification');
  //     }
  //   );
  // }

  verifyAccount(verificationCode: string): void {
    const url = `http://localhost:8080/api/users/verify?code=${verificationCode}`;
    this.http.get(url).subscribe(
      (response: any) => {
        // Check if the response indicates successful verification
        if (response === 'Successfully your account is verified') {
          // Navigate to the signin form
          this.router.navigate(['/signin']);
        } else {
          // Handle unexpected response
          console.error('Unexpected response during account verification:', response);
          this.showErrorAlert('Unexpected response during account verification');
        }
      },
      (error: any) => {
        // Handle error response
        console.error('Error occurred during account verification:', error);
        this.showErrorAlert('Error occurred during account verification');
      }
    );
  }
  

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeat_password')?.value;
    if (password !== repeatPassword) {
      form.get('repeat_password')?.setErrors({ passwordsNotMatch: true });
    } else {
      form.get('repeat_password')?.setErrors(null);
    }

    return null;
  }

  togglePasswordVisibility(): void {
    this.password_hide = !this.password_hide;
  }

  toggleRepeatPasswordVisibility(): void {
    this.repeate_password_hide = !this.repeate_password_hide;
  }

  showSuccessAlert() {
    this.snackBar.open('Form submitted successfully!', 'Close', {
      duration: 3000,
    });
  }

  showErrorAlert(msg = '') {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
  }

  goToSignin() {
    this.router.navigate(['/sign-in']);
  }

  openTermsModal(checked: any) {
    this.termsAccepted = checked.checked;
    this.isChecked = false;
    if (!this.isChecked) {
      const dialogRef = this.dialog.open(TermsModalComponentComponent, {
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'agree') {
          this.isChecked = true;
          checked = true;
          this.termsAccepted = checked;
        } else {
          this.isChecked = false;
          checked = false;
          this.termsAccepted = checked;
        }
      });
    }
  }
}
