"use client";
import axios from "axios";
import { useEffect, useState } from "react"
export default function Home() {

  const [formdata , setformdata] = useState({
    title : "",
    description :""
  })

  const [tododata, settododata] = useState([]);

  const fetchtodos = async () => {
    const response = await axios("/api");
    settododata(response.data.todos);
  }

  const deletetodo = async(mongoid) => {
    const response = await axios.delete("/api",{
      params : {
        mongoid : mongoid
      }
    });
    fetchtodos();
  }

  const updatedtodo = async (mongoid) => {
    const response = await axios.put("/api",{},{
      params : {
        mongoid : mongoid
      }
    });
    fetchtodos();
  }
  useEffect(()=> {
    fetchtodos();
  },[])

  const formhandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setformdata(form => ({...form , [name] : value }))

    console.log(formdata);
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response  = await axios.post("/api",formdata);
      setformdata({
        title : "",
        description :""
      })
      fetchtodos();
    }
    catch(error) {
      console.log("error");
    }
  }

  return ( 
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="mt-3 mb-3"> 
          <label className="form-label"><h2>Title</h2></label>
          <input value={formdata.title} onChange={formhandler}  className="form-control" name = "title" placeholder="enter task title"></input>
        </div>
        <div>
          <label className="form-label"><h2>Task</h2></label>
          <input value={formdata.description} onChange={formhandler} className="form-control" name="description" placeholder="enter task to be done.."></input>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mt-4" type="submit">Submit</button>
        </div>
      </form>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            tododata.map((todo, index) => (
              <tr key={index}>
                <td>{todo._id}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.isCompleted ? "completed" :"on process"}</td>
                <td>
                    <button onClick={()=>deletetodo(todo._id)} className="btn btn-danger me-2">Delete</button>
                    <button onClick={()=>updatedtodo(todo._id)} className="btn btn-success">Done</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )   
}
