import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { followOneSubreddit, getAllSubredditsIFollow, unfollowOneSubreddit } from "../../../store/followed_subreddits";
import { deleteOneSubreddit, getOneSubreddit } from "../../../store/subreddits";

const IndividualSubreddit = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getOneSubreddit(id))
        dispatch(getAllSubredditsIFollow(user.id))
    },[dispatch, id])

    const currentSubreddit = useSelector((state) => state.subreddits.currentSubreddit)
    const followed_subreddits = useSelector((state) => state.followed_subreddits)
    const user = useSelector((state) => state.session.user)


    return (
        <div>
            <h1>{currentSubreddit?.name}</h1>
            <h2>r/{currentSubreddit?.tag}</h2>
            <p>{currentSubreddit?.description}</p>
                {user.id === currentSubreddit?.owner_id && (
                <div>
                    <button onClick={() => {history.push(`/subreddits/${currentSubreddit?.id}/edit`)}}>Edit</button>
                    <button onClick={() =>{ 
                        dispatch(deleteOneSubreddit(currentSubreddit?.id))
                        history.push('/')
                    }}>Delete</button>
                </div> ) }
            {followed_subreddits?.includes(currentSubreddit?.id) ? <button onClick={() => dispatch(unfollowOneSubreddit(currentSubreddit.id, user.id))}>Leave</button> : <button onClick={() => dispatch(followOneSubreddit(currentSubreddit.id, user.id))}>Join</button> }
        </div>
    )
}

export default IndividualSubreddit;