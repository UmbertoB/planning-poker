import React, { FC, useState, ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
// redux
import * as WebSocketActions from 'app/redux/webSocket/actions';
import * as PokerActions from 'app/redux/poker/actions';
import { ApplicationState } from 'app/redux/rootReducer';
// ui
import {
    AdminSettings,
    PlayerSettings,
    Controller,
} from 'app/ui/poker/controller/PokerControllerStyles';
import { StyledInput } from 'app/ui/common/Input';
import WaitingIcon from 'app/ui/common/WaitingIcon';
import { RoundedButton, DefaultButton } from 'app/ui/common/Button';
import PokerCard from 'app/ui/common/PokerCard';

const mapState = (state: ApplicationState) => ({
    poker: state.poker,
    roomName: state.webSocket.room.name,
    playerName: state.webSocket.loggedPlayer.name,
    isPlayerAdmin: state.webSocket.loggedPlayer.isAdmin,
});
const mapDispatch = {
    startPokerRequest: WebSocketActions.startPokerRequest,
    setTaskDescriptionRequest: PokerActions.setTaskDescriptionRequest,
    restartPokerRequest: PokerActions.restartPokerRequest,
    selectCardValueRequest: PokerActions.selectCardValueRequest,
};
const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;
interface OwnProps {
    pokerStatus: any
}
type PokerControllerProps = OwnProps & ReduxProps;

const PokerController: FC<PokerControllerProps> = ({
    pokerStatus,

    poker,
    roomName,
    playerName,
    isPlayerAdmin,

    startPokerRequest,
    restartPokerRequest,
    selectCardValueRequest,
    setTaskDescriptionRequest,
}) => {

    const [taskDescriptionInput, setTaskDescriptionInput] = useState('');

    const onChangeTaskDescription = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value } = target;
        setTaskDescriptionInput(value);
    };

    const restartPoker = () => {
        setTaskDescriptionInput('');
        restartPokerRequest(roomName);
    };

    return (
        <Controller>

            {isPlayerAdmin && (
                <AdminSettings>

                    {!pokerStatus.pokerInProgress && (
                        <RoundedButton disabled={pokerStatus.waitingForMinimumPlayersNumber} onClick={() => startPokerRequest({ roomName })}>
                            Start Poker
                        </RoundedButton>
                    )}

                    {pokerStatus.planningPokerFinished && (
                        <RoundedButton disabled={pokerStatus.waitingForMinimumPlayersNumber} onClick={restartPoker}>
                            Restart Poker
                        </RoundedButton>
                    )}

                    {(pokerStatus.waitingForMinimumPlayersNumber) && <h2>The room must have more than 1 player to start Poker</h2>}

                    {(pokerStatus.pokerInProgress && pokerStatus.waitingForTask) && (
                        <>
                            <StyledInput placeholder="Task name" value={taskDescriptionInput} onChange={onChangeTaskDescription} />
                            <DefaultButton onClick={() => setTaskDescriptionRequest({ taskDescription: taskDescriptionInput, roomName })}>
                                Set
                            </DefaultButton>
                        </>
                    )}

                </AdminSettings>
            )}

            {!isPlayerAdmin && (
                <PlayerSettings>

                    {(!pokerStatus.pokerInProgress) && (
                        <>
                            <WaitingIcon color="#000" />
                            <h2>Waiting Administrator to Start Poker</h2>
                        </>
                    )}


                    {(pokerStatus.pokerInProgress && pokerStatus.waitingForTask) && (
                        <>
                            <WaitingIcon color="#000" />
                            <h2>Waiting Administrator set Task</h2>
                        </>
                    )}

                </PlayerSettings>
            )}

            <h2>{poker.currentTaskDescription}</h2>
            {pokerStatus.waitingForLoggedPlayerToSelectCard && <h3>Select the card point for this task</h3>}
            <div className="player-cards">
                {poker.playerDeck.map((v) => (
                    <PokerCard
                      key={v}
                      cardValue={v}
                      showFront={pokerStatus.waitingForLoggedPlayerToSelectCard}
                      canSelect={pokerStatus.waitingForLoggedPlayerToSelectCard}
                      onClick={() => selectCardValueRequest({ roomName, playerName, cardValue: v })}
                    />
                ))}
            </div>

        </Controller>
    );
};

export default connector(PokerController);
