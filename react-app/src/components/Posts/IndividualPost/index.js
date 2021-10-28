import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import { deletePost, getOnePosts } from "../../../store/posts"
import { createComment, getAllPostsComments } from "../../../store/comments"
import Comment from "../../Comment"
import './IndividualPost.css'

const IndividualPost = () => {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const currentSubreddit = useSelector((state) => state.subreddits.currentSubreddit)
    const comments = useSelector((state) => state.comments)
    const allComments = Object.values(comments)
    console.log(allComments)
    const currentPost = useSelector((state) => state.posts)
    const user = useSelector((state) => state.session.user)

    const [isOpen, setIsOpen] = useState(false)
    const [commentContent, setCommentContent] = useState("")
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getOnePosts(id))
        dispatch(getAllPostsComments(id))
    },[dispatch, id])

    useEffect(() => {
        const errors = []
        if(commentContent.length > 2000) errors.push("Please limit your comment to a maximum of 2000 characters")        
        if((commentContent.length > 0) && (commentContent.trim().length <= 0)) errors.push("Please fill out the Comment Content with a valid input")
        setErrors(errors)
    }, [commentContent])

    const handleCreateComment = (e) => {
        e.preventDefault()

        const newComment = {
            user_id: user.id,
            post_id: currentPost.id,
            content: commentContent.trim()
        }
        dispatch(createComment(newComment))
        setIsOpen(false)
        setCommentContent("")
    }

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
                <button onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)} className='post-username'>Comment</button>
                <button>{currentPost?.user?.username}</button>
            </div>
            {isOpen && <div className='create-comment'>
                <form onSubmit={handleCreateComment}>
                    { errors.length > 0 && <div className='errors'>{errors.map((error) => <p key={error}>{error}</p>)}</div>}
                    <textarea value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)} 
                        style={{margin: '0px', border: '2px solid var(--trimmings)', width: '100%'}}
                        placeholder="Post a witty comment..."
                    >
                    </textarea>
                    <button disabled={ errors.length || commentContent.length <= 0 }>Submit</button>
                </form>
            </div>}
            <h2>Comments ({allComments.length})</h2>
            <div className='comments-list'>
                {allComments?.map((comment) => <Comment comment={comment} key={comment.id} /> )}    
            </div>
        </div>
    )
}

export default IndividualPost