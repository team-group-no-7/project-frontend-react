import DashboardLayout from "../components/layout/DashboardLayout";
import SettingsForm from "../components/common/SettingsForm";

function Settings() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your account preferences and security.
        </p>
      </div>

      <SettingsForm />
    </DashboardLayout>
  );
}

export default Settings;