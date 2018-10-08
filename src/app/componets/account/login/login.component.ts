import { ApiService } from './../../../commons/service/app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../commons/service/auth.service';


@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    user: User = new User();
    correctUser = true;
    emailPattern = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
    accountForm: FormGroup;
    userForm: FormGroup;
    constructor(
        private authService: AuthService,
        private apiService: ApiService,
        private router: Router
    ) { }



    ngOnInit() {
        this.accountForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
            password: new FormControl('', [Validators.required])
        });
        this.userForm = new FormGroup({
            fullName: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
            password: new FormControl('', [Validators.required])
        });
    }

    login() {
        this.authService.logIn(this.user)
            .subscribe(data => {
                this.router.navigate(['/home']);
                this.correctUser = true;
            }, err => {
                this.correctUser = false;
            }
            );
    }

    onSearchChange() {
        this.correctUser = true;
    }

    onSaveUser() {
        this.apiService.addElement('/account/register', this.getObjectUser(this.userForm.value))
            .subscribe(
                result => {
                    alert('El usuario se guardó con exíto');
                },
                error => {
                    alert(error.error);
                }
            );

    }

    getObjectUser(formValue: any): User {
        const user: User = new User();
        user.fullName = formValue.fullName;
        user.username = formValue.username;
        user.password = formValue.password;
        return user;

    }
    resetFormUser() {
        this.userForm.reset();
    }
}
