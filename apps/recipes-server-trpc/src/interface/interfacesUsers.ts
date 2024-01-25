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

export interface SignInInput {
    email: string;
    password: string;
}


export interface UserAttributes {
    email: string;
    password: string;
    user_name: string;
    isAdmin: boolean;
    reviews: number;
    shared: number
    user_id: string;
}

interface UserInstance {
    createdAt?: Date;
    updatedAt?: Date;
}


export interface UserBack extends UserInstance, UserAttributes { }