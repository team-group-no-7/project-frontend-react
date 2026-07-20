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
                            <input type="email" id="email"></input>
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password"></input>
                        </div>

                        <button type="submit">Log in</button>
                    </form>

                    <div>
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
                </div>
            </main>
        </div>
    );
}

export default Login;