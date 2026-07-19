function Login() {
    return (
        <div className="login-container">
            <header>
                <div>
                    <img src="" alt="Logo" />
                    <span>LearnHub</span>
                </div> {/* Correctly closed the inner div */}

                <nav>
                    <a href="/Signup">Don't Have an account? Sign up</a>
                </nav>
            </header>

            <main className="login-main">
                <article className="login-box">
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
                </article>
            </main>
        </div>
    );
}

export default Login;