import * as functions from "firebase-functions";
import {usersRef} from "../utils/firebaseConfig";
import {CardData} from "../../../models/types/bases/quizzApp/Form";

exports.increaseNumberOfCards = functions.firestore.document("studyCards/{cardUid}").onCreate(async (studyCardSnap) => {
    const studyCard = studyCardSnap.data() as CardData;
    const _userData = (await usersRef.where("userUid", "==", studyCard.userUid).get()).docs.map(document => document.data());
    const userData = _userData ? _userData[0] : null;

    const updatedData = {
        ...userData,
        numberOfCards: userData.numberOfCards+1,
    };

    usersRef.doc(updatedData.userUid).set(updatedData).then(() => {
        console.log("NumberOfCards updated :", updatedData.numberOfCards)
    }).catch(error => {
        console.error("error update user : ", error)
    });
});
