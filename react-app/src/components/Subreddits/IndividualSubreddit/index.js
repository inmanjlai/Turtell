import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { followOneSubreddit, getAllSubredditsIFollow, unfollowOneSubreddit } from "../../../store/followed_subreddits";
import { getAllSubredditsPosts } from "../../../store/posts";
import { deleteOneSubreddit, getOneSubreddit } from "../../../store/subreddits";
import Posts from "../../Posts";
import './IndividualSubreddit.css'

const IndividualSubreddit = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const currentSubreddit = useSelector((state) => state.subreddits.currentSubreddit)
    const followed_subreddits = useSelector((state) => state.followed_subreddits)
    const user = useSelector((state) => state.session.user)
    const posts = useSelector((state) => state.posts)

    const allPosts = Object.keys(posts)
    
    useEffect(() => {
        dispatch(getOneSubreddit(id))
        dispatch(getAllSubredditsIFollow(user?.id))
        dispatch(getAllSubredditsPosts(currentSubreddit?.id))
    },[dispatch, id, currentSubreddit?.id, user?.id])

    return (
        <div className='page-container'>
            <div className='subreddit-details'>
                <h1>{currentSubreddit?.name}</h1>
                <h2>r/{currentSubreddit?.tag}</h2>
                <p>{currentSubreddit?.description}</p>
            </div>
                <div className='user-controls'>
                    {followed_subreddits?.ids?.includes(currentSubreddit?.id) ? 
                        (
                            <div>
                                <button onClick={() => dispatch(unfollowOneSubreddit(currentSubreddit.id, user.id))}>Leave</button>
                                <button onClick={() => history.push('/subreddit/post/new')}>Create a Post</button>
                            </div>
                        )
                        :(
                            <button onClick={() => dispatch(followOneSubreddit(currentSubreddit.id, user.id))}>Join</button>
                        )}
                    {user?.id === currentSubreddit?.owner_id && (
                    <div>
                        <button onClick={() => {history.push(`/subreddits/${currentSubreddit?.id}/edit`)}} className='editBtn'>Edit</button>
                        <button onClick={() =>{ 
                            dispatch(deleteOneSubreddit(currentSubreddit?.id))
                            history.push('/')
                        }} className='deleteBtn'>Delete</button>
                    </div> ) }
                </div>

                {allPosts.map((post) => {
                    return(
                            <Posts post={post} key={post}/>
                    )
                })}
        </div>
    )
}

export default IndividualSubreddit;