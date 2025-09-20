import * as React from 'react';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


// COMPONENTS
import Todo from './Todo';

// OTHERS
import { useState, useContext, useEffect } from 'react';
import { TodosContext } from '../contexts/todosContexts';
import { v4 as uuidv4 } from 'uuid';



export default function TodoList() {

    const {todos,setTodos} = useContext(TodosContext);
    // because the {useContext} here take object with tow value and we use destruction object.
    const [titleInput,setTitleInput] = useState("");
    const [displayedTodosType,setDisplayedTodosType] = useState("all");


    const completedTodos = todos.filter((t) => {
        return t.isCompleted;
    });

    const notCompletedTodos = todos.filter((t) => {
        return !t.isCompleted;
    });

    let todosToBeRendered = todos;

    if(displayedTodosType === "completed") {
        todosToBeRendered = completedTodos;
    }
    else if(displayedTodosType === "non-completed") {

        todosToBeRendered = notCompletedTodos;
    }
    else {
        todosToBeRendered= todos;
    }

    const todosJsx=todosToBeRendered.map((t) => {
        return <Todo key={t.id} todo={t} />
    })



    function handleAddClick() {
        const newTodo = {
            id:uuidv4(),
            title:titleInput,
            details:"",
            isCompleted:false,
        };

        const updatedToDos=[...todos,newTodo];
        setTodos(updatedToDos);
        localStorage.setItem("todos",JSON.stringify(updatedToDos));
        setTitleInput("");
    }
    
    

    function changeDisplayType(e) {
        console.log(displayedTodosType);
        setDisplayedTodosType(e.target.value);
        
        
    }
    useEffect(() => {
        const storageTodos=JSON.parse(localStorage.getItem("todos")) ?? [];
        setTodos(storageTodos);
    },[]); 

    
  return (
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }} style={{
            maxHeight:"90vh",
            minWidth:"50px",
            
            overflow:"scroll"
        }}>
        <CardContent>
            <Typography variant="h2" style={{fontWeight:"bold"}}>
            مهامي
            </Typography>
            <Divider />

            {/* Start group btn */}

            <ToggleButtonGroup
            style={{direction:"ltr",marginTop:"30px"}}
                 value={displayedTodosType}
                exclusive
                 onChange={changeDisplayType}   
                aria-label="text alignment"
                color="primary"
                >
                <ToggleButton value="non-completed" >
                    غير المنجز 
                </ToggleButton>

                <ToggleButton value="completed" >
                    المنجز
                </ToggleButton>

                <ToggleButton value="all" >
                    الكل
                </ToggleButton>

                

                
            </ToggleButtonGroup>
            {/* === group btn === */}

            {/* === ALL TODOS === */}
            {todosJsx}
            {/* === ALL TODOS === */}


        {/* === INPUT VALUE === */}
        <Grid container style={{marginTop:"20px"}} spacing={2}>
            <Grid size={8} 
                display="flex" 
                justifyContent="space-between"
                alignItems="center">

                <TextField style={{width:"100%"}} id="outlined-basic" label="عنوان المهمة" variant="outlined" 
                value={titleInput} onChange={(e) => {
                    setTitleInput(e.target.value);
                }}/>
         
            </Grid>

            <Grid size={4} 
                display="flex" 
                justifyContent="space-between"
                alignItems="center">
                <Button style={{width:"100%",height:"100%" }} variant="contained"
                onClick={() => {
                    handleAddClick();
                }}
                disabled={titleInput.length === 0}>إضافة</Button>

            </Grid>

        </Grid>
            
        {/* === INPUT VALUE === */}

           
           
        </CardContent>
     
        </Card>
      </Container>
  );
}   
