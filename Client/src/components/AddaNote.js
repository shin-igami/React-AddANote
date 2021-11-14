import React,{useContext,useState} from 'react'
import noteContext from '../context/noteContext'

const AddaNote = () => {
    const context = useContext(noteContext)
    const {addNote,showAlert,addANote} = context
    const [noteValue, setNoteValue] = useState({title:"",description:"",tags:""})
    const handleClick = (e)=>{
        e.preventDefault()
        addANote(noteValue.title,noteValue.description,noteValue.tags) 
        setNoteValue({title:"",description:"",tags:""})
        showAlert("Note Added","success")
    }
    const onChange = (e)=>{
        setNoteValue({...noteValue,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-3">
             <h1>Add A Note</h1>
            <form className="my-3">
                <div className="my-3">
                    <label htmlFor="title" className="title">Title</label>
                    <input type="text" value={noteValue.title} className="form-control" id="title" name="title" onChange={onChange}/>
                  
                </div>
                <div className="my-3">
                    <label htmlFor="description" className="description">Description</label>
                    <input type="text" value={noteValue.description} className="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <div className="my-3">
                    <label htmlFor="tags" className="tags">Tags</label>
                    <input type="text" value={noteValue.tags} className="form-control" id="tags" name="tags" onChange={onChange}/>
                </div>
                <button disabled={noteValue.title.length < 3 || noteValue.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddaNote
