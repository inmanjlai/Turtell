import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createSubreddit } from '../../../store/subreddits'

const CreateSubreddit = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState("")
    const [tag, setTag] = useState("")
    const [description, setDescription] = useState("")

    const user = useSelector((state) => state.session.user)

    const handleSubmit = (e) => {
        e.preventDefault()
        const newSubreddit = {
            owner_id: user.id,
            name,
            tag,
            description
        }
        dispatch(createSubreddit(newSubreddit))
        history.push("/")
    }

    return (
        <div>
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

                <button>Submit</button>
            </form>
        </div>
    )
}

export default CreateSubreddit;

