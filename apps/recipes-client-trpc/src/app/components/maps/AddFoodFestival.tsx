// import { gql, useMutation } from '@apollo/client';
// import { newFestivalAtom, userAtom } from '../../utils/atoms';
// import { useAtom } from 'jotai';
// import { useEffect } from 'react';

// const AddFoodFestival = () => {
//   const [newFestival, setNewFestival] = useAtom(newFestivalAtom);
//   const [user] = useAtom(userAtom);

// const ADD_FESTIVAL = gql`
// mutation MyMutation($input: CreateFestivalInput!) {
//   createFestival(input: $input) {
//     festival {
//       festivalCreatorEmail
//       festivalCreatorImage
//       festivalCreatorName
//       festivalDateTime
//       festivalDescription
//       festivalId
//       festivalImage
//       festivalLocation
//       festivalName
//     }
//   }
// }
// `

// const [addFestival, { error, data }] = useMutation(ADD_FESTIVAL)

//   const addCrator = () => {
//     setNewFestival({
//       ...newFestival,
//       festivalCreatorName: user.user_name,
//       festivalCreatorEmail: user.email,
//     });
//   };
//   useEffect(()=>{
//     addCrator();
// },[])

//   const send = () => {
//     console.log(newFestival);
//     console.log(typeof newFestival.festivalDateTime);
    
//     addFestival({ variables: { input: {festival:newFestival} } });
//   };
// useEffect(()=>{
//     if(data) console.log(data);
//     if(error) console.log(error);
    
// },[data, error])

//   return (
//     <div>
//       {/* <input
//         placeholder="שם הפסטיבל"
//         type='text'
//         onChange={(e) =>
//           setNewFestival({ ...newFestival, festivalName: e.target.value })
//         }
//       /> */}
//       {/* <textarea
//         placeholder="פרטים"
//         onChange={(e) =>
//           setNewFestival({
//             ...newFestival,
//             festivalDescription: e.target.value,
//           })
//         }
//       /> */}
//       {/* <input
//         placeholder="תאריך ושעה"
//         type='datetime-local'
//         onChange={(e) =>
//      {      const dateAndTimeValue = e.target.value;
//         const parsedDateAndTime = new Date(dateAndTimeValue);
//         const formattedDateAndTime = parsedDateAndTime.toISOString();
//         setNewFestival({ ...newFestival, festivalDateTime: new Date(formattedDateAndTime) });}
//         }
//       /> */}
//       {/* <input
//         placeholder="תמונה"
//         type='text'
//         onChange={(e) =>
//           setNewFestival({ ...newFestival, festivalImage: e.target.value })
//         }
//       /> */}
//       {/* <button onClick={send}>שלח</button> */}
//     </div>
//   );
// };
// export default AddFoodFestival;
