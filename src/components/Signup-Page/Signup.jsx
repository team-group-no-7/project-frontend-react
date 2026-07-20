function Signup() {
    return (
        <>
            <div className="signup-container">
                <header className="signup-header">
                    <div>
                        <img src="" alt="Logo" />
                        <span>LearnHub</span>
                    </div>

                    <nav>
                        <span>Already have an account? <a href="/Login">Log in</a></span>
                    </nav>
                </header>

                <main className="signup-main">
                    <div>
                        <h1>Create your account</h1>
                        <p>Fill in the details below to get started.</p>

                        <form className="signup-form">
                            <div>
                                <label htmlFor="fullName">Full Name:</label>
                                <input type="text" id="fullName"></input>
                            </div>

                            <div>
                                <label htmlFor="email">Email Address:</label>
                                <input type="email" id="email"></input>
                            </div>

                            <div>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password"></input>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input type="password" id="confirmPassword"></input>
                            </div>

                            <button type="submit">Create Account</button>
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
        </>
    );
}

export default Signup;