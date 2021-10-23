import './Splashpage.css'
import loginImg from '../../image_assets/log-in.png'
import signup from '../../image_assets/signup.png'
import guest from '../../image_assets/guest-list.png'
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/session'

const SplashPage = () => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    if(user){
        return <Redirect to="/" />
    }

    return (
        <div className='splashpage-container'>
            <h1>Welcome to <span className='green'>[ Turtell ]</span></h1>
            <div className='options-container'>
                <div className='option'>
                    <NavLink to="/login"><div><img src={loginImg} alt="log-in" /></div></NavLink>
                    <button>Login</button>
                </div>

                <div className='option'>
                    <NavLink to="/sign-up"><div><img src={signup} alt="sign-up" /></div></NavLink>
                    <button>Sign Up</button>
                </div>

            </div>
            <div className='guest-user'>

                <div className='option' onClick={() => dispatch(login("demo@aa.io", "password"))}>
                    <div><img src={guest} alt="demo-login" /></div>
                    <button>Browse as a Guest User</button>
                </div>

            </div>
        </div>
    )
}

export default SplashPage