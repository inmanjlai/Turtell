import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { editOneSubreddit } from "../../store/subreddits";
const EditForm = ({currentSubreddit}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [name, setName] = useState(currentSubreddit?.name)
    const [tag, setTag] = useState(currentSubreddit?.tag)
    const [description, setDescription] = useState(currentSubreddit?.description)
    const [errors, setErrors] = useState([])

    
    console.log(currentSubreddit, "INSIDE THE FORM COMPONENT")

    useEffect(() => {
        const errors = []
        if(tag?.length > 50) errors.push("Please limit your tag name to a maximum of 50 characters.")
        if(name.length > 255) errors.push("Please limit your Subreddit name to a maximum of 255 characters")
        if(description.length > 255) errors.push("Please limit your Subreddit Description to a maximum of 255 characters")
        setErrors(errors)
    },[tag, name, description])

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
            <form onSubmit={handleSubmit}>
                <h2>Edit Subreddit</h2>
                <br/>
                <div>
                    {errors.length > 0 && errors.map((error, idx) => <p key={idx} className="errors">{error}</p> )}
                </div>
                <div className="form-container">
                    <div>
                        <input type="text" 
                            onChange={(e) => setName(e.target.value)}
                            value={name} 
                            placeholder='Title'
                        />
                    </div>

                    <div>
                        <input type="text" 
                            onChange={(e) => setTag(e.target.value)}
                            value={tag} 
                            placeholder='Choose a unique tag for your community'
                        />
                    </div>

                    <div>
                        <textarea 
                            onChange={(e) => setDescription(e.target.value)}
                            value={description} 
                            placeholder='Describe your community'
                        />
                    </div>
                </div>
                <button disabled={name.length <= 0 || description.length <= 0 || tag.length <= 0 || errors.length > 0}>Submit</button>
            </form>
    )
}

export default EditForm;