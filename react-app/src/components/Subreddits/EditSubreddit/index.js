import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { editOneSubreddit, getOneSubreddit } from "../../../store/subreddits";

const EditSubreddit = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const currentSubreddit = useSelector((state) => state.subreddits.currentSubreddit)
    
    const [name, setName] = useState("")
    const [tag, setTag] = useState("")
    const [description, setDescription] = useState("")
    
    console.log(currentSubreddit, "INSIDE THE FORM COMPONENT")

    useEffect(() => { 
        dispatch(getOneSubreddit(id))
    }, [dispatch, id])

    useEffect(() => {
        setName(currentSubreddit?.name)
        setTag(currentSubreddit?.tag)
        setDescription(currentSubreddit?.description)
    },[currentSubreddit])

    const handleSubmit = (e) => {
        e.preventDefault()
        const editedSubreddit = {
            name,
            tag,
            description
        }
        dispatch(editOneSubreddit(currentSubreddit.id, editedSubreddit))
        history.push("/")
    }
        return ( 
            <div>
                <h2>Edit Subreddit</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Subreddit Name</label>
                        <input type="text" 
                            onChange={(e) => setName(e.target.value)}
                            value={name} 
                        />
                    </div>

                    <div>
                        <label>Subreddit Tag</label>
                        <input type="text" 
                            onChange={(e) => setTag(e.target.value)}
                            value={tag} 
                        />
                    </div>

                    <div>
                        <label>Subreddit Description</label>
                        <textarea 
                            onChange={(e) => setDescription(e.target.value)}
                            value={description} 
                        />
                    </div>

                    <button>Finish Edits</button>
                </form>
            </div>   
    )
}

export default EditSubreddit;

