import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { getAllSubreddits } from '../../store/subreddits'
import './Subreddits.css'
import { getAllSubredditsIFollow, followOneSubreddit, unfollowOneSubreddit } from '../../store/followed_subreddits'

const Subreddits = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const allSubreddits = useSelector((state) => state.subreddits.subreddits)
    const user = useSelector((state) => state.session.user)
    const followed_subreddits = useSelector((state) => state.followed_subreddits)

    useEffect(() => {
        dispatch(getAllSubreddits())
        dispatch(getAllSubredditsIFollow(user.id))
    },[dispatch, user.id])

    return (
        <div className='page-container'>
            <ul className='sub_list'>
                {allSubreddits?.map((subreddit) => <div className='subreddit-container' key={subreddit.id}>
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
                        </div> )}
            </ul>

            <button onClick={() => history.push("/subreddits/new")}>Create New Subreddit</button>
        </div>
    )
}

export default Subreddits;

