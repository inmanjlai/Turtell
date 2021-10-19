import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getOneSubreddit, editOneSubreddit } from '../../../store/subreddits'

const EditSubreddit = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    // useEffect(() => {
    //     dispatch(getOneSubreddit(id))
    // }, [dispatch, id])
    
    const currentSubreddit = useSelector((state) => state.subreddits.currentSubreddit)
    const [name, setName] = useState(currentSubreddit.name)
    const [tag, setTag] = useState(currentSubreddit.tag)
    const [description, setDescription] = useState(currentSubreddit.description)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const editedSubreddit = {
            name,
            tag,
            description
        }
        dispatch(editOneSubreddit(id, editedSubreddit))
        history.push("/")
    }
        return (
            <div>
                <h2>Edit Subreddit</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Subreddit Name</label>
                        <input type="text" 
                            onChange={(e) => setName(e.target.value)}
                            value={name} 
                        />
                    </div>

                    <div>
                        <label>Subreddit Tag</label>
                        <input type="text" 
                            onChange={(e) => setTag(e.target.value)}
                            value={tag} 
                        />
                    </div>

                    <div>
                        <label>Subreddit Description</label>
                        <textarea 
                            onChange={(e) => setDescription(e.target.value)}
                            value={description} 
                        />
                    </div>

                    <button>Finish Edits</button>
                </form>
            </div>   
    )
}


export default EditSubreddit;

