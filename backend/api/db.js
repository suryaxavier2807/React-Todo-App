const mongoose = require('mongoose')

const mongourl = "mongodb+srv://suryaxavier2807:fUvNbsZsVrUOhE4n@cluster0.wrcux.mongodb.net/todosapp"

async function main() {
    await mongoose.connect(mongourl)
    
}

main().then(()=>{
    console.log("connected to db");
    
}).catch((err)=>{
    console.log(err);
    
})

const TodoSchema = new mongoose.Schema({
    id: { type: Number, require: true},
    todoTitle: { type: String, require: true},
    todoDescription: { type: String, require: true},
    todoStatus: { type: String, default: 'Not Yet Completed'},
    isActive: { type: Number, default:1}
})

const Todos = mongoose.model('Todos',TodoSchema)

module.exports = {Todos}

