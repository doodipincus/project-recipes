import { useNavigate } from "react-router-dom"

const Home = () =>{
const navigate = useNavigate()
const id = 'eadaa6d4-0f1b-4ca9-9fbf-fa098daa16f6'
return(
    <>
    <button onClick={()=> navigate('/recipes')}>All Recipes</button>
    <button onClick={()=> navigate(`/recipe/${id}`)}>Recipe by id</button>
    </>
)
}

export default Home