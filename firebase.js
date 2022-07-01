import { initializeApp , getApp, getApps } from "firebase/app";
import { browser } from "$app/env"; 

export const firebaseConfig = {
  apiKey: "AIzaSyB1Ugp2lqdTWHnh_lPDyFXiB57cgVjKdHQ",
  authDomain: "svelteauth-92007.firebaseapp.com",
  projectId: "svelteauth-92007",
  storageBucket: "svelteauth-92007.appspot.com",
  messagingSenderId: "185547083824",
  appId: "1:185547083824:web:4c538b501202dc79559df5"
};

export const GetFirebaseApp = () => {
  console.log(browser)
  if (browser) {
    return  (getApps().length === 0) ? initializeApp(firebaseConfig) : getApp();
  }
}

export const DestroyFirebaseApp = () => {
  //
}

export default GetFirebaseApp;

