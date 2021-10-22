import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Posts from ".."
import { getCuratedFeed } from "../../../store/posts"

const CuratedFeed = () => {

    const posts = useSelector((state) => state.posts)
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCuratedFeed(user.id))
    }, [dispatch])

    const curatedPosts = Object.keys(posts)
    console.log(curatedPosts)

    return (
        curatedPosts.map((post) =>{
            return (
                <div className='page-container'>
                    <Posts post={post} key={post.id}/>
                </div>
            )
        })
    )
}

export default CuratedFeed