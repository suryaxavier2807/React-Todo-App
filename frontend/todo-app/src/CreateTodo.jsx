import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './App.css'
import axios from 'axios'



function CreateTodo() {


    const [todos, setTodos] = useState({
        title: "",
        description: ""
    })

    const navigate = useNavigate()
    const location = useLocation()
    const [editedId, setEditedId] = useState('')
    const [errors, setErrors] = useState({})
    const [dis, setDis] = useState(1)


    useEffect(() => {





        if (location.state) {

            setEditedId(location.state.editedId)

            async function getTodo() {
                try {
                    const updateTodo = await axios({
                        url: "http://localhost:8081/todos/getTodo",
                        method: "POST",
                        params: { todoId: location.state.editedId },

                    })



                    console.log(updateTodo.data.Todo[0], "res");

                    setTodos({
                        title: updateTodo.data.Todo[0].todoTitle,
                        description: updateTodo.data.Todo[0].todoDescription
                    });



                } catch (error) {
                    console.log("error in getting the todo", error);


                }

            }
            getTodo()



        }
        else {

            setEditedId('');
            setTodos({ title: "", description: "" });

        }
    }, []);

    useEffect(()=>{
        return ()=>{
            setEditedId('');
            setTodos({ title: "", description: "" });

        }
    },[])







    function handleChange(event) {

        const name = event.target.name
        const value = event.target.value

        setTodos(values => ({ ...values, [name]: value }))

        setErrors(values => {
            const newErrors = validateForm({...todos, [name]: value})
            return newErrors
        })

       
        
    }


    async function createTodo() {
        
        
            const connectBackend = await axios({
                method: "POST",
                url: "http://localhost:8081/todos/createTodoInDb",
                data: todos
            })
    
            if (connectBackend.status == 200) {
                navigate('/ViewTodos')
            }
    


    };

    async function updateTodo(e) {




        // setErrors(checkerrors)

        // if(Object.keys(errors).length>0){
        //     e.preventDefault();
        //     console.log('There are errors in the form');
        // }


        const updateTodo = await axios({
            url: "http://localhost:8081/todos/editTodo",
            method: "POST",
            params: { todoId: editedId },
            data: todos
        })


        if (updateTodo.status == 200) {
            setEditedId('');
            setTodos({ title: "", description: "" }); // Clear form fields
            navigate('/ViewTodos', { replace: true });

        }


    }






    function validateForm(data) {

        const errors = {}

        if (!data.title.trim()) {
            errors.title = 'Please enter an todo title'

        }

        if (!data.description.trim()) {
            errors.description = 'Please enter description for your todo'

        }

        return errors


    }

    async function handleSubmit(e){

        debugger

        e.preventDefault()

        const checkerrors = validateForm(todos)
        setErrors(checkerrors)

        if(Object.keys(checkerrors).length>0){
            return
        }

        if(editedId){
            updateTodo()
        }
        else{
            createTodo()
        }
    }




    console.log(editedId, "edi");
    console.log(todos, "todossss")

    console.log(errors, "errors");






    return (
        <form onSubmit={handleSubmit} >
            

                <div>

                    <div>
                        <label className="form-label" > Enter your todo title </label>
                        <input type="text"
                            className="form-input"
                            placeholder='todo title '
                            name="title"
                            value={todos.title}
                            onChange={handleChange}
                        />
                        {errors.title && <>
                            <span className="error-message " >{errors.title}</span>
                        </>}


                    </div>


                    <div>
                        <label className="form-label"  > Give an description for your todo </label>
                        <input type="text"
                            className="form-input"
                            placeholder='todo description '
                            name="description"
                            value={todos.description}
                            onChange={handleChange}
                        />
                        {errors.description && <>
                            <span className="error-message " >{errors.description}</span>
                        </>}


                    </div>
                    <div>
                    <button  type="submit" className="button" >{editedId ? "Update Todo ": "Create Todo" }</button>
                            
                    <div>
                        <button className="button" onClick={() => navigate('/viewTodos')} >View all Todos</button>
                    </div>

                    {/* <div>
        {editedId ? (
            <button
                onClick={(e) => {
                    if (Object.keys(errors).length > 0) {
                        // Prevent the action if there are errors
                        e.preventDefault();
                        console.log('There are errors in the form');
                    } else {
                        updateTodo(); // Proceed with updating
                    }
                }}
                className="button"
                disabled={Object.keys(errors).length > 0} // Disable the button if there are errors
            >
                Update Todo
            </button>
        ) : (
            <button
                onClick={(e) => {
                    if (Object.keys(errors).length > 0) {
                        // Prevent the action if there are errors
                        e.preventDefault();
                        console.log('There are errors in the form');
                    } else {
                        createTodo(); // Proceed with creating
                    }
                }}
                className="button"
                disabled={Object.keys(errors).length > 0} // Disable the button if there are errors
            >
                Create Todo
            </button>
        )}
    </div> */}



                </div>



            </div>

        </form>






    )

}
export default CreateTodo;