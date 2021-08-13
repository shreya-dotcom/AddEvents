import React from 'react'
import { Avatar, Button, Grid, Paper,TextField} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Form, Formik, Field } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// import DatePicker from "react-datepicker";




const Add_Event=()=> {
const paperStyle={padding:'30px 20px',width:300,margin:"20px auto"}
const headerStyle={margin:0}
const avatarStyle={backgroundColor:''}
const marginTop = { margin: 15 }
const formStyle = { textAlign: 'center' }
const initialValues = {
    eventName : '',
    eventType : '',
    eventDescription : '',
    eventVenue : '',
    eventDate : '',
    startTime : '',
    endTime : ''
}


let history = useHistory();
const onCreate = (values,props) =>{
    const event = {
        eventName : values.eventName,
        eventType : values.eventType,
        eventDescription : values.eventDescription,
        eventVenue : values.eventVenue,
        eventDate : values.eventDate,
        startTime : values.startTime,
        endTime : values.endTime
    }

    console.log(Event)
    // axios.post("http://localhost:8081/admin/AddEvent",event)
    .then((response) => {
        var resp = response.status;
        console.log(response.data)
        console.log(response.status)
        if(response == 200) {
            alert("Events are created");
            history.push('/');
        }
    })

    .catch((error)=>{
        if(error.status.response == 400){
            console.log(error.response.data.message);
            alert("Event already exist")
            props.resetForm()
        }
        else
        alert("Something went wrong")
        console.log(error)
    });
}

    return (
       <Grid>
           <Paper elevation={20} style={paperStyle}>
               <Grid align='center'>
                   <Avatar style={avatarStyle}>
                       <AddBoxIcon/>
                   </Avatar>
                   <h2 style={headerStyle}>Add Events</h2>
                   
               </Grid>

               <Formik initialValues={initialValues}  onSubmit={onCreate}>

               {(props) => (
               <Form style={formStyle}>
                  <Field as={TextField}fullWidth label='Name' name='eventName' value={props.values.eventName} 
                         onChange={props.handleChange} placeholder="Enter the name of event" required/>
                  <Field as={TextField} fullWidth label='Type' name='eventType' value={props.values.eventType} 
                         onChange={props.handleChange} placeholder="Enter the type of Event" required/>
                  <Field as={TextField} fullWidth label='Desription' name='eventDescription' value={props.values.eventDescription} 
                         onChange={props.handleChange}placeholder="Enter the Description of Event" required/>
                  <Field as={TextField} fullWidth label='Venue' name='eventVenue' value={props.values.eventVenue} 
                         onChange={props.handleChange}placeholder="Enter the Venue of Event" required/>
                  
                  <Field as={TextField} fullWidth label='Start Date and Time'  name='startTime' value={props.values.startTime}
                  id="datetime-local" type="datetime-local"   defaultValue="Default Value"
                  defaultValue="2021-08-24T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  
                  onChange={props.handleChange} placeholder="Enter the start time" required/>

                  <Field as={TextField} fullWidth label='End Date and Time' name='endTime' value={props.values.endTime} 
                   id="datetime-local" type="datetime-local" defaultValue="Default Value"
                   defaultValue="2021-08-24T10:30"
                   InputLabelProps={{
                     shrink: true,
                   }}
                  
                   onChange={props.handleChange} placeholder="Enter the end time" required/>
                  <Button type='create' variant='contained' color='primary' style={marginTop} align='center'>Create Event</Button>
              </Form>
              )}
               </Formik>

           </Paper>
       </Grid>
    )
}

export default Add_Event;