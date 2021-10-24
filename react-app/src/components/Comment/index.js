import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../store/comments'
import './comments.css'

const Comment = ({comment}) => {

    const user = useSelector((state) => state.session.user)
    const currentPost = useSelector((state) => state.posts)

    const dispatch = useDispatch()

    return (
        <div className='comment'>
            <div className='comment-content'>
                <p>{comment?.content}</p>
            </div>
                <div className='user-controls'>
                    {user.id === comment.user_id && 
                        <>
                            <button className='deleteBtn' onClick={() => dispatch(deleteComment(currentPost?.id, comment?.id))}>Delete</button>
                        </>
                    }
                    <button className='comment-user'>{comment?.user?.username}</button>
                </div>
        </div>
    )
}

export default Comment