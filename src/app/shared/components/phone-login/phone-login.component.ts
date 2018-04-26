import { CloudnaryService } from './../../services/cloudnary.service';
import { HelperService } from './../../services/helper.service';
import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { CookieService } from '../../services/cookie.service';
import { environment } from './../../../../environments/environment.prod';
import { WindowService } from './../../services/window.service';

//import * as firebase from 'firebase';
declare var $: any;
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

   cName:string;
   cPic:string;
   pImage:string;
   cUrl:any;

  windowRef: any;
  phoneNumber = new PhoneNumber()
  verificationCode: string;
  user: any;
  constructor(private win: WindowService,private cookieService:CookieService,private helperService:HelperService,private cloudService:CloudnaryService) {
    console.log('firebase', firebase)
    this.cUrl=cloudService.cloudnaryUrl;
  }
  incorrectCode: boolean = false;
  ngOnInit() {

    console.log('Firabse id: ', firebase);

    this.windowRef = this.win.windowRef;
    console.log('Window is: ', this.windowRef);
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    // this.windowRef.recaptchaVerifier.render()
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase)
   }
    
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    // this.windowRef.recaptchaVerifier.render();


    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      
     
      'size': 'invisible',
      'lang':'en',
      'callback': (response)=> {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("REsponse is:",response);
        this.sendLoginCode()
      }
    })
    // this.windowRef.recaptchaVerifier.render().then(function(widgetId) {
    //   this.windowRef.recaptchaWidgetId = widgetId;
    // });
    this.helperService.getEmitter().subscribe((res)=>{
      console.log("Helper in phone popup",res);
      
      if(res.type=="voteLoginPopup"){
          // this.state=res.data.state;
          this.cName=res.data.name;
          this.cPic=res.data.public_id;
          this.pImage=res.data.party_image;
      }
  })
   
 
   
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
        this.incorrectCode = false;
        this.user = result.user;
        console.log('firebase user:',this.user);
        this.cookieService.createCookie('userId',this.user.uid,null,null);
        console.log('Response from firebase:'+this.user.refreshToken);
        this.phoneNumber.country = '';
        this.phoneNumber.line = '';
        this.verificationCode = '';
        $('#verify-otp').modal('toggle');

        this.helperService.setEmitter({
          type: 'signIn',
          data: {
            u_id:'abc'
          }
        })

      })
      .catch(error => {
        this.incorrectCode = true;
        console.log(error, "Incorrect code entered?")
      });
  }


}
