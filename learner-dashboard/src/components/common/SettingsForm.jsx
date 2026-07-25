import { useState } from "react";

function SettingsForm() {
  const [settings, setSettings] = useState({
    name: "Anuj Kumar",
    email: "anuj@email.com",
    phone: "+91 9876543210",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    sessionReminders: true,
    marketingEmails: false,
    theme: "light",
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(settings);

    alert("Settings saved successfully!");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl border bg-white p-8 shadow-sm"
    >
      {/* Account Information */}
      <div>
        <h2 className="mb-5 text-xl font-semibold">
          Account Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <input
            type="text"
            name="name"
            value={settings.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="rounded-xl border p-3"
          />

          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            placeholder="Email"
            className="rounded-xl border p-3"
          />

          <input
            type="text"
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="rounded-xl border p-3"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <h2 className="mb-5 text-xl font-semibold">
          Change Password
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <input
            type="password"
            name="currentPassword"
            value={settings.currentPassword}
            onChange={handleChange}
            placeholder="Current Password"
            className="rounded-xl border p-3"
          />

          <input
            type="password"
            name="newPassword"
            value={settings.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="rounded-xl border p-3"
          />

          <input
            type="password"
            name="confirmPassword"
            value={settings.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="rounded-xl border p-3"
          />
        </div>
      </div>

      {/* Preferences */}
      <div>
        <h2 className="mb-5 text-xl font-semibold">
          Preferences
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />
            Email Notifications
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="sessionReminders"
              checked={settings.sessionReminders}
              onChange={handleChange}
            />
            Session Reminders
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="marketingEmails"
              checked={settings.marketingEmails}
              onChange={handleChange}
            />
            Marketing Emails
          </label>
        </div>
      </div>

      {/* Theme */}
      <div>
        <h2 className="mb-5 text-xl font-semibold">
          Theme
        </h2>

        <select
          name="theme"
          value={settings.theme}
          onChange={handleChange}
          className="rounded-xl border p-3"
        >
          <option value="light">
            Light
          </option>

          <option value="dark">
            Dark
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-indigo-600 px-8 py-3 text-white transition hover:bg-indigo-700"
      >
        Save Changes
      </button>
    </form>
  );
}

export default SettingsForm;