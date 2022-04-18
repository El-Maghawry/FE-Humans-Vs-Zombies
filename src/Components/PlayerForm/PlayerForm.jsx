// import React, { useState, useEffect } from 'react'

// const PlayerForm = () => {

//   const playerFormTitle = () => {

//     const [isHuman, setIsHuman] = useState();
//     const [isZombie, setIsZombie] = useState();
//     // const navigate = useNavigate();
//     const { id } = useParams();

//   const saveOrUpdatePlayer = (e) => {
//     e.preventDefault();
    
//     const employee = { isHuman, isZombie };

//   }

//   useEffect(() => {
//     // fill with information of existing player
//     setIsHuman(true);
//     setIsZombie(false);
//   }, [])

//   const playerFormTitle = () => {

//     if(id) { 
//       return <h2 className='text-center'>Update Player</h2>; 
//     } else {
//       return <h2 className='text-center'>Create Player</h2>;
//     }
//   }

//   return (
//     <div>
//       <div className='card col-6 offset-md-3 mt-4'>
//         {
//           playerFormTitle()
//         }
//         <form>
//           <div class="dropdown">
//             <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//               select ...
//             </button>
//             <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//               <a class="dropdown-item" href="#">Human</a>
//               <a class="dropdown-item" href="#">Zombie</a>
//             </div>
//           </div>

//           <button className='btn btn-success m-1' onClick={(e) => saveOrUpdatePlayer(e)}>Submit</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default PlayerForm