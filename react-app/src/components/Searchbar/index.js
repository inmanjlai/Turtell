import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import './index.css'
import { searchForSubreddits } from "../../store/subreddits"

const Searchbar = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const [search, setSearch] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(searchForSubreddits(search))
        history.push(`/subreddits/search/${search}`)
    }

    return (

        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='searchbar'
                placeholder='Search for communities...'
             />
        </form>
    )
}

export default Searchbar