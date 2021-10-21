import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createPost } from '../../../store/posts'

const CreatePost = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

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

    return (
            <form onSubmit={handleSubmit}>
                <h2>Create Post</h2>
                <br/>
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

                <button>Submit</button>
            </form>
    )
}

export default CreatePost;

