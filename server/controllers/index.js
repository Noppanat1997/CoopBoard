import services from '../services';

const controllers = {};
//NOTE
controllers.addBoard = async (req, res, next) => {
  try {
    const data = await services.addBoardData();
    // const user_result = await testSevice.listAllUser();
    
    res.status(200).send(data)
    // res.status(200).send({ message: user_result });
  } catch (error) {
    throw error;
  }
};

// login (user, pass) => {
//   find_user = service-getuser(user);

//   if finduer.data().lenght>0{
//     asdkldas return res.200
//   } else {
//     res.500
//   }

//   return aa;
// }

export default controllers;
