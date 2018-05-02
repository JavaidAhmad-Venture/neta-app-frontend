// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  BASE_URL:' https://neta-dev.herokuapp.com',
  PROTOCOL: 'https://',
  
  CLIENT_ID: 'netawebapp',
  CLOUDNAME: 'neta-dev',
  CLOUD_URL:"http://res.cloudinary.com/neta-dev/image/upload/",  
  CLIENT_SECRET: '$2a$10$0.dfDGl.8Es9cAm3ZJyvdO7ElHwBG.pnJjJxUP/LUtacIqk6eUmCa',
  APP_EXTENSION: '',
  QB_APP_ID: 60280,
  QB_AUTH_KEY: "sM7EW2rPwr7Ynkd",
  QB_AUTH_SECRET: "5cNb26pXXe5pyh9",
  QB_ADMIN_ID: 33320220,
  ADMIN_ID: "59e0597aab932609407eaf14",

  firebase:{
    apiKey: "AIzaSyD7w-svmEoo2qoRXJ_Kd6VIgi4xktOZfOM", 
    authDomain: "neta-b01ad.firebaseapp.com",    
    databaseURL: "https://neta-b01ad.firebaseio.com",    
    projectId: "neta-b01ad",    
    storageBucket: "neta-b01ad.appspot.com",    
    messagingSenderId: "18921996431"
  },
  DEFAULT_DISTRICT_ID:"",
  DEFAULT_ASSEMLY_ID:"",
};