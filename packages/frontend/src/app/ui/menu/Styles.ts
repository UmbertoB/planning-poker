import styled from 'styled-components';
import { device } from 'app/utils/styled-components.utils';

export const MenuWrapper = styled.div`
    margin: 5em auto;
    width: 45%;

    @media ${device.desktop} {
        width: 50%;
    }

    @media ${device.laptopL} {
        width: 70%;
    }

    @media ${device.laptop} {
        width: 75%;
    }

    @media ${device.tablet} {
        margin: 2.5em auto;
        width: 80%;
    }

    @media ${device.mobileL} {
        width: 82.5%;
    }

    @media ${device.mobileM} {
        width: 85%;
    }

    @media ${device.mobileS} {
        width: 90%;
    }

`;

export const MenuPanel = styled.div`
    border-radius: 15px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24);
    background: white;
    padding: 20px;
`;

export const PlanningPokerHeader = styled.h1`
    text-align: center;
    font-weight: 300;
    margin: 0;

    span {
        font-family: 'Lobster', cursive;
    }

`;

export const MenuOptionsWrapper = styled.div`
    margin-top: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 0;
    min-width: 0;

    h2, h3, input, button {
        margin: 7.5px;
    }

    h3 {
        font-weight: 300;
    }

    @media ${device.tablet} {
        grid-template-columns: 1fr;
    }

    @media ${device.mobileM} {
        h2 {
            font-size: 20px;
        }

        h3 {
            font-size: 15px;
        }
    }
    
`;

export const JoinRoomMenu = styled.div`
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 15px;
    border-right: #EEEEEA solid .5px;
    overflow: hidden;
    min-width: 0;

    span {
        font-family: 'Lobster', cursive;
    }

    @media ${device.tablet} {
        border-right: none;
        border-bottom: #EEEEEA solid .5px;
    }

`;

export const CreateRoomMenu = styled.div`
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 15px;
    border-left: #EEEEEA solid .5px;
    overflow: hidden; 
    min-width: 0;

    span {
        font-family: 'Lobster', cursive;
    }

    @media ${device.tablet} {
        border-left: none;
        border-top: #EEEEEA solid .5px;
    }

`;
