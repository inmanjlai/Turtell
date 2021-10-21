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
            <form onSubmit={handleSubmit}>
                <h2>Create Subreddit</h2>
                <br/>
                <div className="form-container">
                    <div>
                        <input type="text" 
                            onChange={(e) => setName(e.target.value)}
                            value={name} 
                            placeholder='Title'
                        />
                    </div>

                    <div>
                        <input type="text" 
                            onChange={(e) => setTag(e.target.value)}
                            value={tag} 
                            placeholder='Choose a unique tag for your community'
                        />
                    </div>

                    <div>
                        <textarea 
                            onChange={(e) => setDescription(e.target.value)}
                            value={description} 
                            placeholder='Describe your community'
                        />
                    </div>
                </div>

                <button>Submit</button>
            </form>
    )
}

export default CreateSubreddit;

