//Get all user list
const dbconnection = require('../database/dbconnection');

const getusers = async (req , res)=>{
 try {
    const data = await dbconnection.query("SELECT* FROM users WHERE")
    if (!data){   
        res.status(404).send('No user found');
    }  
    res.status(200).send({data,
          message :"all student record",
          Totalusers: data[0].length,
    });
 } catch (error) {
    console.log(error);
    res.status(500).send('Error in Get users Api', error);
 }

}

// Get user by id

const getuserbyid = async (req, res) => {
 try {
    const { id } = req.params;
    const data = await dbconnection.query("SELECT * FROM users WHERE id=?", [id]);
    if (!data[0][0]){
        res.status(404).send('No user found with this id');
    }
    res.status(200).send({data: data[0][0], message: "User found by id"});
 } catch (error) {
    console.log(error);
    res.status(500).send('Error in Get user by id Api', error);
 }
}


module.exports = {getusers, getuserbyid}