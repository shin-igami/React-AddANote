import React, { useContext, useEffect ,useRef,useState} from 'react'
import { useHistory } from 'react-router'
import noteContext from '../context/noteContext'
import AddaNote from './AddaNote'
import NotesItem from './NotesItem'

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNotes ,editNote,showAlert,getAllNotes} = context
    const [noteValue, setNoteValue] = useState({title:"",description:"",tags:""})
    let history = useHistory()
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote = (note)=>{
        ref.current.click()
        setNoteValue(note)
    }
    const onChange = (e)=>{
        e.preventDefault()
        setNoteValue({...noteValue,[e.target.name]:e.target.value})
    }
    const handleClick = (e)=>{
        refClose.current.click()
        e.preventDefault()
        editNote(noteValue._id,noteValue.title,noteValue.description,noteValue.tags);
        showAlert("Note Updated","success")
    }
    useEffect(() => {
        if(localStorage.getItem("token")){
            getAllNotes();
        }
      else{
          history.push("/login")
      }
        // eslint-disable-next-line
    }, [handleClick])
    return (
        <>
                    <AddaNote/>
        <div className="row my-3">
            <button type="button" className="btn btn-primary invisible" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <h1>Edit this Note</h1>
                                <form className="my-3">
                                    <div className="my-3">
                                        <label htmlFor="title" className="title">Title</label>
                                        <input  type="text" value={noteValue.title} className="form-control" onChange={onChange} id="title" name="title"  />

                                    </div>
                                    <div className="my-3">
                                        <label htmlFor="description" className="description">Description</label>
                                        <input type="text" onChange={onChange} value={noteValue.description}className="form-control" id="description" name="description"  />
                                    </div>
                                    <div className="my-3">
                                        <label htmlFor="tags" className="tags">Tags</label>
                                        <input type="text" className="form-control" id="tags" value={noteValue.tags} name="tags"  onChange={onChange}/>
                                    </div>
    
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button disabled={noteValue.title.length < 3 || noteValue.description.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update this Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                <div className="row my-3">
                <h2>You Notes</h2>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NotesItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
            </>
    )
}

export default Notes
