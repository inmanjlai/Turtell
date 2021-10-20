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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Post Title</label>
                    <input type="text" 
                        onChange={(e) => setTitle(e.target.value)}
                        value={title} 
                    />
                </div>

                <div>
                    <label>Post Body</label>
                    <textarea
                        onChange={(e) => setContent(e.target.value)}
                        value={content} 
                    />
                </div>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default CreatePost;

