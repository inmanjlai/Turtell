import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useState } from "react";
import { editOneSubreddit } from "../../store/subreddits";
const EditForm = ({currentSubreddit}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [name, setName] = useState(currentSubreddit?.name)
    const [tag, setTag] = useState(currentSubreddit?.tag)
    const [description, setDescription] = useState(currentSubreddit?.description)
    
    console.log(currentSubreddit, "INSIDE THE FORM COMPONENT")

    // useEffect(() => {
    //     setName(currentSubreddit?.name)
    //     setTag(currentSubreddit?.tag)
    //     setDescription(currentSubreddit?.description)
    // },[currentSubreddit])

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

export default EditForm;