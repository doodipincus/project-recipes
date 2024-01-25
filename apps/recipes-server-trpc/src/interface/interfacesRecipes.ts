export interface Recipes {
    recipe_id: string;
    title: string;
    category: string;
    image: string;
    creator_name: string;
    creator_email: string;
    sensitivity: string;
    country_of_origin: string;
    difficulty: string;
    ingredients: string[];
    instructions: string;
    preparation_time: string;
    num_reviews: number;
    rating: number;
  }

  export interface AddRecipes {
    title: string;
    category: string;
    image: string;
    creator_name: string;
    creator_email: string;
    sensitivity: string;
    country_of_origin: string;
    difficulty: string;
    ingredients: string[];
    instructions: string;
    preparation_time: string;
  }



  export interface RecipeAttributes {
    recipe_id: string;
    title: string;
    category: string;
    image: string;
    creator_name: string;
    creator_email:string
    sensitivity: string;
    country_of_origin: string;
    difficulty: string;
    ingredients: string[];
    instructions: string;
    preparation_time: string;
    num_reviews: number;
    rating: number;
  }
  
  interface RecipeInstance {
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  
  export interface RecipeBack extends RecipeInstance, RecipeAttributes { }