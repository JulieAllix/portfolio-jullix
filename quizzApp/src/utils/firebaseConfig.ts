import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {env} from "../env";
import {User} from "@Models/types/bases/quizzApp/User";

import CollectionReference = firebase.firestore.CollectionReference;
import {Language} from "@Models/types/bases/quizzApp/Language";
import {CardData} from "@Models/types/bases/quizzApp/Form";
firebase.initializeApp(env.firebaseEnv);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const usersRef = firestore.collection('users') as CollectionReference<User>;
export const languagesRef = firestore.collection('languages') as CollectionReference<Language>;
export const studyCardsRef = firestore.collection('studyCards') as CollectionReference<CardData>;

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
    console.log(1)
    const userData = await usersRef.doc(userUid).get();
    console.log(2)
    const firebaseUser = await userData.data();
    console.log(3, firebaseUser)
    if (firebaseUser !== undefined) {
        return firebaseUser
    } else {
        throw new Error();
    }
};

// LANGUAGE

export const createLanguage = async (languageData: Language): Promise<string> => {
    await languagesRef.doc(languageData.languageUid.toString()).set({
        ...languageData
    })

    return languageData.languageUid;
};

export const getLanguageByUid = async (languageUid: string): Promise<Language> => {
    const languageData = await languagesRef.doc(languageUid).get();

    const firebaseLanguageData = await languageData.data();
    if (firebaseLanguageData !== undefined) {
        return firebaseLanguageData
    } else {
        throw new Error();
    }
};

export const getLanguagesOfUser = async (user: User): Promise<Language[]> => {
    const languagesUids = user.languages;
    const languagesArray = (await languagesRef.where("languageUid", "in", languagesUids).get()).docs.map(document => document.data());
    return languagesArray;
};

// QUIZZ

export const getRandomNumberId = (): number => {
    const array = [];
    for (let i = 0; i < 21; i++) {
        const randomNumber = (Math.random()*10).toString().split('')[0];
        if (randomNumber === '0') {
            array.push('1')
        } else array.push(randomNumber)

    }
    return Number(array.join(''));
}

export const getAllTrainingCardsOfUser = async (trainingCardsList: number[], languageUid: string): Promise<CardData[]> => {
    const data = await studyCardsRef.where("cardUid", "in", trainingCardsList).where("languageUid", "==", languageUid).get();
    const trainingCards = data.docs.map(document => document.data());
    return trainingCards;
};

// FORM

export const createCard = async (data: CardData): Promise<void> => {
    return studyCardsRef.doc(data.cardUid.toString()).set({
        ...data
    });
};
