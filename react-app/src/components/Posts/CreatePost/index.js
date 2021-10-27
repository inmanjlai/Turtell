import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createPost } from '../../../store/posts'

const CreatePost = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")    
    const [errors, setErrors] = useState([])


    const user = useSelector((state) => state.session.user)
    const currentSubreddit = useSelector((state) => state.subreddits.currentSubreddit)

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            user_id: user.id,
            subreddit_id: currentSubreddit.id,
            title,
            content
        }
        dispatch(createPost(newPost))
        history.push(`/subreddits/${currentSubreddit.id}`)
    }

    useEffect(() => {
        const errors = []
        if(title?.length > 150) errors.push("Please limit your title to a maximum of 150 characters.")
        if(content?.length > 2000) errors.push("Please limit your post to a maximum of 2000 characters.")
        if((content.length > 0) && (content.trim().length <= 0)) errors.push("Please fill out the Post Content with a valid input")
        setErrors(errors)
    },[content, title])

    return (
            <form onSubmit={handleSubmit}>
                <h2>Create Post</h2>
                <br/>
                <div>
                    {errors.length > 0 && errors.map((error, idx) => <p key={idx} className="errors">{error}</p> )}
                </div>
                <div className="form-container">
                    <div>
                        <input type="text" 
                            onChange={(e) => setTitle(e.target.value)}
                            value={title} 
                            placeholder='Title'

                        />
                    </div>

                    <div>
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....'
                        />
                    </div>
                </div>

                <button disabled={title.length <= 0 || content.length <= 0 || errors.length > 0}>Submit</button>
            </form>
    )
}

export default CreatePost;

