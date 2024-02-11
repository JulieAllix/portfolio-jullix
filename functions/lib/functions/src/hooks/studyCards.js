"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __importStar(require("firebase-functions"));
const firebaseConfig_1 = require("../utils/firebaseConfig");
exports.increaseNumberOfCards = functions.firestore.document("studyCards/{cardUid}").onCreate(async (studyCardSnap) => {
    const studyCard = studyCardSnap.data();
    const _userData = (await firebaseConfig_1.usersRef.where("userUid", "==", studyCard.userUid).get()).docs.map(document => document.data());
    const userData = _userData ? _userData[0] : null;
    const updatedData = {
        ...userData,
        numberOfCards: userData.numberOfCards + 1,
    };
    firebaseConfig_1.usersRef.doc(updatedData.userUid).set(updatedData).then(() => {
        console.log("NumberOfCards updated :", updatedData.numberOfCards);
    }).catch(error => {
        console.error("error update user : ", error);
    });
});
//# sourceMappingURL=studyCards.js.map