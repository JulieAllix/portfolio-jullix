import {useState} from "react";

type StateFunction = () => void;

export const useTristate = (init: boolean | null = null): [tristate: null | boolean, setTrue: StateFunction, setFalse: StateFunction, setNull: StateFunction] => {

    const [tristate ,setTristate] = useState<null | boolean>(init);

    const setTrue = () => setTristate(true);
    const setFalse = () => setTristate(false);
    const setNull = () => setTristate(null);

    return [tristate, setTrue, setFalse, setNull];

}

export const useBoolean = (init: boolean = false): [bool: boolean, setTrue: StateFunction, setFalse: StateFunction] => {

    const [bool ,setBool] = useState<boolean>(init);

    const setTrue = () => setBool(true);
    const setFalse = () => setBool(false);

    return [bool, setTrue, setFalse];

}
