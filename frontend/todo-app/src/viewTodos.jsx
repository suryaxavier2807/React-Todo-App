import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './App.css'

function ViewTodos() {
    

    const [todos, setTodos] = useState([])

    const navigate = useNavigate()

    useEffect(() => {


        async function getTodos() {

            try {
                const getTodos = await axios({
                    url: "http://localhost:8081/todos/getAllTodos",
                    method: "GET"
                })
                if(getTodos.data.todos){
                    setTodos(getTodos.data.todos)

                }
                else{
                    console.log("No todos present");
                    
                }

                


            } catch (error) {
                console.log("error in fetching todos", error)

            }



        }



        getTodos()



    }, [])

    

    async function deleteTodo(id) {
        
        
        console.log(todos);
        
        

        console.log(id,"delete id");
        
        
        const deleteTodo = await axios({
            url:"http://localhost:8081/todos/deleteTodo",
            method:"POST",
            params: {todoId: id}
        })

        console.log(deleteTodo,"res from del");
         

        if(deleteTodo.status===200){

            console.log("inside 200");

            const id1 = todos.map((val,index)=>val.id)
            console.log(id1);
            
            

            setTodos((prevTodos)=>prevTodos.filter((todo)=>todo._id !== id))
            
        }
        else{
            console.log("Failed to delete todo");
            
        }
        
    }

    async function editTodo(id) {

        navigate('/', {state :{editedId:id}})
        
    }

    async function updateTodoStatus(id) {

        debugger

        const updateTodoStatus = await axios({
            url:"http://localhost:8081/todos/updateStatus",
            method:"POST",
            params: {todoId: id}
        })

        console.log(updateTodoStatus,"res from update status");
         

        if(updateTodoStatus.status===200){

         setTodos((prevTodos)=>prevTodos.map((val,index)=>val._id===id ?
             {...val,todoStatus:updateTodoStatus.data.updatedTodo.todoStatus}
             :val))

            

            

           
        }
        else{
            console.log("Failed to update todo status");
            
        }
        


        
    }

    console.log(todos, "toooo");





    return (
        <div>
        <div>
            <table className="table" >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos&&todos.map((val, index) => (
                        <tr key={val._id}>
                            <td>{val._id}</td>
                            <td>{val.todoTitle}</td>
                            <td>{val.todoDescription}</td>
                            <td>{val.todoStatus}</td>
                            <td className="tdata" >
                                <button onClick={()=>editTodo(val._id)} >Edit</button>
                                <button onClick={()=>deleteTodo(val._id)} >Delete</button>
                                {val.todoStatus!=='Completed' && <button onClick={()=>updateTodoStatus(val._id)} >Mark as completed</button>}
                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
        <div>
            <button onClick={()=> navigate('/')} >Create New Todo</button>
        </div>
        </div>

    )

}
export default ViewTodos;

//     const todos = [
//         {
//         id:1,
//         title:"playtime",
//         description:"plays cricket"
//     },
//     {
//         id:2,
//         title:"study",
//         description:"study physics wkejfbhfbiefojiopfjeoijiogjoeijgoiejgoijeogjeojgoeijgoiejgoiejg "
//     },{
//         id:3,
//         title:"music",
//         description:"plays guitar[lgm,eprgkpokgopeijgoiejgioejkngnejingejgoierrjgiegr"
//     },
// ]