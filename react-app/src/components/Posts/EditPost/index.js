import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editPost } from '../../../store/posts'
import '../forms.css'

const EditPost = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector((state) => state.session.user)
    const currentSubreddit = useSelector((state) => state.subreddits.currentSubreddit)
    const currentPost = useSelector((state) => state.posts)
    
    const [title, setTitle] = useState(currentPost.title)
    const [content, setContent] = useState(currentPost.content)

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            user_id: user.id,
            subreddit_id: currentSubreddit.id,
            title,
            content
        }
        dispatch(editPost(newPost, currentPost.id))
        history.push(`/subreddits/${currentSubreddit.id}`)
    }

    return (
            <form onSubmit={handleSubmit}>
                <h2>Edit Post</h2>
                <br/>
                <div className="form-container">
                    <div>
                        {/* <label>Post Title</label> */}
                        <input type="text" 
                            onChange={(e) => setTitle(e.target.value)}
                            value={title} 
                            placeholder='Title'
                        />
                    </div>

                    <div>
                        {/* <label>Post Body</label> */}
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

export default EditPost;

