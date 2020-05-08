import React, { FC } from 'react';
// ui
import {
  PokerRoomHeader,
  PokerRoomPlayer,
  LeaveButton,
  PokerRoomPlayers,
  AdminIcon,
  Sidebar,
} from 'app/ui/poker/sidebar/PokerSidebarStyles';
// types
import {
  PokerPlayer,
  Room,
} from '@planning-poker/shared';
// assets
import LeftArrow from 'assets/left-arrow.svg';
import PlayerAdmin from 'assets/player-admin.svg';

interface PokerSidebarProps {
  loggedPlayer: PokerPlayer
  room: Room
  leaveRoomFn(): void
}

const PokerSidebar: FC<PokerSidebarProps> = ({ loggedPlayer, room, leaveRoomFn }) => (
    <Sidebar>
        <PokerRoomHeader>
        <LeaveButton onClick={leaveRoomFn}>
            <img src={LeftArrow} alt="left-arrow" />
        </LeaveButton>
        {room.name}
        </PokerRoomHeader>
        <PokerRoomPlayer>
        {loggedPlayer.name} {loggedPlayer.isAdmin && <AdminIcon src={PlayerAdmin} alt="admin-loggedPlayer" />}
        </PokerRoomPlayer>
        <PokerRoomPlayers>
        {room.players.filter((m) => m.id !== loggedPlayer.id).map((player: PokerPlayer) => (
            <li key={player.id}>
              {player.name}
              {player.isAdmin && <AdminIcon src={PlayerAdmin} alt="admin-loggedPlayer" />}
            </li>
        ))}
        <li className="room-total-players">
            {
                room.players.length > 1
                    ? `${room.players.length} players`
                    : 'Empty Room'
            }
        </li>
        </PokerRoomPlayers>
    </Sidebar>
);


export default PokerSidebar;
