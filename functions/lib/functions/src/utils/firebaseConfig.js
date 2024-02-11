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
exports.usersRef = exports.studyCardsRef = exports._firestore = void 0;
const admin = __importStar(require("firebase-admin"));
const env_1 = require("../env");
const devServiceAccount = __importStar(require("../../portfolio-jallix-firebase-adminsdk-l4266-83ed7cb532.json"));
admin.initializeApp({
    credential: admin.credential.cert(devServiceAccount),
    storageBucket: env_1.env.firebaseEnv.storageBucket,
}, "app");
exports._firestore = admin.app('app').firestore();
exports.studyCardsRef = exports._firestore.collection('studyCards');
exports.usersRef = exports._firestore.collection('users');
//# sourceMappingURL=firebaseConfig.js.map