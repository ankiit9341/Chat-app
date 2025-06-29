import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 bg-gradient-to-b from-blue-100 via-white to-blue-50">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-white shadow-xl rounded-2xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-700">Profile</h1>
            <p className="mt-1 text-zinc-500">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700
                  p-2 rounded-full cursor-pointer shadow-md transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-500">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-600 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-blue-50 rounded-lg border border-blue-200 text-blue-800">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-600 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-blue-50 rounded-lg border border-blue-200 text-blue-800">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm text-blue-900">
              <div className="flex items-center justify-between py-2 border-b border-blue-200">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
