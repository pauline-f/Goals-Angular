import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    });
  }

  onSubmit() {
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    this.userService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/goal/list']);
      },
      (error) => {
        this.errorMessage = error;
      });
  }

}
