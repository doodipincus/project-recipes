export interface Users {
    email: string;
    password: string;
    user_id: string;
    user_name: string;
    isAdmin: boolean;
    likes: number;
    shared: number;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
}