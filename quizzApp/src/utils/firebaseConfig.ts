import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {env} from "../env";
import {User} from "@Models/types/bases/quizzApp/User";

import CollectionReference = firebase.firestore.CollectionReference;
import {Language} from "@Models/types/bases/quizzApp/Language";
firebase.initializeApp(env.firebaseEnv);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const usersRef = firestore.collection('users') as CollectionReference<User>;
const languagesRef = firestore.collection('languages') as CollectionReference<Language>;

export const registerWithEmailAndPassword = (email:string,password:string) =>{
    return auth.createUserWithEmailAndPassword(email,password);
};

export const loginWithEmailAndPassword = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password)
};

export const signOut = (): Promise<void> => {
    return auth.signOut();
}

export const saveUser = (userData: User) => {
    return usersRef.doc(userData.userUid).set({
        ...userData
    }).then(res => {
        return getUserFirebaseData(userData.userUid)
    });
};

export const getUserFirebaseData = async (userUid: string): Promise<User> => {
    const userData = await usersRef.doc(userUid).get();

    const firebaseUser = await userData.data();
    if (firebaseUser !== undefined) {
        return firebaseUser
    } else {
        throw new Error();
    }
};

export const createLanguage = async (languageData: Language): Promise<void> => {
    return languagesRef.doc(languageData.languageUid.toString()).set({
        ...languageData
    });
};
