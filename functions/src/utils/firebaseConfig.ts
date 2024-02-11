import * as admin from "firebase-admin";
import {env} from "../env";
import {firestore} from "firebase-admin";
import CollectionReference = firestore.CollectionReference;
import {CardData} from "../../../models/types/bases/quizzApp/Form";
import {User} from "../../../models/types/bases/quizzApp/User";
import * as devServiceAccount from "../../portfolio-jallix-firebase-adminsdk-l4266-83ed7cb532.json";

admin.initializeApp({
    credential: admin.credential.cert(devServiceAccount as any),
    storageBucket: env.firebaseEnv.storageBucket,
}, "app");

export const _firestore = admin.app('app').firestore();

export const studyCardsRef = _firestore.collection('studyCards') as CollectionReference<CardData>;
export const usersRef = _firestore.collection('users') as CollectionReference<User>;
