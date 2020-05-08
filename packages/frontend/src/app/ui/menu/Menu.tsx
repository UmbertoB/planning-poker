import React, { FC, useState, ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
// ui
import { DefaultButton as Button } from 'app/ui/common/Button';
import { StyledInput } from 'app/ui/common/Input';
import LoadingIcon from 'assets/loading-icon.svg';
import {
    MenuWrapper,
    MenuPanel,
    PlanningPokerHeader,
    MenuOptionsWrapper,
    JoinRoomMenu,
    CreateRoomMenu,
} from 'app/ui/menu/Styles';
// redux
import * as WebSocketActions from 'app/redux/webSocket/actions';
import { ApplicationState } from 'app/redux/rootReducer';
// utils
import { toast } from 'react-toastify';


const mapState = (state: ApplicationState) => ({
    joiningRoom: state.webSocket.joiningRoom,
    creatingRoom: state.webSocket.creatingRoom,
});

const mapDispatch = {
    joinRoomRequest: WebSocketActions.joinRoomRequest,
    createRoomRequest: WebSocketActions.createRoomRequest,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type MenuProps = PropsFromRedux;

const Menu: FC<MenuProps> = ({
    joiningRoom,
    creatingRoom,
    joinRoomRequest,
    createRoomRequest,
}) => {

    const [forms, setForm] = useState({
        joinRoomForm: { name: '', room: '' },
        createRoomForm: { playerAdminName: '', roomName: '' },
    });

    const onChange = (form: string, field: string) => ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value } = target;
        const formsCopy: any = forms;
        formsCopy[form][field] = value;
        setForm(formsCopy);
    };

    const onSubmitJoinRoomForm = () => {
        const { name, room } = forms.joinRoomForm;

        if (!name || !room) {
            toast.warn('Fill all form inputs');
            return;
        }

        joinRoomRequest({ name, room, isAdmin: false });
    };

    const onSubmitCreateRoomForm = () => {
        const { playerAdminName, roomName } = forms.createRoomForm;

        if (!playerAdminName || !roomName) {
            toast.warn('Fill all form inputs');
            return;
        }

        createRoomRequest({ playerAdminName, roomName });
    };

    return (
        <MenuWrapper>
            <MenuPanel>
                <PlanningPokerHeader>
                    Planning
                    <span> Poker</span>
                </PlanningPokerHeader>
                <MenuOptionsWrapper>
                    <JoinRoomMenu>
                        <h2>
                            Join
                            <span> Poker </span>
                            Room
                        </h2>
                        <h3>Set your name</h3>
                        <StyledInput
                          placeholder="Name"
                          onChange={onChange('joinRoomForm', 'name')}
                        />
                        <h3>Select Room</h3>
                        <StyledInput
                          placeholder="Room"
                          onChange={onChange('joinRoomForm', 'room')}
                        />
                        <Button type="submit" onClick={onSubmitJoinRoomForm}>
                            {(joiningRoom && !creatingRoom) ? <img src={LoadingIcon} alt="loading" /> : 'Poker'}
                        </Button>
                    </JoinRoomMenu>
                    <CreateRoomMenu>
                        <h2>
                            Create
                            <span> Poker </span>
                            Room
                        </h2>
                        <h3>Set your name</h3>
                        <StyledInput
                          placeholder="Name"
                          onChange={onChange('createRoomForm', 'playerAdminName')}
                        />
                        <h3>Choose New Room&apos;s Name</h3>
                        <StyledInput
                          placeholder="Room"
                          onChange={onChange('createRoomForm', 'roomName')}
                        />
                        <Button type="submit" onClick={onSubmitCreateRoomForm}>
                            {creatingRoom ? <img src={LoadingIcon} alt="loading" /> : 'Create Poker Room'}
                        </Button>
                    </CreateRoomMenu>
                </MenuOptionsWrapper>
            </MenuPanel>
        </MenuWrapper>
    );

};

export default connector(Menu);
