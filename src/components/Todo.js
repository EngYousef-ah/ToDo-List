import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


// ICONS
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


//OTHERS
import { useContext,useState } from 'react';
import { TodosContext } from '../contexts/todosContexts';

export default function Todo({todo}) {

    const {todos,setTodos} =useContext(TodosContext);
    const [openDeleteDialog,setOpenDeleteDialog] = useState (false);
    const [openUpdateDialog,setOpenUpdateDialog] = useState (false);
    const [updateTodo,setUpdateTodo] = useState({title:todo.title ,details:todo.details});

    function handleIconClick() {
        const updatedTodos =todos.map(t =>{
            if(t.id === todo.id) {
              t.isCompleted = !t.isCompleted;
            }
            return t;
        })

        setTodos(updatedTodos);
        localStorage.setItem("todos",JSON.stringify(updatedTodos));

    }

    function handleDeleteClose(){
        setOpenDeleteDialog(false);
    }
    function handleUpdateClose() {
      setOpenUpdateDialog(false);
    }

    function handleDeleteTodo () {
        const newTodos =todos.filter((t) => {
        //    return t.id === todo.id ? false: true;
        // The shorthand code is:
           return t.id !== todo.id;
        });
        setTodos(newTodos);
        setOpenDeleteDialog(false);
        localStorage.setItem("todos",JSON.stringify(newTodos));


    }

    function handleUpdateTodo() {
        const updatedTodos =todos.map(t =>{
            if(t.id === todo.id) {
              t.title=updateTodo.title;
              t.details=updateTodo.details;
            }
            return t;
        })

        setTodos(updatedTodos);
        setOpenUpdateDialog(false);
        localStorage.setItem("todos",JSON.stringify(updatedTodos));


    }
    
    return (
        <>
        {/* DELETE DIALOG TODO */}
        <Dialog style={{direction:"rtl"}}
        open={openDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد من رغبتك في حذف المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           لا يمكنك التراجع في حال اختيار زر : (حذف)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpenDeleteDialog(false)}}  style={{color:"#b23c17"}}>إغلاق</Button>
          <Button onClick={ () => {handleDeleteTodo()}} style={{color:"#b23c17"}} autoFocus>
            نعم قم بالحذف
          </Button>
        </DialogActions>
        </Dialog>
        {/* === DELETE DIALOG === */}

        {/* UPDATE DIALOG TODO */}
        <Dialog style={{direction:"rtl"}}
        open={openUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" >
          "تعديل المهمة"
        </DialogTitle>
        <DialogContent>
          <TextField 
              autoFocus
              required
              margin="dense"
              id="name"
              label="عنوان المهمة"
              fullWidth
              variant="standard"
              value={updateTodo.title}
              onChange={(e) => {
                setUpdateTodo({...updateTodo,title:e.target.value});
              }}
            />


            <TextField 
              autoFocus
              required
              margin="dense"
              id="name"
              label="التفاصيل"
              fullWidth
              variant="standard"
              value={updateTodo.details}
              onChange={(e) => {
                setUpdateTodo({...updateTodo,details:e.target.value})
              }}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpenUpdateDialog(false)}}  style={{color:"#1769aa"}}>إغلاق</Button>
          <Button onClick={ () => {handleUpdateTodo()}} style={{color:"#1769aa"}} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
        </Dialog>
        {/* === UPDATE DIALOG TODO === */}
        

        {/*  */}
        <Card className="todoCard" sx={{ minWidth: 275,background:"#283593",color:"white" ,marginTop:5}}>
        <CardContent>
            

        <Grid container spacing={2}>
            <Grid size={7}>
                <Typography variant="h5" sx={{textAlign:"right"}} style={{textDecoration:todo.isCompleted ? "line-through" :"none"}}> {todo.title}</Typography>
                <Typography variant="h6" sx={{textAlign:"right"}} >  {todo.details}</Typography>
            </Grid>

            <Grid size={5} display="flex" justifyContent="space-between" alignItems="center">
                <IconButton className="iconButton" onClick={() => {
                    handleIconClick();
                }}
                style={{
                    color:todo.isCompleted ? "white" : "#8bc34a",
                    background:todo.isCompleted ? "#8bc34a " : "white",  
                    border:"solid #8bc34a 3px"}}>

                    <CheckIcon />
                </IconButton>

                <IconButton className="iconButton" onClick={() => {
                  setOpenUpdateDialog(true);
                }}
                style={{
                    color:"#1769aa",
                    background:"white",
                    border:"solid #1769aa 3px"}}>

                    <ModeEditOutlineOutlinedIcon />
                </IconButton>

                <IconButton className="iconButton"  onClick={() => {
                    setOpenDeleteDialog(true);  
                }}
                style={{
                    color:"#b23c17",
                    background:"white",
                    border:"solid #b23c17 3px"}}>

                    <DeleteOutlineIcon />
                </IconButton>
            </Grid>
       
        </Grid>
        
        </CardContent>
        
        </Card>
        </>
    );
    }
