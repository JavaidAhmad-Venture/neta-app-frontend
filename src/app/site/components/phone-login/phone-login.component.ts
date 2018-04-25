import { environment } from './../../../../environments/environment.dev';
import { WindowService } from './../../../shared/services/window.service';
import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase'

//import * as firebase from 'firebase';
// declare var firebase: any;
//  import * as auth from 'firebase/auth';

export class PhoneNumber {
  country: string;
  line: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.line;
    console.log("Number is :", num);
    return `+${num}`
  }

}
@Component({
  selector: 'phone-login',
  templateUrl: './phone-login.component.html'
  // styleUrls: ['./phone-login.component.css']
})
export class PhoneLoginComponent implements OnInit {

  @Input('cName') cName;
  @Input('cPic') cPic;
  @Input('pImage') pImage;
  @Input('cUrl') cUrl;

  windowRef: any;
  phoneNumber = new PhoneNumber()
  verificationCode: string;
  user: any;
  constructor(private win: WindowService) {
    console.log('firebase', firebase)
  }

  ngOnInit() {
 
    console.log('Firabse id: ', firebase);

    this.windowRef = this.win.windowRef;
    console.log('Window is: ', this.windowRef);
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    // this.windowRef.recaptchaVerifier.render()
    firebase.initializeApp(environment.firebase)
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();

    // var recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);

  }



  sendLoginCode() {

    var appVerifier = this.windowRef.recaptchaVerifier;
    //console.log("App verifier is:",appVerifier);
    const num = this.phoneNumber.e164;
    console.log("In method number is:", num);

    console.log("firebase  is:", firebase);
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(error => console.log(error));

  }
  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {

        this.user = result.user;
        if (this.user) {
          alert('user registered successfully!');
          localStorage.setItem('userId', firebase.auth().currentUser.uid)
        }
        this.phoneNumber.country = '';
        this.phoneNumber.line = '';
        this.verificationCode = '';


      })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }


}
