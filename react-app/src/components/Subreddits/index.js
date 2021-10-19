import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteOneSubreddit, getAllSubreddits } from '../../store/subreddits'

const Subreddits = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const allSubreddits = useSelector((state) => state.subreddits.subreddits)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getAllSubreddits())
    },[dispatch])

    return (
        <div>
            <ul>
                {allSubreddits?.map((subreddit) => <li key={subreddit.id}>{subreddit.tag} {user.id === subreddit.owner_id && (
                    <div>
                        <button onClick={() => history.push(`/subreddits/${subreddit.id}/edit`)}>Edit</button>
                        <button onClick={() => dispatch(deleteOneSubreddit(subreddit.id))}>Delete</button>
                    </div>
                )}</li>)}
            </ul>

            <button onClick={() => history.push("/subreddits/new")}>Create New Subreddit</button>
        </div>
    )
}

export default Subreddits;

