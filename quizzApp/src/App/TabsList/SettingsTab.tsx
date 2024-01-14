import React from "react";

import {Settings} from "../../pages/settings/Settings";

interface Props {

}

export const SettingsTab: React.FC<Props> = (props) => {

    return (
        <div>
            <Settings />
        </div>
    );
}
