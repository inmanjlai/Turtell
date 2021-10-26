import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createSubreddit } from '../../../store/subreddits'

const CreateSubreddit = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState("")
    const [tag, setTag] = useState("")
    const [description, setDescription] = useState("")    
    const [errors, setErrors] = useState([])

    const user = useSelector((state) => state.session.user)

    const handleSubmit = async(e) => {
        e.preventDefault()
        const newSubreddit = {
            owner_id: user.id,
            name,
            tag,
            description
        }
        const data = await dispatch(createSubreddit(newSubreddit))
        // console.log(data, "HERE IS THE DATA THAT CAME BACK")
        history.push(`/subreddits/${data.id}`)
    }

    useEffect(() => {
        const errors = []
        if(tag?.length > 50) errors.push("Please limit your tag name to a maximum of 50 characters.")
        if(name.length > 255) errors.push("Please limit your Subreddit name to a maximum of 255 characters")
        if(description.length > 255) errors.push("Please limit your Subreddit Description to a maximum of 255 characters")
        setErrors(errors)
    },[tag, name, description])

    return (
            <form onSubmit={handleSubmit}>
                <h2>Create Subreddit</h2>
                <br/>
                <div>
                    {errors.length > 0 && errors.map((error, idx) => <p key={idx} className="errors">{error}</p> )}
                </div>
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

                <button disabled={name.length <= 0 || description.length <= 0 || tag.length <= 0 || errors.length > 0}>Submit</button>
            </form>
    )
}

export default CreateSubreddit;

