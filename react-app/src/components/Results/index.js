import { useDispatch, useSelector } from "react-redux"
import Sidebar from "../Sidebar"
import { unfollowOneSubreddit, followOneSubreddit } from "../../store/followed_subreddits"
import './index.css'
import { NavLink } from "react-router-dom"

const Results = () => {
    
    const subreddits = useSelector((state) => state.subreddits.subreddits)
    const followed_subreddits = useSelector((state) => state.followed_subreddits)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()

    return (
        <div className='feed-container'>
            <div className='page-container'>
                {subreddits?.length ? subreddits?.map((subreddit) => {
                    return (
                        <div className='subreddit-container' key={subreddit.id}>
                            <NavLink to={`/subreddits/${subreddit.id}`}><div className='single-subreddit'>
                                <h1>{subreddit?.name}</h1>
                                <h2>r/{subreddit?.tag}</h2>
                                <p>{subreddit?.description}</p>
                            </div></NavLink>
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
                }) : <h1>No Subreddits with that name were found.</h1>}
            </div>
            <Sidebar subreddits={followed_subreddits.subreddits}/>
        </div>
    )
}

export default Results