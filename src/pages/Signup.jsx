import AuthDivider from "../components/AuthDivider";
import AuthFooter from "../components/AuthFooter";
import AuthHeader from "../components/AuthHeader";
import OAuthGoogle from "../components/oAuthGoogle";
import "../styles/Signup.css";

function Signup() {
    return (
        <div className="signup-container">

            <AuthHeader />

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

                    <AuthDivider />

                    <OAuthGoogle />

                </div>

            </main>

            <AuthFooter />

        </div>
    );
}

export default Signup;