import { BookOpen } from "lucide-react";

function AuthHeader() {
    return (
        <header className="Auth-header">
            <div className="logo">
                <BookOpen size={26} color="Blue" />
                <span>LearnHub</span>
            </div>

            <nav>
                <span>
                    Don't Have an account?
                    <a href="/Signup"> Sign up</a>
                </span>
            </nav>
        </header>
    );
}

export default AuthHeader;