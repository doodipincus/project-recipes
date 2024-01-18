export interface Register {
    user_name: string;
    email: string;
    password: string;
}

export interface Update {
    user_name?: string;
    email?: string;
    password?: string;
}

export interface SignInInput{
    email: string;
    password: string;
}