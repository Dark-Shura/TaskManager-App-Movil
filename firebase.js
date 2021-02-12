import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

  var firebaseConfig = {
    apiKey: "AIzaSyDmD41-k1USZR2dPP5Z4VjoQqr9Aycxb2k",
    authDomain: "taskmanager-90602.firebaseapp.com",
    databaseURL: "https://taskmanager-90602.firebaseio.com",
    projectId: "taskmanager-90602",
    storageBucket: "taskmanager-90602.appspot.com",
    messagingSenderId: "436375992807",
    appId: "1:436375992807:web:79a3789f6e01b22f662542"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }
 export const AUTH = firebase.auth()
 export const DB = firebase.firestore()
 export const STORAGE_REF = firebase.storage().ref()
 export const STORAGE = firebase.storage()