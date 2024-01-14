import React from "react";

import {Quizz} from "../../pages/quizz/Quizz";

interface Props {

}

export const QuizzTab: React.FC<Props> = (props) => {

    return (
        <div>
            <Quizz />
        </div>
    );
}
