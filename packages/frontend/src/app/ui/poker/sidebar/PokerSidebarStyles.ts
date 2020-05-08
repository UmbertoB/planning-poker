import styled from 'styled-components';
import { primaryColor } from 'app/utils/styled-components.utils';

export const Sidebar = styled.div`
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  background: ${primaryColor};
  -webkit-box-shadow: 0px 2px 13px 1px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 2px 13px 1px rgba(0,0,0,0.75);
  box-shadow: 0px 2px 13px 1px rgba(0,0,0,0.75);

  ul>li {
    color: white;
  }

`;

export const PokerRoomHeader = styled.h1`
    text-align: center;
    font-weight: 700;
    margin: 0 0 15px 0;
    font-size: 25px;
    padding: 5px;
    word-break: break-all;
    color: white;
`;

export const PokerRoomPlayer = styled.h3`
    text-align: center;
    font-weight: 300;
    margin: 0 0 15px 0;
    font-size: 20px;
    padding: 5px;
    word-break: break-all;
    color: white;
`;

export const PokerRoomPlayers = styled.ul`
    background: #0047b1;
    font-weight: 300;
    font-size: 15px;
    padding: 5px;
    text-align: center;
    word-break: break-all;
    color: white;

    &:last-child {
      border: none;
    }

    li {
      border-bottom: 1px solid gray;
      list-style: none;
      padding: 15px;
    }

    .room-total-players {
      border: none;
      font-weight: 400;
      margin-top: 5px;
    }

`;

export const LeaveButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  width: auto;

  img {
    width: 25%;
  }

`;

export const AdminIcon = styled.img`
    width: 15px;
    transform: translate(2px, 2px);
`;
