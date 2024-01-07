import * as React from 'react';

import {ressourcesSVG} from "./PictogramCustom/index";
import styled from "styled-components";

type ressourcesSVGType = typeof ressourcesSVG;

interface Props {
    name: ressourcesSVGType;
    width: string;
    margin?: string;
}

export const PictogramCustom: React.FC<Props> = (props) => {

    let SVG = (ressourcesSVG)[props.name];

    return (
        <PictogramStyle style={props.margin ? {margin: `${props.margin}`, width: `${props.width}px`, height: `${props.width}px`} : {width: `${props.width}px`, height: `${props.width}px`}}>
            <SVG
                width={props.width}
                alt={`${props.name} icône`}
            />
        </PictogramStyle>
    );
};

const PictogramStyle = styled.div`
  display: flex;
  align-items: center;
`;
