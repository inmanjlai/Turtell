import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { deletePost, getOnePosts } from "../../../store/posts"
import './IndividualPost.css'

const IndividualPost = () => {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const currentSubreddit = useSelector((state) => state.subreddits.currentSubreddit)
    const currentPost = useSelector((state) => state.posts)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getOnePosts(id))
    },[dispatch, id])
    
    return (
        <div className='pageContainer'>
            <div className='post-details'>
                <h1>{currentPost.title}</h1>
                <p>{currentPost.content}</p>
            </div>

            <div className='user-controls'>
                {user?.id === currentPost?.user_id && (
                    <div>
                        <button className='editBtn' onClick={() => history.push(`/post/${currentPost?.id}/edit`)}>Edit</button>
                        <button onClick={() => {
                            dispatch(deletePost(currentSubreddit?.id, currentPost?.id))
                            history.push(`/subreddits/${currentSubreddit?.id}`)
                        }} className='deleteBtn'>Delete</button>
                    </div>
                )}
                <button className='post-username'>{currentPost?.user?.username}</button>
            </div>
        </div>
    )
}

export default IndividualPost