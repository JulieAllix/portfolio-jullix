import React from "react";

import "./App.scss";

import {ToastContainer} from "react-toastify";

export function App() {

    /**
     * TODO :
     * - Change package.json prod script to match type of project
     * - change themes in frontend/utils/prime-theme/_variables.scss
     * - add fonts in frontend/utils/prime-theme/_fonts.scss
     */

    return (
        <>
            <ToastContainer/>
            <div id="main">
                test
            </div>
        </>
    );
}
