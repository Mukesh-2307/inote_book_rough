import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitems from './Noteitems';
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
    const navigate = useNavigate();
    const context = useContext(noteContext)
    const { notes, fetchAllNotes,editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchAllNotes()
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line 
    }, [])
    const [note, setNotes] = useState({etitle: "",edescription: "",etag: ""})
    const ref = useRef(null)
    const newRef = useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click()
        setNotes({id: currentNote._id,etitle: currentNote.title,edescription: currentNote.description, etag: currentNote.tag})
    }
    const handleClick=(e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag)
        newRef.current.click()
        props.showAlert('updated successfully','success')
    }
    const onChange=(e)=>{
        setNotes({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <AddNotes showAlert={props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="form-group my-3">
                                    <label htmlFor="title">title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} placeholder="Enter a title" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="description">description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} placeholder="enter a description" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="tag">tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} placeholder="enter a tag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={newRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} className="btn btn-primary">update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your notes</h2>
                <div className="container mx-2"><b>
                {notes.length === 0 && 'no notes to display'}
                </b>
                </div>
                {notes.map((note) => {
                    return <Noteitems key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes 