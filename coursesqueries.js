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

const getCourses = async (request, response) =>{
    try{
        result = await pool.query("SELECT * FROM courses order by courseid")
        //console.log(result)
        if(result.rowCount === 0){
            return response.status(200).send("No Courses available")
        }
        response.status(200).send(result.rows)
    }catch(e){
        response.status(400).send("Invalid Request") 
    }
}

const addCourse = async (request, response) =>{
    const {coursetitle,courseimage,coursetext} = request.body.params
    console.log(request.body.params, coursetitle,courseimage,coursetext)

    
    try{
        result = await pool.query("INSERT INTO courses (coursetitle,courseimage,coursetext) VALUES ($1, $2, $3)", [coursetitle,courseimage,coursetext])
        response.status(200).send("Course Inserted")
    }catch(e){
        response.status(400).send("Course Invalid") 
    }

}

const getSessions = async (request, response) =>{
    const id = parseInt(request.params.id)
    console.log(request.params, id)
    try{
        result = await pool.query("SELECT * FROM sessionlist WHERE courseid= $1 order by sessionid", [id])
        if(result.rowcount === 0){
            return response.status(200).send("No Sessions available")
        }
        response.status(200).send(result.rows)
    }catch(e){
        response.status(400).send("Invalid Request") 
    }
}
const updateCourse = async (request, response) => {
    const courseid = parseInt(request.params.selectcourse)
    console.log(request.params, courseid)
    const userid = await getAuth(request)
   
    const {coursetitle, coursetext, courseimage} = request.body.params
    console.log(request.body.params, coursetitle, coursetext, courseimage)
    
    if(userid === 0){
       return response.status(200).send("Invalid User")
    }
    try{
      result = await pool.query('UPDATE courses SET coursetitle = $1, coursetext = $2, courseimage = $3 WHERE courseid = $4', [coursetitle, coursetext, courseimage, courseid])
      response.status(200).send('Record Updated')
    }catch(e){
      response.status(400).send('Recorde not updated')
    } 
  }
  const delCourse = async (request,response) => {
    const courseid = parseInt(request.params.selectcourse)
    console.log(request.params, courseid)
    const userid = await getAuth(request)
    if(userid === 0){
      return response.status(200).send("Invalid User")
    }
    try{
      result = await pool.query('DELETE FROM courses WHERE courseid = $1', [courseid])
      response.status(200).send("Course Deleted")
    }catch(e){
      response.status(400).send("Something went wrong")
    }
  }
module.exports = {
    getCourses,
    addCourse,
    getSessions,
    updateCourse, 
    delCourse
}