import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBYyLU6aDE-c4OIVEsq0JPBBo0CJEvOBBE',
  authDomain: 'thevaticanarchives.firebaseapp.com',
  databaseURL: 'https://thevaticanarchives.firebaseio.com',
  projectId: 'thevaticanarchives',
  storageBucket: 'thevaticanarchives.appspot.com',
  messagingSenderId: '110115802863',
  appId: '1:110115802863:web:e50b5cea23f068c2ae151a',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
