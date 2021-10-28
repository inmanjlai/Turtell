import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import './index.css'
import { getAllSubreddits, searchForSubreddits } from "../../store/subreddits"
import { NavLink } from "react-router-dom"

const Searchbar = () => {

    const dispatch = useDispatch()
    const [search, setSearch] = useState("")

    useEffect(() => {
        dispatch(getAllSubreddits())
    },[dispatch])

    const subreddits = useSelector((state) => state.subreddits.subreddits)
    const filtered = subreddits?.filter((subreddit) => subreddit?.name?.toLowerCase().startsWith(search))

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("WE ARE HITTING THE NAVLINK")
        // dispatch(searchForSubreddits(search))
        // history.push(`/subreddits/search/${search}`)
    }

    return (

        <form onSubmit={handleSubmit} style={{position: "relative"}}>
            <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='searchbar'
                placeholder='Search for communities...'
             />

             <div className='results-box'>
                 {filtered?.map((subreddit) => {
                     return (
                        <NavLink to={`/subreddits/${subreddit.id}`} className="search-results" style={{color: "var(--trimmings)", fontFamily:"Open Sans", padding:"10px", cursor:"pointer"}}> <span style={{color:"var(--accent)"}}> r/{subreddit.tag}</span> {subreddit.name}</NavLink>
                     )
                 })}
             </div>
        </form>
    )
}

export default Searchbar