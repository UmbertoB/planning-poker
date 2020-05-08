import React from 'react';
import { render } from '@testing-library/react';
import PokerSidebar from 'app/ui/poker/sidebar/PokerSidebar';
import { PokerPlayer, Room } from '@planning-poker/shared';

test('Render logged player name', async () => {

    const loggedPlayer: PokerPlayer = { id: '1jskirfb', isAdmin: false, name: 'Lorem' };
    const room: Room = {
        id: 'aopmfodsmf',
        name: 'Ipsum',
        pokerInProgress: false,
        players: [
            { id: '1jskirfb', isAdmin: false, name: 'Lorem' },
            { id: '2493ufn', isAdmin: true, name: 'Dolor' },
        ],
    };

    const PokerSidebarRendered = render(<PokerSidebar loggedPlayer={loggedPlayer} room={room} leaveRoomFn={() => 1} />);


    expect(await PokerSidebarRendered.findByText('Lorem'));

});
