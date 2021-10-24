import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
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
    }, [dispatch, user?.id])

    const curatedPosts = Object.keys(posts)

    return (
        <div className="feed-container">
            <div className='page-container'>
                { curatedPosts.length > 0 ?
                    curatedPosts?.map((post) => <Posts post={post} key={post}/>) :
                    <h1>You don't follow any communities, join a community to populate your personal curated feed...</h1>
                }
            </div>
            <Sidebar className='sidebar' subreddits={followed_subreddits?.subreddits} />
        </div>
    )
}

export default CuratedFeed