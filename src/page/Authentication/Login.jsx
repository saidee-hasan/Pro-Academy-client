import LoginForm from "../../components/Auth/LoginForm"
import HelmetTitle from "../../components/share/HelmetTitle"
import '../../components/Home/banner.css'

const Login = () => {
    return (
        <section className='py-16 bg-cover bg-center bg-no-repeat banner'>

            <HelmetTitle title='Login'></HelmetTitle>

            <LoginForm></LoginForm>
        </section>
    )
}

export default Login
