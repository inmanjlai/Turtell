import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import Sidebar from "../Sidebar"
import { unfollowOneSubreddit, followOneSubreddit, getAllSubredditsIFollow } from "../../store/followed_subreddits"
import './index.css'

const Results = () => {
    
    const subreddits = useSelector((state) => state.subreddits.subreddits)
    const followed_subreddits = useSelector((state) => state.followed_subreddits)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <div className='feed-container'>
            <div className='page-container'>
                {subreddits?.map((subreddit) => {
                    return (
                        <div className='subreddit-container'>
                            <div className='single-subreddit'>
                                <h1>{subreddit?.name}</h1>
                                <h2>r/{subreddit?.tag}</h2>
                                <p>{subreddit?.description}</p>
                            </div>
                            {followed_subreddits?.ids?.includes(subreddit?.id) ? 
                                (
                                        <button onClick={() => {
                                            dispatch(unfollowOneSubreddit(subreddit.id, user.id))
                                        }}>Leave</button>
                                )
                                :(
                                    <button onClick={() => {
                                        dispatch(followOneSubreddit(subreddit.id, user.id))
                                    }}>Join</button>
                            )}
                        </div>
                    )
                })}
            </div>
            <Sidebar subreddits={followed_subreddits.subreddits}/>
        </div>
    )
}

export default Results