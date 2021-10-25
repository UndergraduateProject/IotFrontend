importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBt5vAljr4qv0uiCaLyMxMKm8TfWabBwNA",
  authDomain: "iotpushserver.firebaseapp.com",
  projectId: "iotpushserver",
  storageBucket: "iotpushserver.appspot.com",
  messagingSenderId: "1081402279946",
  appId: "1:1081402279946:web:4fdd768fa46f5481e477f3"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});