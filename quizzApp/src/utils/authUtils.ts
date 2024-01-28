import {auth} from "@Utils/firebaseConfig";
import {notification} from "@Utils/events";

export const handleResetPassword = (email: string): void => {
    auth.sendPasswordResetEmail(email).then(() => {
        notification.emit('success', `A reset password email has been sent to the following email address : ${email}`);
    }).catch((error) => {
        console.error('Error sending password reset email:', error);
        notification.emit('error', 'An error occured while sending the reset password email.');
    });
};
