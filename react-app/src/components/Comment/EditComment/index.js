import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editComment, getOneComment } from "../../../store/comments";

const EditComment = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const currentComment = useSelector((state) => state.comments)
    const [commentContent, setCommentContent] = useState(currentComment.content)
    const [errors, setErrors] = useState([])

    

    useEffect(() => {
        dispatch(getOneComment(id))
    }, [dispatch, id])
    
    useEffect(() => {
        setCommentContent(currentComment.content)
    }, [currentComment.id])

    useEffect(() => {
        const errors = []
        if(commentContent?.length > 2000) errors.push("Please limit your comment to a maximum of 2000 characters")
        setErrors(errors)
    }, [commentContent])

    const handleEditComment = (e) => {
        e.preventDefault()
        
        const editedComment = {
            content: commentContent,
            post_id: currentComment.post.id
        }
        
        dispatch(editComment(editedComment, currentComment?.id))
        history.push(`/posts/${currentComment?.post?.id}`)
        setCommentContent("")
    }
    
    
    if (currentComment.id !== undefined){
        return (
            <div className='create-comment'>
                <form onSubmit={handleEditComment}>
                <h2 style={{marginBottom: "20px"}}>Edit Comment</h2>
                    { errors.length > 0 && <div className='errors'>{errors.map((error) => <p key={error}>{error}</p>)}</div>}
                    <textarea value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)} 
                        style={{margin: '0px', border: '2px solid white', width: '100%'}}
                        placeholder="Post a witty comment..."
                    >
                    </textarea>
                    <button disabled={ errors?.length || commentContent?.length <= 0 }>Submit</button>
                </form>
            </div>
        )
    } else {
        return null
    }
}

export default EditComment;

