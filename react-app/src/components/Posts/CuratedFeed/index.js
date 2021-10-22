import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import Posts from ".."
import { getAllSubredditsIFollow } from "../../../store/followed_subreddits"
import { getCuratedFeed } from "../../../store/posts"
import Sidebar from "../../Sidebar"
import '../index.css'

const CuratedFeed = () => {

    const posts = useSelector((state) => state.posts)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    const followed_subreddits = useSelector((state) => state.followed_subreddits)

    useEffect(() => {
        dispatch(getCuratedFeed(user?.id))
        dispatch(getAllSubredditsIFollow(user?.id))
    }, [dispatch])

    const curatedPosts = Object.keys(posts)
    console.log(curatedPosts)

    return (
        <div className="feed-container">
            <div className='page-container'>
                {curatedPosts?.map((post) => <Posts post={post} key={post.id}/>)}
            </div>
            <Sidebar className='sidebar' subreddits={followed_subreddits?.subreddits} />
        </div>
    )
}

export default CuratedFeed