import { useHistory } from "react-router"

const BackButton = () => {

    const history = useHistory()

    return (
        <button className='backBtn' onClick={() => history.goBack()}>Back</button>
    )
}

export default BackButton