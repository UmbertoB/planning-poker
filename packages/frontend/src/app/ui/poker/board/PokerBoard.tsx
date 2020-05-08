import React, { FC } from 'react';
// ui
import {
    Board,
    PokerCardsWrapper,
} from 'app/ui/poker/board/PokerBoardStyles';
import PokerCard from 'app/ui/common/PokerCard';
// utils
import { PlayerCard } from '@planning-poker/shared';

interface PokerBoardProps {
    cardValuesSelected: PlayerCard[]
    pokerStatus: any
}

const PokerBoard: FC<PokerBoardProps> = ({
    cardValuesSelected,
    pokerStatus,
}) => (
        <Board>
            <PokerCardsWrapper>
                {cardValuesSelected.map((playerCard) => (
                    <PokerCard
                      key={playerCard.cardValue}
                      playerName={playerCard.playerName}
                      cardValue={playerCard.cardValue}
                      showFront={pokerStatus.planningPokerFinished}
                      canSelect={false}
                    />
                ))}
            </PokerCardsWrapper>
        </Board>
    );

export default PokerBoard;
