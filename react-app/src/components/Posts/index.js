import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

const Posts = ({post}) => {
    
    const posts = useSelector((state) => state.posts)
    
    return(
            <div key={post}>
                <h2><NavLink to={`/posts/${post}`}> {posts[post]?.title} </NavLink></h2>
                <p>{posts[post]?.content}</p>
            </div>
        )
}

export default Posts;