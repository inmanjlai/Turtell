import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import './index.css'

const Posts = ({post}) => {
    
    const posts = useSelector((state) => state.posts)
    
    return(
        <div className='individualPost'>
            <NavLink to={`/posts/${post}`}>
                <div key={post} className='postContainer'>
                    <h2> {posts[post]?.title}</h2>
                    <p>{posts[post]?.content?.slice(0, 700)}... <em className='green'>click to view full post</em> </p>
                </div>
            </NavLink>
            <button>Posted by {posts[post]?.user?.username}</button>
        </div>
        )
}

export default Posts;