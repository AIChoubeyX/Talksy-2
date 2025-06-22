import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { getUserProfile, updateUserProfile } from "../lib/api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  LoaderIcon,
  MapPinIcon,
  SaveIcon,
  ShuffleIcon,
  CameraIcon,
  LanguagesIcon,
} from "lucide-react";

import { LANGUAGES } from "../constants";

export default function Settings() {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Fetch profile on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserProfile(); // uses JWT
        setFormData({
          fullName: data.fullName || "",
          bio: data.bio || "",
          nativeLanguage: data.nativeLanguage || "",
          learningLanguage: data.learningLanguage || "",
          location: data.location || "",
          profilePic: data.profilePic || "",
        });
      } catch (err) {
        console.error(err.response?.data || err.message);
        toast.error("Failed to load user data");
      }
    }
    fetchUser();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRandomAvatar = () => {
    const seed = Math.floor(Math.random() * 10000);
    const options = [
      `https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}`,
      `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`,
      `https://robohash.org/${seed}.png?set=set1`,
    ];
    const randomAvatar = options[Math.floor(Math.random() * options.length)];
    setFormData({ ...formData, profilePic: randomAvatar });
    toast.success("New avatar generated!");
  };

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     await updateUserProfile(formData); // ✅ no userId required
  //     toast.success("Profile updated successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Update failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile(formData);
      toast.success("Profile updated successfully!");

      // ✅ This will auto-refresh HomePage
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      navigate("/"); // ✅ step 3 — Redirect to homepage
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <LanguagesIcon className="text-primary size-8" />
            <h1 className="text-3xl font-bold text-center">
              Edit Your Profile
            </h1>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formData.profilePic ? (
                  <img
                    src={formData.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleRandomAvatar}
                className="btn btn-accent"
              >
                <ShuffleIcon className="size-4 mr-2" />
                Generate Random Avatar
              </button>
            </div>

            {/* Full Name */}
            <div className="form-control">
              <label className="label">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            {/* Bio */}
            <div className="form-control">
              <label className="label">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="textarea textarea-bordered h-24"
              />
            </div>

            {/* Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">Native Language</label>
                <select
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={handleChange}
                  className="select select-bordered"
                >
                  <option value="">Select</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">Learning Language</label>
                <select
                  name="learningLanguage"
                  value={formData.learningLanguage}
                  onChange={handleChange}
                  className="select select-bordered"
                >
                  <option value="">Select</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">Location</label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 size-5 opacity-70" />
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input input-bordered pl-10 w-full"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {!loading ? (
                <>
                  <SaveIcon className="size-5 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Saving...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
