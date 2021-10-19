import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOneSubreddit } from "../../../store/subreddits";
import EditForm from "../EditForm";

const EditSubreddit = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getOneSubreddit(id))
    }, [dispatch, id])

    const currentSubreddit = useSelector((state) => state.subreddits.currentSubreddit)
    return <EditForm currentSubreddit={currentSubreddit}/>
}

export default EditSubreddit;

