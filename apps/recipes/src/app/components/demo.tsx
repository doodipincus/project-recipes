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

    // const GET_PRODUCTS_FROM_CART = gql`
    //     query MyQuery {
    //         recipeByRecipeId(recipeId: "eadaa6d4-0f1b-4ca9-9fbf-fa098daa16f6") {
    //             title
    //             creator
    //         }
    //     }

    // `;

    // const GET_PRODUCTS_FROM_CART = gql`
    //     query allRecipes {
    //         edges {
    //         node {
    //             title
    //         }
    //     }
    // }
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

    const { error, data, refetch } = useQuery(GET_PRODUCTS_FROM_CART);
    if(data && data.allRecipes && data.allRecipes.nodes) console.log(data.allRecipes.nodes[0].title);

    return (
        <>Demo component</>
    )
}

export default Demo