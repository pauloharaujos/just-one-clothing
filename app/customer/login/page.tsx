import LoginForm from '@/ui/components/customer/login/LoginForm';
import HeaderWrapper from '@/ui/components/HeaderWrapper';
import Footer from '@/ui/components/Footer';

export default function Page() {
    return  (
        <div>
            <HeaderWrapper/>
            <LoginForm/>
            <Footer/>
        </div>
    )
}