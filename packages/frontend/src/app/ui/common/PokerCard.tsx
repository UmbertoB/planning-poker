import React, { FC } from 'react';
import styled from 'styled-components';
import PokerCardImage from 'assets/poker-card.jpg';

interface CardContainerProps {
    canSelect: boolean
}

const CardContainer = styled.div<CardContainerProps>`
    width: 150px;
    height: 250px;
    perspective: 1000px;
    transform-style: preserve-3d;
    margin: 5px;
    cursor: ${(props) => (props.canSelect ? 'pointer' : 'initial')};
    transition: transform .35s;

    &:hover {
        transform: ${(props) => (props.canSelect ? 'translateY(15px)' : 'none')}
    }

    .flipcard .front img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24);
    }

    .flipcard{
        position: relative;
        height: 100%;
        width: 100%;
        position: relative;
        transition: .5s;
        transform-style: preserve-3d;
    }
    .back, .front {
        width: 100%;
        height: 100%;
    }

    .flipcard .front{
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        transition: .8s;
        transform-style: preserve-3d;
        z-index: 100;
        border-radius: 8px;
    }
    .flipcard .back{
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        transition: .8s;
        transform-style: preserve-3d;
        z-index: 99;
        border-radius: 8px;
        background: #f5f3e4;
        transform: rotateY(180deg);
        text-align: center;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24);
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        flex-direction: column;
    }

    &:hover .front{
        transform: rotateY(-180deg);
    }
    &:hover .back{
        transform: rotateY(0deg);
    }
    .back h2 {
        font-weight: 300;
    }

    .back h4 {
        margin: 0;
        padding: 0;
        font-size: 110px;
        text-transform: uppercase;
    }
`;

interface PokerCardProps {
    cardValue: number
    showFront: boolean
    canSelect: boolean

    playerName?: string
    onClick?(): void
}

const PokerCard: FC<PokerCardProps> = ({
    playerName,
    cardValue,
    showFront,
    onClick,
    canSelect,
}) => (
    <CardContainer canSelect={canSelect} onClick={canSelect ? onClick : () => 0}>
        <div className="flipcard">
            <div className="front" style={{ transform: showFront ? 'rotateY(-180deg)' : 'rotateY(0deg)' }}>
                <img src={PokerCardImage} alt="card" />
            </div>
            <div className="back" style={{ transform: !showFront ? 'rotateY(-180deg)' : 'rotateY(0deg)' }}>
                <h2>{playerName}</h2>
                <h4>{cardValue}</h4>
            </div>
        </div>
    </CardContainer>
);

export default PokerCard;
