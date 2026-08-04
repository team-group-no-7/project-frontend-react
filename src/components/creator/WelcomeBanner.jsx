export default function WelcomeBanner({ profile, onCreateResource }) {
    const activeProfile = profile || (() => {
        try { return JSON.parse(localStorage.getItem("learnhub_user")) || {}; }
        catch (e) { return {}; }
    })();
    const firstName = activeProfile?.name ? activeProfile.name.split(' ')[0] : 'Creator';
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6 flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold">Welcome back, {firstName}! <span className="text-2xl">👋</span></h2>
                <p className="text-sm text-slate-500 mt-1">Here's what's happening with your content today.</p>
            </div>
            <div>
                <button 
                    onClick={onCreateResource}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg shadow inline-block hover:from-blue-700 hover:to-blue-600 transition cursor-pointer text-sm font-semibold"
                >
                    + Create New Resource
                </button>
            </div>
        </div>
    )
}
