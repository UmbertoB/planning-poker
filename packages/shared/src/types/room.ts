export interface Room {
    id: string
    name: string
    players: PokerPlayer[]
    pokerInProgress: boolean
}


export interface PokerPlayer {
    id: string
    name: string
    isAdmin: boolean
}
