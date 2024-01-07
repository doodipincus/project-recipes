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

export interface Recipes {
    recipe_id: string;
    title: string;
    category: string;
    sensitivity: string;
    creator: string;
    rating: number;
    country_of_origin: string;
    difficulty: string;
    image: string;
    ingredients: string[];
    instructions: string;
    preparation_time: string;
  }