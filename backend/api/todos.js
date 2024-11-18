const { Router } = require("express");
const router = Router();
const schemas = require('./db')



router.post("/createTodoInDb", async (req, res) => {
    console.log(req.body, "inside createtodoindb")


    const todoSchema = schemas.Todos
    const newTodo = new todoSchema({ todoTitle: req.body.title, todoDescription: req.body.description })
    const result = await newTodo.save()
    if (result) {
        return res.status(200).json({ message: "Todo successfully created" })
    }
    else {
        return res.status(400).json({ message: "Unable to create Todo" });
    }




})

router.get('/getAllTodos', async (req, res) => {

    const todoSchema = schemas.Todos
    const getTodos = await todoSchema.find({isActive:1} )

    if (getTodos.length > 0) {
        return res.status(200).json({ todos: getTodos })

    }
    else {
        return res.status(204).json({ message: "No todos present" })
    }

})

router.post('/getTodo', async (req, res) => {
    console.log("inside get todo")
    

    const todoId = req.query.todoId;
    console.log(todoId," get id");
    

    const todoSchema = schemas.Todos
    const findTodo = await todoSchema.find({ $and: [ {_id:todoId}, {isActive:1} ]})
    console.log(findTodo,"found todo");
    
    if (findTodo.length > 0) {
        return res.status(200).json({ Todo: findTodo })
    }
    else {
        return res.status(400).json({ message: "Unable to get the Todo" })
    }

})

router.post('/deleteTodo', async (req, res) => {

    const todoId = req.query.todoId

    const todoSchema = schemas.Todos
    const deleteTodo = await todoSchema.findOneAndUpdate({ _id: todoId }, { isActive: 0 }, { new: true })
    console.log(deleteTodo,"deleted todo");
    


    if (deleteTodo) {
        return res.status(200).json({ message: "The todo has been deleted " })
    }
    else {
        return res.status(400).json({ message: "Unable to delete the Todo" })
    }

})

router.post('/editTodo', async(req,res)=>{
    const todoId = req.query.todoId

    const todoSchema = schemas.Todos
    const editTodo = await todoSchema.findOneAndUpdate({_id: todoId},{todoTitle: req.body.title, todoDescription: req.body.description }, { new: true })
    console.log(editTodo,"edited todo");
    
    if (editTodo) {
        return res.status(200).json({ message: "The todo has been updated " });
    }
    else {
        return res.status(400).json({ message: "Unable to update the Todo" })
    }
})

router.post('/updateAll', async(req,res)=>{

    const todoSchema = schemas.Todos

    const updateAll = await todoSchema.updateMany({isActive:0},{isActive:1})

    if(updateAll.modifiedCount){
        return res.status(200).json({ message: "All todos have been updated " })
    }
    
})

router.post('/updateStatus', async(req,res)=>{

    const todoId = req.query['todoId']
    console.log(todoId,"id");
    

    const todoSchema = schemas.Todos
    const updateTodo = await todoSchema.findOneAndUpdate({_id:todoId}, {todoStatus:'Completed'}, { new: true })
    console.log(updateTodo,"updated todo");
    

    if (updateTodo) {
        return res.status(200).json({ updatedTodo: updateTodo});
    }
    else {
        return res.status(400).json({ message: "Unable to update the Todo status" })
    }
})





module.exports = router