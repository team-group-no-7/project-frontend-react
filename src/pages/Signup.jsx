import "../styles/Signup.css";

function Signup() {
    return (
        <div className="signup-container">

            <header className="signup-header">

                <div className="logo">
                    <img src="" alt="LearnHub Logo" />
                    <span>LearnHub</span>
                </div>

                <nav className="header-nav">
                    <span>
                        Already have an account?
                        <a href="/Login"> Log In</a>
                    </span>
                </nav>

            </header>

            <main className="signup-main">

                <div className="signup-card">

                    <h1>Create your account</h1>

                    <p className="subtitle">
                        Fill in the details below to get started.
                    </p>

                    <form className="signup-form">

                        <div className="input-group">
                            <label htmlFor="fullName">Full Name</label>

                            <input
                                type="text"
                                id="fullName"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>

                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>

                            <input
                                type="password"
                                id="password"
                                placeholder="Create a password"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        <button
                            className="signup-btn"
                            type="submit"
                        >
                            Create Account
                        </button>

                    </form>

                    <div className="divider">

                        <span className="line"></span>

                        <span className="divider-text">
                            OR
                        </span>

                        <span className="line"></span>

                    </div>

                    <div className="oauth-container">

                        <button
                            className="google-btn"
                            type="button"
                        >
                            Continue with Google
                        </button>

                    </div>

                </div>

            </main>

            <footer className="signup-footer">

                <p>© 2026 LearnHub. All rights reserved.</p>

                <div className="footer-links">
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                </div>

            </footer>

        </div>
    );
}

export default Signup;