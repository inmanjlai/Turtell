import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { getAllSubreddits } from '../../store/subreddits'

const Subreddits = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const allSubreddits = useSelector((state) => state.subreddits.subreddits)

    useEffect(() => {
        dispatch(getAllSubreddits())
    },[dispatch])

    return (
        <div>
            <ul className='sub_list'>
                {allSubreddits?.map((subreddit) => <li className='sub_tag' key={subreddit.id}><NavLink to={`/subreddits/${subreddit.id}`}>{subreddit?.tag}</NavLink></li> )}
            </ul>

            <button onClick={() => history.push("/subreddits/new")}>Create New Subreddit</button>
        </div>
    )
}

export default Subreddits;

