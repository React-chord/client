import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDoZ0zqS1VGvZEcDaqo5DK84BZWnSVo_z4',
  authDomain: 'chord-guitar-865ff.firebaseapp.com',
};
firebase.initializeApp(config);


export { firebase };
