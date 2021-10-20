import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getOneSubreddit } from "../../../store/subreddits";
import EditForm from "../EditForm";

const EditSubreddit = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const currentSubreddit = useSelector((state) => state.subreddits.currentSubreddit)
    
    
    console.log(currentSubreddit, "INSIDE THE FORM COMPONENT")

    useEffect(() => { 
        dispatch(getOneSubreddit(id))
    }, [dispatch, id])

    if (!currentSubreddit?.id) return null
    return <EditForm currentSubreddit={currentSubreddit}/>
}

export default EditSubreddit;

