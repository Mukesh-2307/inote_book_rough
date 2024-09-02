// import { useState } from 'react' uncomment this if u want to use the usestate hook
import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
  // to be able to use the below mentioned usestate hook you need to pass the state into the value section
  // for ex: value={{state}}
  // const [state, setState] = useState(s1)  
  // eslint-disable-next-line

  // the below method is an example comment it out in future development
  // const update = () => {
  //     setTimeout(() => {
  //         setState({
  //             "name": "inotebook modified",
  //             "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, optio."
  //         })
  //     }, 5000);
  // }

  // to be able to use the above method u can pass the function in the value section 
  // for ex: value={{update}}

  const host = "http://localhost:5000"
  const notesInitial = []

  // fetching all notes
  const fetchAllNotes = async (title, description, tag) => {
    // api call todo
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // localStorage.getItem(token)
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }
  
  // adding notes
  const addNote = async (title, description, tag) => {
    // api call todo
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json()
    setNotes(notes.concat(note));
  }

  // delete notes
  const deleteNote = async (id) => {
    // api call todo
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = response.json()
    console.log(json)
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }
  // update notes
  const editNote = async (id, title, description, tag) => {
    // api call todo

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.JSON
    console.log(json)
    //logic to edit in client side
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index]
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes)
  }
  const [notes, setNotes] = useState(notesInitial)

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState




//localStorage.getItem(token)  mukesh auth token

//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5MDU0ZmZlMjYyODIwNDM3NDhhODAzIn0sImlhdCI6MTcwMzk1Nzc1OX0.nzop129wEakGkUWRF52FAKfgbxt349TzJUtr1IH7UdQ'  mk auth token

// localStorage.getItem(token)