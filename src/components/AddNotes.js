import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

function AddNotes(props) {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNotes] = useState({title: "",description: "",tag: ""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNotes({title: "",description: "",tag: ""})
        props.showAlert('added a new note successfully','success')
    }
    const onChange=(e)=>{
        setNotes({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h1>Add your notes</h1>
            <form className='my-3'>
                <div className="form-group my-3">
                    <label htmlFor="title">title</label>
                    <input type="text" className="form-control" id="title" name='title' placeholder="Enter a title" onChange={onChange} value={note.title} minLength={5} required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">description</label>
                    <input type="text" className="form-control" id="description" name='description' placeholder="enter a description" onChange={onChange} value={note.description} minLength={5} required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="tag">tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' placeholder="enter a tag" value={note.tag} onChange={onChange}/>
                </div>
                <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary my-2" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNotes
 