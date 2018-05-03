import { Influencer } from './../../models/influencer';
import { UserProfileUpdate } from './../../models/userProfileUpdate';
import { PhoneNumber } from './../../models/phoneNumber';
import { FirebaseUser } from './../../models/firebase-user';
import { UserService } from './../../services/user.service';
import { CloudnaryService } from './../../services/cloudnary.service';
import { HelperService } from './../../services/helper.service';
import { Component, Input, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

import * as firebase from 'firebase';


import { CookieService } from '../../services/cookie.service';
import { environment } from './../../../../environments/environment.prod';
import { WindowService } from './../../services/window.service';
import { FindValueSubscriber } from 'rxjs/operators/find';

//import * as firebase from 'firebase';
declare var $: any;
declare var axios;
//  import * as auth from 'firebase/auth';

@Component({
  selector: 'phone-login',
  templateUrl: './phone-login.component.html'
  // styleUrls: ['./phone-login.component.css']
})
export class PhoneLoginComponent implements OnInit, AfterViewInit {
  
  
  @ViewChild('elementRef') fileUpload;
  cUrlUpload = environment.CLOUDINARY_URL_UPLOAD
  presetCode = environment.CLOUDINARY_UPLOAD_PRESET;
  cUrlUpdated: any;
  formData: any;
  public_id:any;
  imageFormat:any;
  isSelected: boolean = false;
  signature:any;
  timestamp:any;

  influencerName:string='';
  influencerProfilePic:string='';
  registrationId:string='';
  cName: string;
  cPic: string;
  pImage: string;
  cUrl: any;
  loading: boolean;
  selectedFile: File = null;
  windowRef: any;
  phoneNumber = new PhoneNumber()
  verificationCode: string;
  user: any;
  professions: any[];
  educations: any[];
  castes: any[];
  religions: any[];
  userObject = new UserProfileUpdate();
  years: any[] = this.userObject.getYears();
  days: any[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  months: any[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  genders: any[] = ['MALE', 'FEMALE', 'TRIGENDER'];

  constructor(private win: WindowService,
    private cookieService: CookieService,
    private helperService: HelperService,
    private cloudService: CloudnaryService,
    private userService: UserService,

    private elementRef: ElementRef,
    private renderer: Renderer2) {
   // console.log('firebase', firebase)
    this.cUrl = cloudService.cloudnaryUrl;
    //console.log("This curl is", this.cUrl);
  }
  incorrectCode: boolean = false;




  //Edited By Shubham
  ngAfterViewInit() {
   
    
  }

  getPublicId(){
    this.renderer.listen(this.fileUpload.nativeElement, 'change', (event) => {
      this.isSelected = !this.isSelected;
      this.selectedFile = event.target.files[0];
      let t = this.selectedFile.type.split('/');
      //console.log("This file size is:", this.selectedFile.size);
      if (t[0] == 'image' && this.selectedFile.size < 500000) {
        //      console.log("This file is:",this.selectedFile);
        //this.name =this.selectedFile.name;
        this.formData = new FormData();
        this.formData.append('file', this.selectedFile);
        this.formData.append('upload_preset', this.presetCode);
        axios({     // url:this.cUrl,
          url: this.cUrlUpload,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: this.formData
        }).then((res) => {
          this.public_id = res.data.public_id;
          this.cUrlUpdated = res.data.secure_url;
<<<<<<< HEAD
          this.imageFormat = res.data.format;
          this.signature = res.data.signature;
          this.timestamp = res.data.version;
          console.log(res.data);
          console.log('timestamp:v',this.timestamp);
          
         
=======
         // console.log("public_id", this.public_id);
>>>>>>> c5a32ab8e6d967bdd31ced4edee23a6de5824ba8
        }).catch(function (err) {
         // console.log("Error is", err);
        })
      }
      else {
        alert("file should be image or size less than 5 Mb");
      }
    });
  }



  ngOnInit() {
    //console.log('Firabse id: ', firebase);
    this.windowRef = this.win.windowRef;
    //console.log('Window is: ', this.windowRef);

    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase)
    }
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {

      'key': '6Lep_lYUAAAAAGN6zxJW8nkU8LafqEjWEd9ZFr3q',
      'size': 'invisible',
      'lang': 'en',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //console.log("REsponse is:", response);
        this.sendLoginCode()
      }
    })
    // this.windowRef.recaptchaVerifier.render().then(function(widgetId) {
    //   this.windowRef.recaptchaWidgetId = widgetId;
    // });
    let res: any = {
      type: '',
      data: {
        state: "",
        d_id: "",
        d_name: "",
        a_id: "",
        a_name: "",
      }
    }
    this.helperService.getEmitter().subscribe((resp) => {
      res = resp;
     // console.log("Helper in phone popup", res);

      if (res.type == "voteLoginPopup") {
        // this.state=res.data.state;
        this.cName = res.data.name;
        this.cPic = res.data.public_id;
        this.pImage = res.data.party_image;
      }
    })
    this.getPublicId();  
    this.getMasterData();


  }
  sendLoginCode() {

    var appVerifier = this.windowRef.recaptchaVerifier;
    //console.log("App verifier is:",appVerifier);
    const num = this.phoneNumber.e164;
    //console.log("In method number is:", num);
    //console.log("firebase  is:", firebase);
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
    //console.log('my credentials:', credentials);

    this.cookieService.createCookie('uniqueIdFromFirebase', user.uid, null)
    this.cookieService.createCookie('phoneNumber', user.phoneNumber, null)
    this.userService.getAccessToken(credentials)
      .subscribe(res => {
        //console.log('Response from login api:', res);
        let data = res['data'];
        this.cookieService.createCookie('access_token', data['access-token'], data['expiry'], null);
        this.cookieService.createCookie('_client', data['client'], data['expiry'], null);
        this.cookieService.createCookie('_uid', data['uid'], data['expiry'], null);
        this.helperService.setEmitter({
          type: 'signIn',
          data: {
            u_id: 'abc'
          }
        });

        this.registrationId = this.cookieService.readCookie('registration_id');
        let uniqueIdFromFirebase = this.cookieService.readCookie('uniqueIdFromFirebase');
        //console.log('your registration id is:', this.registrationId);
        // if(!uniqueIdFromFirebase)
        this.getExistingUser();

      })
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onSubmit(user) {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    //console.log('Updated User:', JSON.parse(user.value.month) + '-' + JSON.parse(user.value.date));
    let startDate = user.value.year + '-' + user.value.month + '-' + user.value.date;
    //console.log('date format:', new Date(startDate).toISOString());


    //console.log('selected  file:', this.selectedFile);
    this.calculateAge(new Date(startDate));
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }


  getMasterData() {
    this.userService.getMasterData()
      .subscribe(res => {
        let data: any = res['data'];
        //console.log('Master Data:', res);
        this.educations = data.educations;
        this.professions = data.professions;
        this.religions = data.religions;
        this.castes = data.castes;
      })
  }
  calculateAge(birthday) { // birthday is a date
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    //console.log('total age is:' + Math.abs(ageDate.getUTCFullYear() - 1970));

  }
  onFirstTimeReg(user) {
   // console.log('User in patch:', user.value.name)
    let name = user.value.name
    // const fd=new FormData();
    // fd.append('image',this.selectedFile,this.selectedFile.name);
    this.userService.updateUserFirstTime(name,this.timestamp,this.public_id,this.imageFormat,this.signature)
    .subscribe(res=>{
      //console.log('patch response:'+res);
      let data= res.json().data;
      let registrationId=data.id;
      this.influencerName=data.info.name;
      this.influencerProfilePic=data.info.profile_pic;
      if(this.influencerName){
        this.cookieService.createCookie('name',this.influencerName,null);
        this.cookieService.createCookie('influencer_profile_pic',this.influencerProfilePic,null);
     }
        this.cookieService.createCookie('registration_id',registrationId,null);

      })
      
  }
  getExistingUser() {
    let constituency_id = JSON.parse(this.cookieService.readCookie("assembly_id"))
    this.userService.fetchExistingUsers(constituency_id)
    .subscribe(res=>{
      let data=res.data;
<<<<<<< HEAD
      console.log('Existing response:',data);
=======
     // console.log('Existing response:',data);
     // console.log('Existing id:',data.id);
>>>>>>> c5a32ab8e6d967bdd31ced4edee23a6de5824ba8
      if(!data.info.name)
      $('#register-profile').modal('show');
      else this.influencerName = data.info.name;

      if(this.influencerName)
      this.cookieService.createCookie('name',this.influencerName,null);
    },err=>$('#register-profile').modal('show'))
  }

  fetchCloudnaryConfig(){
    this.cloudService.getCloudnaryConfig()
    .subscribe(res=>{
     // console.log('Clounary configuration is:',res);
    })
  }
} 