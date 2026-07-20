function AuthHeader() {
    return (
        <header className="login-header">
            <div>
                <img src="" alt="Logo" />
                <span>LearnHub</span>
            </div>

            <nav>
                <span>
                    Don't Have an account?
                    <a href="/Signup">Sign up</a>
                </span>
            </nav>
        </header>
    );
}

export default AuthHeader;