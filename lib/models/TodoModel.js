import { default as mongoose } from "mongoose";

const schema = new mongoose.Schema({
    title : {
        type :String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    isCompleted : {
        type  : Boolean,
        default : false
    }
} , {
    timestamps: true
})


const TodoModel = mongoose.models.todo ||  mongoose.model("todo" , schema);

export default TodoModel;