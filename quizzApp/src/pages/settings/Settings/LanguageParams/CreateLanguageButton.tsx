import React, {useState} from "react";

import {ButtonCustom} from "@Components/ButtonCustom";
import {InputCustom} from "@Components/InputCustom";
import {ModalCustom} from "@Components/ModalCustom";

import {useAddNewLanguageButton} from "@Hooks/settings/useAddNewLanguageButton";

interface Props {

}

export const CreateLanguageButton: React.FC<Props> = (props) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [newLanguageName, setNewLanguageName] = useState<string>('');
    const {handleClick} = useAddNewLanguageButton(newLanguageName, setIsAddModalOpen, setNewLanguageName);

    return (
        <div>
            <ButtonCustom onClick={() => setIsAddModalOpen(true)}>Add new language</ButtonCustom>
            <ModalCustom visible={isAddModalOpen} setVisible={setIsAddModalOpen} title={"Add a new language"} buttonAction={handleClick}>
                <InputCustom label={'New language'} value={newLanguageName} setValue={setNewLanguageName}/>
            </ModalCustom>
        </div>
    )
};
