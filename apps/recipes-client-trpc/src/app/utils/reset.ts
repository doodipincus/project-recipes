import { User } from "./atoms"

export const resetRegister = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export const resetSignIn = { email: '', password: '' }


export const resetUser: Partial<User> = {}