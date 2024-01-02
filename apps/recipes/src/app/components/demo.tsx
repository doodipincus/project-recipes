import { gql, useMutation, useQuery } from "@apollo/client";

const Demo = () => {

    // const GET_PRODUCTS_FROM_CART = gql`
    //     query MyQuery {
    //         allRecipes {
    //             edges {
    //                 node {
    //                     title
    //                 }
    //             }
    //         }
    //     }
    // `;

    const GET_PRODUCTS_FROM_CART = gql`
    query MyQuery {
        allRecipes {
            nodes {
                title
            }
        }
    }
`;
    // const GET_PRODUCTS_FROM_CART = gql`
    //     query MyQuery {
    //         recipeByRecipeId(recipeId: "eadaa6d4-0f1b-4ca9-9fbf-fa098daa16f6") {
    //             title
    //             creator
    //         }
    //     }

    // `;




    const { data } = useQuery(GET_PRODUCTS_FROM_CART);

    const funcShow = (data: any) => {
        console.log(data);

        const x = data.allRecipes.nodes.map((r:any) => {
            return <p className="bg-indigo-500 p-2 font-mono">{r.title}</p>
        })
        return x
    }
    console.log(data);

    return (
        <>
            <>Demo component</>
            {data && data.allRecipes && data.allRecipes.nodes && funcShow(data)}
        </>
    )
}

export default Demo