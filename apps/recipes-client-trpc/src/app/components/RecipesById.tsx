import { trpc } from '../utils/trpc';
import { useParams } from 'react-router-dom';


export default function RecipesById() {
    const { id } = useParams()
    if (id) {
        console.log(id);

        const recipeById = trpc.recipeById.useQuery(id);
        console.log('recipe', recipeById.data);
        const recipe = recipeById.data && recipeById.data[0] ? recipeById.data[0].title : 'boom'
        // return <div>{recipe.data && recipe.data[0]}</div>;
        return <div>{recipe}</div>
    }
    return <div>not id</div>
}