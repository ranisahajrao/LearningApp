const Pool = require('pg').Pool
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Konvergelp',
    password: 'root',
    port : 5432
})

function getAuthToken(userid)
{
    return jwt.sign(userid, "KonvergeToken")
}

const getusers = async (request, response) =>{
    try{
        result = await pool.query("SELECT username, useremail, mobileno FROM userlogin")
        if(result.rowCount === 0){
            return response.status(200).send("No records")
        }
        //console.log("Coming here")
        response.status(200).send(result.rows)
    }catch(e){
        response.status(400).send("Invalid Request") 
    }
}

const getUserByID = async (request, response) =>{
    const id = parseInt(request.params.id)
    console.log(request.params, id)
    try{
        result = await pool.query("SELECT * FROM userlogin WHERE userid= $1", [id])
        if(result.rowCount === 0){
            return response.status(200).send("No records")
        }
        response.status(200).send(result.rows)
    }catch(e){
        response.status(400).send("Invalid Request") 
    }
}

const getLoginUser = async (request, response) =>{
    const {useremail, pwd} = request.body.params
    console.log(request.body.params, useremail, pwd)
    
    try{
        result = await pool.query("SELECT userid,hashpwd from userlogin WHERE useremail=$1", [useremail])
        const hashpwd = result.rows[0].hashpwd
        //console.log(result.rows[0].hashpwd)
        const isMatch = await bcrypt.compare(pwd, hashpwd)
        //console.log(isMatch)

        if(!isMatch){
            return response.status(200).send("Invalid Login")
        }

        //result = await pool.query('SELECT userid, username, mobileno FROM userlogin WHERE useremail=$1 AND pwd=$2', [useremail, pwd])
       /*  if(result.rowCount === 0){
            return response.status(200).send("Invalid Login")
        } */
        const token = getAuthToken({userid: result.rows[0].userid})
        response.status(200).send(token)
    }catch(e){
        response.status(400).send("Invalid Request") 
    }
}

const createUser = async (request, response) =>{
    const {useremail, username, mobileno, pwd} = request.body.params
    console.log(request.body.params, useremail,username,mobileno,pwd)

    const hashpwd = await bcrypt.hash(pwd, 8)
    console.log(hashpwd)
    
    try{
        result = await pool.query("INSERT INTO userlogin (username, useremail,hashpwd, mobileno) VALUES ($1, $2, $3, $4)", [username, useremail, hashpwd, mobileno])

        response.status(200).send("Record Insertted")
    }catch(e){
        response.status(400).send("Invalid Request") 
    }

}

const updateUser = async (request, response) =>{
    //const id = parseInt(request.params.id)
    //console.log(request.params, id)

    const userid = await getAuth(request)
    const {useremail, username, mobileno, pwd} = request.body.params
    console.log(request.body.params, useremail,username,mobileno,pwd, userid)

    const hashpwd = await bcrypt.hash(pwd, 8)
   
    if(userid === 0){
        
        return response.status(400).send("Invalid User")
    }

    try{
        result = await pool.query("UPDATE userlogin SET username=$1, useremail=$2, hashpwd=$3, mobileno=$4 WHERE userid=$5", [username, useremail, hashpwd, mobileno,userid])
        response.status(200).send("Record Updated")
    }catch(e){
        response.status(400).send("Record is not updated") 
    }
}

const deleteUser = async (request, response) =>{
    const id = parseInt(request.params.id)
    console.log(request.params, id)
    try{
        result = await pool.query("DELETE FROM userlogin WHERE userid=$1", [id])
        response.status(200).send("Record Deleted")
    }catch(e){
        response.status(400).send("Record is not deleted") 
    }
}

const getAuth = async (req) =>{
    const token = req.header('Authorization').replace('Bearer ','')
    console.log("Hi")
    const decode =jwt.verify(token, 'KonvergeToken')
    console.log(decode)

    try{
        result = await pool.query("SELECT * FROM userlogin where userid=$1", [decode.userid])
        if(result.rowCount === 0){
            return(0)
        }
        return decode.userid

    }catch(e){
        return(0)
    }
}


module.exports = {
    getusers,
    getUserByID,
    getLoginUser, 
    createUser,
    updateUser,
    deleteUser
}