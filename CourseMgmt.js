import React, {useState, useEffect} from 'react'
import {Grid, makeStyles, Paper, makeStyle} from '@material-ui/core'
import Controls from './Controls'
import { UserForms } from './UserForms'
import { Months, Role } from './DataService'
import axios from 'axios'


//Styling the Paper
const useStyle = makeStyles((theme) =>({
    mainClass: {
        margin:theme.spacing(5),
        height: theme.spacing(70),
        width:theme.spacing(50),
        alignment:'center',
        flexDirection:'column' ,
        
    }
    })
)

const initialValues = {
    courseTitle : '',
    courseImage : '',
    courseText : '',
    courseId:0,
    selectCourse:''
    
}


function CourseMgmt() {

    const classes = useStyle()
    const {values, setValues, handleInputChange, errors, setErrors, addValue} = UserForms(initialValues)
    // const[course, setCourse] = useState()
    const [courseList, setCourseList] = useState([])
    const [btnClick, setBtnClick] = useState('')
    const [btnSubmitClick, setBtnSubmitClick] = useState(false)

    
    useEffect(() =>{
        async function getCourse() {
            
            try{
                const response = await axios.get(`http://localhost:8081/getcourses`)
                setCourseList(response.data)
            }catch(e){
                alert("Unable to get the Courses")
            }
        }
        getCourse();
    },[btnSubmitClick])

    const addCourse = (e) =>{
        setBtnClick('Add')
        setValues({
            ...values,
            courseTitle : '',
            courseImage : '',
            courseText : ''

        })
    }

    const modifyCourse = (e) =>{
        e.preventDefault()
    }

    const deleteCourse = async (e) =>{
        e.preventDefault()
        try{
            //const response = await axios.delete(`http://192.168.0.185:8081/deletecourse/${}`)
            //console.log(response.data)
            
        }catch(e){
            alert("Unable to delete the Courses")
        }
    }

    const handleSubmitClick = async (event) => {
        event.preventDefault()
    
        if(btnClick === "Add"){
          // write insert query
          // write validate data function
          
          if(!validData()){
            return alert("Invalid Data")
          }
          try{
            const response = await axios.post(`http://localhost:8081/addcourse`,{
              params: {
                coursetitle: values.courseTitle,
                coursetext: values.courseText,
                courseimage: values.courseImage
              }
            })
            alert("Course Added")     
          }catch(e){
            alert("Unable to Add Course")  
          }  
        }
    }
    // const handleSelect = (e) =>{
    //     setCourse(e.target.value)
    //     //alert(course)
    //     //alert(e.target.value)
    //    // alert(course)
    //      courseList.map(carditem =>{
    //         if(Object.values(carditem)[0] === e.target.value){
    //             alert(Object.values(carditem)[1])
    //             alert(Object.values(carditem)[2])
    //             alert(Object.values(carditem)[3])
    //             return
    //         }
    //     }) 

    // }

    const validData = () =>{

        let temp = {}
        temp.courseTitle = values.courseTitle ? ""  :  "Course Name is required"
        temp.courseImage  = values.courseImage  ? ""  :  "Course Image is required"
        temp.courseText = values.courseText ? ""  :  "Course Text is required"
        
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x ==="")
    }

    
    return (
        <Grid align ="center">
        <Paper elevation={12}  className={classes.mainClass}>
        <div>
            
            <Grid container spacing={2} alignItems="center"  direction="column"  >

                <Grid item  >
                    <h2>Course Management</h2>
                </Grid>

                <Grid item>
                    <Controls.Select
                    label = "Select Courses"
                    name  = "selectCourse"
                    value = {values.selectCourse}
                    onChange = {handleInputChange}
                    disArray = {courseList}
                />
                </Grid>
               
                <Grid item >
                    <Controls.Input
                        name = "courseTitle"
                        label="Course Title"
                        value = {values.courseTitle}
                        onChange = {handleInputChange}
                        type="text"
                        required
                        error = {errors.courseTitle}
                        size = "small"
                        style={{width:300}}
                    />
                </Grid>
                <Grid item >
                    <Controls.Input
                        name = "courseText"
                        label="Course Text"
                        value = {values.courseText}
                        onChange = {handleInputChange}
                        type="text"
                        required
                        error = {errors.courseText}
                        size = "small"
                        style={{width:300}}
                    />
                </Grid>
                <Grid item  >
                    <Controls.Input
                        name = "courseImage"
                        label="Course Image"
                        value = {values.courseImage}
                        onChange = {handleInputChange}
                        type="text"
                        required
                        error = {errors.courseImage}
                        size = "small"
                        style={{width:300}}
                    />
                </Grid>
                
                <Grid item >
                    <Controls.Button
                      onClick={addCourse}
                      text = "Add" 
                      size="medium" 
                      //style ={{width:'150px',marginLeft:'10px'}}
                    ></Controls.Button>
                     

                    <Controls.Button
                      onClick={modifyCourse}
                      text = "Modify"  
                      size="medium"
                      //style ={{width:'150px',marginLeft:'10px'}}
                    ></Controls.Button>
                     

                    <Controls.Button
                      onClick={deleteCourse}
                      text = "Delete"  
                      size="medium"
                      //style ={{width:'150px',marginLeft:'10px'}}
                    ></Controls.Button>
                     

                    <Controls.Button
                      onClick={handleSubmitClick}
                      text = "Submit"  
                      size="medium"
                      //style ={{width:'150px',marginLeft:'10px'}}
                    ></Controls.Button>
                   
                </Grid>
                
            
            </Grid>
                        
        </div>
        </Paper>
        </Grid>
       
    )
}

export default CourseMgmt