import { atom } from 'jotai'
import { Recipes } from '../components/interfaces/recipes'

export const registerAtom = atom({user_name: '', email: '', password: '', confirm_password: ''})

export const signInAtom = atom({email: '', password: ''})

export const allRecipesAtom = atom<Recipes[]>([])

export const modalIsOpenAtom = atom(false)

export const userIsLoggedInAtom = atom(false)