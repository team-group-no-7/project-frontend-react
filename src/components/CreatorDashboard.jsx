import React, { useState } from "react";
import { BookOpen, Settings, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreatorDashboard({ uploadedContents, profile, onSaveSettings }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  // Handle settings form save
  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    setIsEditing(false);
  };

  // Helper to map category_id to tag name
  const getCategoryName = (categoryId) => {
    const categories = { 1: "Java", 2: "DSA", 3: "Web Dev", 4: "System Design" };
    return categories[categoryId] || "General";
  };

  return (
    <Tabs defaultValue="uploads" className="w-full">
      <TabsList className="grid grid-cols-2 mb-6 bg-white dark:bg-[#121124] border border-gray-200 dark:border-gray-800 p-1 rounded-lg">
        <TabsTrigger value="uploads" className="gap-2 py-2.5 rounded-md text-sm">
          <BookOpen className="h-4 w-4" /> Content List
        </TabsTrigger>
        <TabsTrigger value="settings" className="gap-2 py-2.5 rounded-md text-sm">
          <Settings className="h-4 w-4" /> Account Settings
        </TabsTrigger>
      </TabsList>

      {/* Content List Tab (Matches CONTENTS schema columns) */}
      <TabsContent value="uploads">
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124]">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-bold">Uploaded Content</CardTitle>
              <CardDescription>Manage your published learning resources.</CardDescription>
            </div>
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white font-medium">Upload New</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadedContents.map((content) => (
              <div key={content.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-100 dark:border-gray-800/80 rounded-lg gap-3 hover:shadow-md transition-shadow">
                <div>
                  <Badge className="bg-amber-50 dark:bg-amber-950/20 text-amber-500 border-amber-500 font-semibold mb-1" variant="outline">
                    {getCategoryName(content.category_id)}
                  </Badge>
                  <h4 className="font-semibold text-base text-gray-900 dark:text-white">{content.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{content.description}</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="font-bold text-gray-900 dark:text-white">
                    {content.price > 0 ? `₹${content.price}` : "Free"}
                  </span>
                  <Button size="sm" variant="outline" className="border-gray-300 dark:border-gray-700 font-medium">Edit Details</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Account Settings Tab (Strictly matches USERS columns) */}
      <TabsContent value="settings">
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121124]">
          <CardHeader className="flex flex-row justify-between items-center space-y-0">
            <div>
              <CardTitle className="text-lg font-bold">Account Settings</CardTitle>
              <CardDescription>Update your credentials mapped to the USERS table.</CardDescription>
            </div>
            {!isEditing && (
              <Button size="sm" variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-medium" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="u-name">Full Name</Label>
                  <Input
                    id="u-name"
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-gray-50/50 dark:bg-black/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="u-email">Email Address</Label>
                  <Input
                    id="u-email"
                    type="email"
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-gray-50/50 dark:bg-black/20"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-2 justify-end pt-3">
                  <Button type="button" variant="ghost" onClick={() => { setIsEditing(false); setFormData({ ...profile }); }}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 font-medium">
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
