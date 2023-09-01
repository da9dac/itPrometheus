import React from 'react';
import { PageContainer } from '../../atoms/layouts/PageContainer';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import Login from '../../components/loginPageItems/Login';
import tokens from '../../styles/tokens.json'

const globalTokens = tokens.global;

export const LoginPageContainer = styled(PageContainer)`
    width: 100vw;
    height: 700px;
    padding: ${globalTokens.Spacing40.value}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const LoginPage = () => {
    const isDark = useSelector(state=>state.uiSetting.isDark);

    return (
        <LoginPageContainer isDark={isDark}>
            <Login/>
        </LoginPageContainer>
    );
};

export default LoginPage;