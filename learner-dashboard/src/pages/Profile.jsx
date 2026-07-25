import DashboardLayout from "../components/layout/DashboardLayout";
import ProfileForm from "../components/common/ProfileForm";

function Profile() {
  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Learner Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your account details and learning preferences.
        </p>

      </div>

      <ProfileForm />

    </DashboardLayout>
  );
}

export default Profile;