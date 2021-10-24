import { useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import './index.css'

const Posts = ({post}) => {
    

    const history = useHistory()
    const posts = useSelector((state) => state.posts)    
    return(
        <div className='individualPost'>
            <NavLink to={`/posts/${post}`}>
                <div key={post} className='postContainer'>
                    <h2> {posts[post]?.title}</h2>
                    <p>{posts[post]?.content?.slice(0, 700)}... <em className='green'>click to view full post</em> </p>
                </div>
            </NavLink>
            <div className='post-buttons'>
                <button onClick={() => history.push(`/subreddits/${posts[post]?.subreddit?.id}`)}>r/{posts[post]?.subreddit?.tag}</button>
                <button>Posted by {posts[post]?.user?.username}</button>
            </div>
        </div>
        )
}

export default Posts;