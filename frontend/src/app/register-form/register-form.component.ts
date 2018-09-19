import {Component, OnInit} from '@angular/core';
import {AwsLambdaService} from '../aws-lambda.service';
import {last} from 'rxjs/operators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  cc: string;
  serial: string;

  hasUsers: boolean;
  saveSuccess: boolean;

  constructor(
    private awsLambda: AwsLambdaService
  ) {
  }

  ngOnInit() {
    this.hasUsers = false;
    this.saveSuccess = false;
  }

  inputFocused(event) {
    const span = event.target.previousElementSibling;

    span.className += ' active';
  }

  focusOut(event) {
    if (!event.target.value) {
      const span = event.target.previousElementSibling;

      span.className = span.className.replace(' active', '');
    }
  }

  onInputChanged(event, maxLength) {

    const keyCode = event.keyCode;

    if (event.target.value.length > maxLength - 1) {

      // Allow left and right arrows to be pressed also delete and backspace and enter
      if (keyCode !== 37 && keyCode !== 39 &&
        keyCode !== 46 && keyCode !== 8 && keyCode !== 13) {
        event.preventDefault();
      }
    }
  }

  lambdaGet() {
    this.awsLambda.invokeGet()
      .subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.error('Not possible to invoke lambda', error);
        }
      );
  }

  lambdaPost() {
    const body = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      cc: this.cc
      // serial: this.serial.trim()
    };
    this.awsLambda.invokePost(body)
      .subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.error(error);
        }
      );
  }

}
