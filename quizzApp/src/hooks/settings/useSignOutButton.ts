import {useDispatch} from "react-redux";

import {setUser} from "@Utils/redux/reducers/user";
import {signOut} from "@Utils/firebaseConfig";

export const useSignOutButton = () => {
    const dispatch = useDispatch();

    const handleSignOut = (): void => {
        dispatch(setUser(null));
        signOut().catch(error => console.error('error signOut', error));
    };

    return {handleSignOut};
}
