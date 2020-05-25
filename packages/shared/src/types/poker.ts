export interface PokerSession {
    roomId: string
    pokerInProgress: boolean
    currentTaskDescription: string
    cardValueSelected: boolean
    cardValuesSelected: PlayerCard[]
    playerDeck: number[]
}

export interface PlayerCard {
    playerName: string
    cardValue: number
}
