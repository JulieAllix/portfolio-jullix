import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {ButtonCustom} from "@Components/ButtonCustom";
import {CreateLanguageButton} from "@Pages/settings/Settings/LanguageParams/CreateLanguageButton";
import {DropdownCustom} from "@Components/DropdownCustom";
import {InputCustom} from "@Components/InputCustom";
import {Card} from "@Components/layout";

import {State} from "@Utils/redux/store";
import {useFetchLanguagesData} from "@Hooks/useFetchLanguagesData";
import {useSaveUserLanguageParams} from "@Hooks/useSaveUserLanguageParams";

interface Props {

};

export const LanguageParams: React.FC<Props> = () => {
    const user = useSelector((state: State) => state.user);
    const {languagesdata} = useFetchLanguagesData();
    const {isLoading, handleSave} = useSaveUserLanguageParams();

    const [studiedLanguage, setStudiedLanguage] = useState<{name: string, code: string}>(null);
    const [nativeLanguage, setNativeLanguage] = useState<string>(user.nativeLanguage);

    useEffect(() => {
        const updatedStudiedLanguage = languagesdata ? languagesdata.find(languageItem => languageItem.code === user.languageToLearn) : null;
        setStudiedLanguage(updatedStudiedLanguage)
    }, [languagesdata, user.languageToLearn]);

    return (
        <Card>
            <InputCustom label={'Native language'} value={nativeLanguage} setValue={setNativeLanguage}/>
            <DropdownCustom
                label={'Studied language'}
                placeholder={""}
                list={languagesdata}
                selectedValue={studiedLanguage}
                setSelectedValue={setStudiedLanguage}
            />
            <ButtonCustom onClick={() => handleSave(nativeLanguage, studiedLanguage)} isLoading={isLoading}>Save</ButtonCustom>
            <CreateLanguageButton />
        </Card>
    );
};
