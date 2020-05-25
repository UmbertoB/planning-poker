export interface Room {
    id: string
    name: string
    players: PokerPlayer[]
}

export interface PokerPlayer {
    id: string
    name: string
    isAdmin: boolean
}
