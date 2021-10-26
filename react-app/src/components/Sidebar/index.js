import '../Posts/index.css'
import { NavLink } from 'react-router-dom'

const Sidebar = ({subreddits}) => {
    return (
        <div className='sidebar-container'>
            <div className='sidebar'>
                <h2>Communities You Follow</h2>
                {subreddits?.map((subreddit) => {
                    return (
                        <h3 key={subreddit.id}><NavLink to={`/subreddits/${subreddit.id}`}>r/{subreddit.tag}</NavLink></h3>
                    )
                })}
            </div>
            <h3 className="createBtn"><NavLink to='/subreddits/new'>Create a Community</NavLink></h3>

            <h3 className='createBtn'><NavLink to="all/subreddits">Browse All Communities</NavLink></h3>
        </div>
    )
}

export default Sidebar