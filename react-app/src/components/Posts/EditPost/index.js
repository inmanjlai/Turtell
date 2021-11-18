import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editPost } from '../../../store/posts'
import '../forms.css'

const EditPost = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector((state) => state.session.user)
    const currentPost = useSelector((state) => state.posts)
    
    const [title, setTitle] = useState(currentPost.title)
    const [content, setContent] = useState(currentPost.content)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            user_id: user?.id,
            subreddit_id: currentPost.subreddit_id,
            title: title.trim(),
            content: content.trim()
        }
        dispatch(editPost(newPost, currentPost.id))
        history.push(`/subreddits/${currentPost.subreddit_id}`)
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
                <h2>Edit Post</h2>
                <br/>
                <div>
                    {errors?.length > 0 && errors?.map((error, idx) => <p key={idx} className="errors">{error}</p> )}
                </div>
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

                <button disabled={title?.length <= 0 || content?.length <= 0 || errors?.length > 0}>Submit</button>
            </form>
    )
}

export default EditPost;

