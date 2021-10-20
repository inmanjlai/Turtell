import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { deletePost, getOnePosts } from "../../../store/posts"

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
        <div>
            <h1>{currentPost.title}</h1>
            <h2>{currentPost.content}</h2>

            {user.id === currentPost.user_id && (
                <div>
                    <button onClick={() => history.push(`/post/${currentPost.id}/edit`)}>Edit</button>
                    <button onClick={() => {
                        dispatch(deletePost(currentSubreddit.id, currentPost.id))
                        history.push(`/subreddits/${currentSubreddit.id}`)
                    }}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default IndividualPost