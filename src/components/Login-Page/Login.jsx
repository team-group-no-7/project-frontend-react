function Login() {
    return (
        <div className="login-container">
            <header>
                <div>
                    <img src="" alt="Logo" />
                    <span>LearnHub</span>
                </div>

                <nav>
                    <span>Don't Have an account?<a href="/Signup">Sign up</a></span>
                </nav>
            </header>

            <main className="login-main">
                <div className="login-box">
                    <h1>Welcome back!</h1>
                    <p>Login to continue your learning journey.</p>

                    <form className="login-form">
                        <div>
                            <label htmlFor="email">Email Address:</label>
                            <input type="email" id="email" required></input>
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password"></input>
                        </div>

                        <button type="submit">Log in</button>
                    </form>

                    <div className="divider">
                        <span className="line"></span>
                        <span className="divider-text">or</span>
                        <span className="line"></span>
                    </div>
                    <div className="oauth-container">
                        <button type="button" > {/* onClick={handleGoogleLogin} */}
                            Continue with Google
                        </button>
                    </div>

                </div>
            </main>

            <footer>
                <p>&copy; 2026 LearnHub. All rights reserved.</p>
                <div className="footer-links">
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                </div>
            </footer>
        </div>
    );
}

export default Login;