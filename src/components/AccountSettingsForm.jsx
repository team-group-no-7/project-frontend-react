import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountSettingsForm({ profile = {}, onSaveProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name || "",
    email: profile.email || "",
    headline: profile.headline || "",
    location: profile.location || "",
    avatarUrl: profile.avatarUrl || ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormData({
      name: profile.name || "",
      email: profile.email || "",
      headline: profile.headline || "",
      location: profile.location || "",
      avatarUrl: profile.avatarUrl || ""
    });
  }, [profile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!onSaveProfile) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await onSaveProfile(formData);
      setIsEditing(false);
    } catch (err) {
      console.error("Account settings save failed:", err);
      setErrorMessage("Unable to save profile changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: profile.name || "",
      email: profile.email || "",
      headline: profile.headline || "",
      location: profile.location || "",
      avatarUrl: profile.avatarUrl || ""
    });
    setErrorMessage("");
  };

  return (
    <Card className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-bold">Account Settings</CardTitle>
          <CardDescription>Update your shared learner / creator account details.</CardDescription>
        </div>
        {!isEditing && (
          <Button
            size="sm"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 font-semibold shadow-sm"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="settings-name">Full Name</Label>
              <Input
                id="settings-name"
                disabled={!isEditing || isSaving}
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-email">Email Address</Label>
              <Input
                id="settings-email"
                type="email"
                disabled
                value={formData.email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-headline">Headline</Label>
              <Input
                id="settings-headline"
                disabled={!isEditing || isSaving}
                value={formData.headline}
                onChange={(e) => setFormData((prev) => ({ ...prev, headline: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-location">Location</Label>
              <Input
                id="settings-location"
                disabled={!isEditing || isSaving}
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="settings-avatar">Avatar URL</Label>
              <Input
                id="settings-avatar"
                disabled={!isEditing || isSaving}
                value={formData.avatarUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, avatarUrl: e.target.value }))}
              />
            </div>
          </div>

          {errorMessage && (
            <div className="text-sm text-red-600 dark:text-red-400">{errorMessage}</div>
          )}

          {isEditing && (
            <div className="flex flex-wrap justify-end gap-2 pt-3">
              <Button type="button" variant="ghost" disabled={isSaving} onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white gap-2 font-semibold shadow-sm">
                <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
