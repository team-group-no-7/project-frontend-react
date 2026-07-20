import AuthFooter from "../components/AuthFooter";
import AuthHeader from "../components/AuthHeader";
import AuthDivider from "../components/AuthDivider";
import OAuthGoogle from "../components/oAuthGoogle";
import "../styles/Login.css";

function Login() {
    return (
        <div className="login-container">

            <AuthHeader />

            <main className="login-main">

                <div className="login-card">

                    <h1>Welcome back!</h1>

                    <p className="subtitle">
                        Login to continue your learning journey.
                    </p>

                    <form className="login-form">

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
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button className="login-btn" type="submit">
                            Log In
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

export default Login;