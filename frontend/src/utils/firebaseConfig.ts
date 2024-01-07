import firebase from 'firebase/app';
import {env} from "../env";

firebase.initializeApp(env.firebaseEnv);

