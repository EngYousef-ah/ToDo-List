import './App.css';
import TodoList from './components/TodoList';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { TodosContext } from './contexts/todosContexts';
import { v4 as uuidv4 } from 'uuid';

 
const theme =createTheme ({
  typography: {
    fontFamily: [
      "Alexandria"
    ],
  },
  palette: {
    primary:{
      main:"#004d40",
    },
  },
});


const initialTodos =[
    {
        id:uuidv4(),
        title:"قراءة كتاب 1",
        details:"تفاصيل الكتاب الاول",
        isCompleted:false
    },
    {
        id:uuidv4(),
        title:"قراءة رياضيات",
        details:"لا يوجد",
        isCompleted:false
    }
];

function App() {
    const [todos,setTodos] = useState(initialTodos);
  
  return (
    <ThemeProvider theme={theme}>
      
    <div className="App" style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",direction:"rtl"}}>
      <TodosContext.Provider value={{todos:todos, setTodos:setTodos}}> 
        {/* OR WE CAN WRIYE {todos, setTodos} BOTH IS THE SAME GOAL */}
        <TodoList />
      </TodosContext.Provider>

    </div>
    </ThemeProvider>
  );
}

export default App;
