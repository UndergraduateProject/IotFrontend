import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt5vAljr4qv0uiCaLyMxMKm8TfWabBwNA",
  authDomain: "iotpushserver.firebaseapp.com",
  projectId: "iotpushserver",
  storageBucket: "iotpushserver.appspot.com",
  messagingSenderId: "1081402279946",
  appId: "1:1081402279946:web:4fdd768fa46f5481e477f3"
};
firebase.initializeApp(firebaseConfig);

export default firebase;