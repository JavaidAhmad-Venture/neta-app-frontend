import { UserProfileUpdate } from './../../models/userProfileUpdate';
import { PhoneNumber } from './../../models/phoneNumber';
import { FirebaseUser } from './../../models/firebase-user';
import { UserService } from './../../services/user.service';
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

@Component({
  selector: 'phone-login',
  templateUrl: './phone-login.component.html'
  // styleUrls: ['./phone-login.component.css']
})
export class PhoneLoginComponent implements OnInit {

  registrationId:string='';
  cName: string;
  cPic: string;
  pImage: string;
  cUrl: any;
  loading:boolean;
  selectedFile:File = null;
  windowRef: any;
  phoneNumber = new PhoneNumber()
  verificationCode: string;
  user: any;
  professions:any[];
  educations:any[];
  castes:any[];
  religions:any[];
  userObject=new UserProfileUpdate();
  years:any[]= this.userObject.getYears();
  days:any[]= ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  months:any[]= ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  genders:any[]= ['MALE', 'FEMALE', 'TRIGENDER'];
  constructor(private win: WindowService,
    private cookieService: CookieService,
    private helperService: HelperService,
    private cloudService: CloudnaryService,
    private userService: UserService) {
    console.log('firebase', firebase)
    this.cUrl = cloudService.cloudnaryUrl;
    }
  incorrectCode: boolean = false;
  ngOnInit() {
    console.log('Firabse id: ', firebase);
    this.windowRef = this.win.windowRef;
    console.log('Window is: ', this.windowRef);
    
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase)
    }
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {


      'size': 'invisible',
      'lang': 'en',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("REsponse is:", response);
        this.sendLoginCode()
      }
    })
    // this.windowRef.recaptchaVerifier.render().then(function(widgetId) {
    //   this.windowRef.recaptchaWidgetId = widgetId;
    // });
    let res:any= { type: '',
data: {
  state: "",
  d_id: "",
  d_name: "",
  a_id: "",
  a_name: "",
}
}
    this.helperService.getEmitter().subscribe((resp) => {
      res=resp;
      console.log("Helper in phone popup", res);

      if (res.type  == "voteLoginPopup") {
        // this.state=res.data.state;
        this.cName = res.data.name;
        this.cPic = res.data.public_id;
        this.pImage = res.data.party_image;
      }
    })
    this.getMasterData();

   
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
    this.loading = true;
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this.incorrectCode = false;
        this.user = result.user;
        //fetching access token
        this.loading = false;
        console.log('firebase user:', this.user);
       
        this.phoneNumber.country = '';
        this.phoneNumber.line = '';
        this.verificationCode = '';
        $('#verify-otp').modal('toggle');
        this.setAccessToken(this.user);
        
        
      })
      .catch(error => {
        this.loading = false;
        this.incorrectCode = true;
        console.log(error, "Incorrect code entered?")
      });
  }
  setAccessToken(user) {
    let credentials = {
      jwt_token: user.qa,
      uid: user.uid
    }

    this.cookieService.createCookie('phoneNumber',user.phoneNumber,null)
    this.userService.getAccessToken(credentials)
      .subscribe(res => {
        console.log('Response from login api:', res);
        let data=res['data'];
        this.cookieService.createCookie('access_token',data['access-token'],data['expiry'],null);
        this.cookieService.createCookie('_client',data['client'],data['expiry'],null);
        this.cookieService.createCookie('_uid',data['uid'],data['expiry'],null);
        this.helperService.setEmitter({
          type: 'signIn',
          data: {
            u_id: 'abc'
          }
        });

        this.registrationId=this.cookieService.readCookie('registration_id');
        console.log('your registration id is:',this.registrationId);
        if(!this.registrationId)
        $('#register-profile').modal('show');
      })
  }
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onSubmit(user){
    const fd=new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name);
    console.log('Updated User:',JSON.parse(user.value.month)+'-'+JSON.parse(user.value.date));
    let startDate = user.value.year+'-'+user.value.month+'-'+user.value.date;
    console.log('date format:',new Date(startDate).toISOString());

    
    console.log('selected  file:',this.selectedFile);
    this.calculateAge(new Date(startDate));
  }
  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }
  getMasterData(){
    this.userService.getMasterData()
    .subscribe(res=>{
      let data:any=res['data'];
      console.log('Master Data:',res);
      this.educations=data.educations;
      this.professions = data.professions;
      this.religions = data.religions;
      this.castes = data.castes;
    })
  }
  calculateAge(birthday) { // birthday is a date
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    console.log('total age is:'+Math.abs(ageDate.getUTCFullYear() - 1970));
    
  }
  onFirstTimeReg(user){
    console.log('User in patch:',user.value.name)
    let name = user.value.name
    // const fd=new FormData();
    // fd.append('image',this.selectedFile,this.selectedFile.name);
    this.userService.updateUserFirstTime(name)
    .subscribe(res=>{
      console.log('patch response:'+res);
      let data= res.json().data;
      let registrationId=data.id;
      this.cookieService.createCookie('registration_id',registrationId,null);

    });
  }
} 