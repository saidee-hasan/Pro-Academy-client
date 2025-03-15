import HelmetTitle from "../../components/share/HelmetTitle"
import '../../components/Home/banner.css'
import RegisterForm from "../../components/Auth/RegisterForm"

const Register = () => {
    return (
        <section className='py-16 bg-cover bg-center bg-no-repeat banner'>

            <HelmetTitle title='Register'></HelmetTitle>

            <RegisterForm></RegisterForm>
        </section>
    )
}

export default Register
