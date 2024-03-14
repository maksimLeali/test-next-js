import { atom } from 'jotai'
type User = 'x' | 'o'
export const victory = atom<User | 'tie' | undefined>(undefined)

export const player = atom<User>('x')