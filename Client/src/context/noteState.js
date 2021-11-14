import NoteContext from "./noteContext";
import { useState } from "react";
import api from '../api/notes'
const NoteState = (props) => {

    const host = "http://localhost:5000"
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)
    //Get All Note
    const getNotes = async () => {
        //API Call

        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });
        const json = await response.json()
        setNotes(json.Note)
    }

//axios

const retrieveContacts = async () => {
    const headers= {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
    }
    const response =await api.get("/api/notes/fetchnotes",{headers})
    console.log(response);
    return response.data.Note;
}

const getAllNotes = async()=>{
    const allNotes = await retrieveContacts();
    if(allNotes){
        setNotes(allNotes)
    }
}

    //add a note
    const addNote = async (title, description, tags) => {
        //API Call

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tags })
        });
        const json = await response.json()
        setNotes(notes.concat(json))
    }
  //axios
  const addANote = async(title, description, tags) =>{
      console.log({title,description,tags})
      const request = {
          title,
          description,
          tags
      }
      const  headers = {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
    }
      const response = await api.post("/api/notes/addnote",request,{headers})
      setNotes(notes.concat(response.data))
  }



    //update a note
    const editNote = async (id, title, description, tags) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tags })
        });

        //Logic to edit
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tags = tags
            }

        }
    }
    //delete a note
    const deleteNote = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
        showAlert("Deleted", "success")
    }

    ///alert 

    const [alert, setAlert] = useState(null)
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null)
        }, 1000);
    }


    return (
        <NoteContext.Provider value={{addANote,getAllNotes, notes, addNote, deleteNote, getNotes, editNote, setNotes, showAlert, alert }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;
