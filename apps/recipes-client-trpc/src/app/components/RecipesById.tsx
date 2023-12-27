import { trpc } from '../utils/trpc';
import { useParams } from 'react-router-dom';


export default function RecipesById() {
    const { id } = useParams()
    if (id) {
        console.log(id);

        const recipe = trpc.recipeById.useQuery(id);
        console.log('recipe', recipe.data);
        const f = recipe.data && recipe.data[0] ? recipe.data[0].title : 'boom'
        // return <div>{recipe.data && recipe.data[0]}</div>;
        return <div>{f}</div>
    }
    return <div>not id</div>
}