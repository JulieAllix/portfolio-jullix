import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router";
import styled from "styled-components";
import {ThemeProvider} from "styled-components";
import {ToastContainer} from "react-toastify";
import {Helmet} from "react-helmet";

import {PictogramCustom} from "@Components/PictogramCustom";
import {SignIn} from "@Pages/signIn/SignIn";
import {TabsList} from "./App/TabsList";

import useTheme from "./hooks/useTheme";
import background from "./assets/images/background_1.png";
import {State} from "@Utils/redux/store";
import "./App.scss";
import {SignUp} from "@Pages/signUp/SignUp";

export function App() {
    const theme = useTheme();
    const user = useSelector((state: State) => state.user);

    window.addEventListener("scroll", (e) => {
        e.preventDefault();
        //window.scrollTo(0, 0);
    });
    const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', appHeight)
    appHeight();

    const themeHelmet = (
        <Helmet>
            <style>
                {`:root {
                --m-primary:#f53557;
                --m-primary_light:#FA6781;
                --m-primary_lighter:#FF7A92;
                --m-grey_bg:#EAEFF0;
                --m-grey_dark:#C4C4C4;
                --m-grey_light:#FAFAFA;
                }`}
            </style>
        </Helmet>
    );

    const UnAuthRoute = (Component: any) => {
        return (props: any) => {
            if (user !== null) {
                return <Redirect to={"/app-content"}/>
            } else {
                return <Component {...props} />;
            }
        }
    };

    const AuthRoute = (Component: any) => {
        return (props: any) => {
            if (user === null) {
                return <Redirect to={"/sign-in"}/>;
            } else {
                return <Component {...props} />;
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <AppWrapper>
                <ToastContainer/>
                {themeHelmet}
                <AppStyle backgroundImage={background}>
                    <AppLogoWrapper>
                        <PictogramCustom name={'Brain'} width={'40px'} />
                    </AppLogoWrapper>

                    <Switch>
                        <Route path="/sign-up" render={UnAuthRoute(SignUp)} exact={true}/>
                        <Route path="/sign-in" render={UnAuthRoute(SignIn)} exact={true}/>
                        <Route path="/app-content" render={AuthRoute(TabsList)} exact={true}/>

                        <Route path="/" exact={true} render={(props) => {
                            if (user === null) {
                                return <Redirect to="/sign-in"/>
                            } else {
                                return <Redirect to="/app-content"/>
                            }
                        }}/>
                    </Switch>


                </AppStyle>
            </AppWrapper>
        </ThemeProvider>
    );
}

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const AppStyle = styled.div<{backgroundImage: any}>`
  height: var(--app-height);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 110% 100%;
  background-image: ${props => `url(${props.backgroundImage})`};
  max-width: 600px;
  width: 100%;
  position: relative;
`;

const AppLogoWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;
