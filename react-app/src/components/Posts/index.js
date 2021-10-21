import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import './index.css'

const Posts = ({post}) => {
    
    const posts = useSelector((state) => state.posts)
    
    return(
        <div className='individualPost'>
            <div key={post} className='postContainer'>
                <h2><NavLink to={`/posts/${post}`}> {posts[post]?.title} </NavLink></h2>
                <p>{posts[post]?.content}</p>
            </div>
            <button>Posted by {posts[post]?.user?.username}</button>
        </div>
        )
}

export default Posts;