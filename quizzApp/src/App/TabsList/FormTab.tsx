import React from "react";
import {Switch} from "react-router-dom";
import {Route} from "react-router";
import {QuizzCardForm} from "../../pages/quizzCardForm/QuizzCardForm";

interface Props {

}

export const FormTab: React.FC<Props> = (props) => {


    return (
        <div className={'Component_FormTab'}>
            <Switch>
                <Route path="/app-content"
                       render={() => <QuizzCardForm/>}
                       exact={true}/>
            </Switch>
        </div>
    );
}
