import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
// ui
import PokerSidebar from 'app/ui/poker/sidebar/PokerSidebar';
import PokerController from 'app/ui/poker/controller/PokerController';
import PokerBoard from 'app/ui/poker/board/PokerBoard';
import { PokerWrapper } from 'app/ui/poker/Styles';
// redux
import { ApplicationState } from 'app/redux/rootReducer';
import * as WebSocketActions from 'app/redux/webSocket/actions';

const mapState = (state: ApplicationState) => ({
  loggedPlayer: state.webSocket.loggedPlayer,
  room: state.webSocket.room,
  poker: state.poker,
  isConnectedToRoom: state.webSocket.isConnectedToRoom,
});
const mapDispatch = {
  leaveRoomRequest: WebSocketActions.leaveRoomRequest,
};
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PokerProps = PropsFromRedux & RouteComponentProps<{ room: string }>;

class Poker extends Component<PokerProps> {

  // LIFECYCLE functions
  componentDidMount() {
    window.addEventListener('beforeunload', this.leaveRoom);
    const { isConnectedToRoom, history } = this.props;
    if (!isConnectedToRoom) {
      history.push('/');
    }
  }

  componentWillUnmount() {
    // @ERROR.1
    window.removeEventListener('beforeunload', this.leaveRoom);
    this.leaveRoom();
  }

  // SIDEBAR functions
  leaveRoom = () => {
    const { leaveRoomRequest, room } = this.props;
    leaveRoomRequest({ room: room.name });
  }

  render() {

    const { loggedPlayer, room, poker } = this.props;

    const POKER_STATUS = {
      waitingForMinimumPlayersNumber: room.players.length <= 1,
      pokerInProgress: room.pokerInProgress,
      waitingForTask: room.pokerInProgress && !poker.currentTaskDescription,
      waitingForLoggedPlayerToSelectCard: room.pokerInProgress && poker.currentTaskDescription && !poker.cardValueSelected,
      planningPokerFinished: room.pokerInProgress && poker.cardValuesSelected.length >= room.players.length,
    };

    return (
      <>

        <PokerSidebar
          loggedPlayer={loggedPlayer}
          room={room}
          leaveRoomFn={this.leaveRoom}
        />

        <PokerWrapper>


          <PokerController
            pokerStatus={POKER_STATUS}
          />

          <PokerBoard
            cardValuesSelected={poker.cardValuesSelected}
            pokerStatus={POKER_STATUS}
          />

        </PokerWrapper>

      </>
    );

  }

}

export default connector(Poker);
