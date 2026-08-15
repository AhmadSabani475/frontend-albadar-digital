import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="h-screen mx-auto text-center flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Welcome To Home</h1>
            <Link to="/login">
                <Button>
                    Login
                </Button>
            </Link>
        </div>

    );
};
export default LandingPage;