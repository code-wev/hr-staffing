"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FiPhone, FiClock, FiMail, FiMapPin, FiEyeOff } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// ========================================
// MAIN COMPONENT
// ========================================
export default function Profile() {
  const { data: session, status } = useSession();

  // UI States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);

  const [preview, setPreview] = useState(null);

  // Profile data state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    companyName: "",
    phoneNumber: "",
    location: "",
    profileImage: "",
  });

  // Password state
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Detect Role
  const role = profile.role || session?.user?.role || "admin";

  // IMAGE UPLOAD + PREVIEW
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    const toastId = toast.loading("Uploading image...");

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (!res.ok || !data?.data?.url) throw new Error("Upload failed");

      const imageUrl = data.data.url;

      setProfile((prev) => ({ ...prev, profileImage: imageUrl }));

      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileImage: imageUrl }),
      });

      toast.success("Profile image updated!", { id: toastId });
    } catch (err) {
      toast.error("Image upload failed!", { id: toastId });
      setPreview(null);
    }
  };

  // LOAD PROFILE
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/profile");
        const data = await res.json();

        setProfile({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "",
          companyName: data.companyName || "",
          phoneNumber: data.phoneNumber || "",
          location: data.location || "",
          profileImage: data.profileImage || "",
        });
      } catch {
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [status]);

  // SAVE PROFILE
  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const body =
        role === "client"
          ? {
              companyName: profile.companyName,
              phoneNumber: profile.phoneNumber,
              location: profile.location,
            }
          : role === "applicant"
          ? {
              name: profile.name,
              phoneNumber: profile.phoneNumber,
              location: profile.location,
            }
          : role === "admin"
          ? {
              name: profile.name,
              phoneNumber: profile.phoneNumber,
              location: profile.location,
            }
          : {};

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Error saving profile");
      } else {
        toast.success("Profile updated successfully.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // UPDATE PASSWORD
  const handlePasswordUpdate = async () => {
    try {
      setPasswordSaving(true);
      setPasswordMessage(null);

      const res = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      toast.success("Password updated successfully.");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      toast.error("Error updating password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-24">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Toaster position="top-center" />

      {/* ================= TOP HEADER ================= */}
      <div className="w-full bg-[#F5F5F5] pt-16 pb-12 flex flex-col items-center text-center">
        <h1 className="text-5xl font-semibold text-[#333] tracking-tight">
          {role === "client"
            ? profile.companyName?.trim() || "Your Company Name"
            : profile.name?.trim() || "Your Name"}
        </h1>

        <div className="mt-6 flex flex-col gap-3 text-sm text-[#4A4A4A]">
          <div className="flex items-center justify-center gap-10">
            <div className="flex items-center gap-2">
              <FiPhone size={15} />
              <span>
                {profile.phoneNumber?.trim()
                  ? `Phone: ${profile.phoneNumber}`
                  : "Phone: ---"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FiMail size={15} />
              <span className="flex gap-1">
                Email:
                <a className="underline">{profile.email?.trim() || "---"}</a>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FiMapPin size={15} />
              <span>
                {profile.location?.trim()
                  ? profile.location
                  : "Location not set"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="w-full mx-auto px-10 mt-12">
        {/* ALWAYS SHOW PROFILE FORM FOR ALL ROLES */}
        <>
          {/* IMAGE */}
          <div className="flex items-start gap-6 mb-6">
            <label className="w-16 h-16 rounded-full border border-[#D6D5D699] flex items-center justify-center cursor-pointer bg-white hover:bg-gray-50 overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl text-gray-500">+</span>
              )}

              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="text-[16px] font-medium text-[#333] mb-4">
            Basic Information
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ADMIN FIELDS */}
            {role === "admin" && (
              <>
                <Field
                  label="Name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
                <Field label="Email" value={profile.email} readOnly disabled />
                <Field
                  label="Phone Number"
                  value={profile.phoneNumber}
                  onChange={(e) =>
                    setProfile({ ...profile, phoneNumber: e.target.value })
                  }
                />
                <Field
                  label="Location"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                />
              </>
            )}

            {/* CLIENT FIELDS */}
            {role === "client" && (
              <>
                <Field
                  label="Company Name"
                  value={profile.companyName}
                  onChange={(e) =>
                    setProfile({ ...profile, companyName: e.target.value })
                  }
                />
                <Field
                  label="Email Address"
                  value={profile.email}
                  readOnly
                  disabled
                />
                <Field
                  label="Phone Number"
                  value={profile.phoneNumber}
                  onChange={(e) =>
                    setProfile({ ...profile, phoneNumber: e.target.value })
                  }
                />
                <Field
                  label="Location"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                />
              </>
            )}

            {/* APPLICANT FIELDS */}
            {role === "applicant" && (
              <>
                <Field
                  label="Name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
                <Field label="Email" value={profile.email} readOnly disabled />
                <Field
                  label="Phone Number"
                  value={profile.phoneNumber}
                  onChange={(e) =>
                    setProfile({ ...profile, phoneNumber: e.target.value })
                  }
                />
                <Field
                  label="Location"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                />
              </>
            )}
          </div>

          {/* SAVE BUTTON */}
          {message && <p className="mt-4 text-sm text-[#0694A2]">{message}</p>}

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 px-6 py-2.5 bg-[#0694A2] text-white rounded-md text-sm hover:bg-[#057b87] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </>

        {/* PASSWORD SECTION */}
        <h2 className="text-[20px] font-semibold text-[#333] mt-12 mb-6">
          Change Password
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PasswordInput
            label="Current Password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
          />

          <PasswordInput
            label="New Password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
          />

          <PasswordInput
            label="Confirm New Password"
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
          />
        </div>

        {passwordMessage && (
          <p className="mt-4 text-sm text-[#0694A2]">{passwordMessage}</p>
        )}

        <button
          onClick={handlePasswordUpdate}
          disabled={passwordSaving}
          className="mt-6 px-6 py-2.5 bg-[#0694A2] text-white rounded-md text-sm hover:bg-[#057b87] disabled:opacity-50"
        >
          {passwordSaving ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}

//
// =================== REUSABLE COMPONENTS ===================
function Field({ label, value, onChange, readOnly, disabled }) {
  const isPhone = label === "Phone Number";

  return (
    <div>
      <label className="text-sm text-[#555] mb-1 block">{label}</label>

      <input
        type={isPhone ? "tel" : "text"}
        inputMode={isPhone ? "numeric" : undefined}
        pattern={isPhone ? "[0-9]*" : undefined}
        onKeyDown={(e) => {
          if (isPhone) {
            // allow backspace, delete, arrows, tab
            if (
              [
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "Tab",
              ].includes(e.key)
            )
              return;

            // block if key is NOT a number (0–9)
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }
        }}
        value={value}
        onChange={(e) => {
          // Prevent non-numeric paste
          if (isPhone) {
            const onlyNums = e.target.value.replace(/\D/g, "");
            onChange({ target: { value: onlyNums } });
          } else {
            onChange(e);
          }
        }}
        readOnly={readOnly}
        disabled={disabled}
        className={`
          w-full border border-[#D6D5D699] rounded-md py-2.5 px-4 text-sm
          text-[#333] placeholder:text-[#B3B3B3] focus:outline-none
          ${disabled ? "bg-[#F5F5F5] cursor-not-allowed" : "bg-white"}
        `}
      />
    </div>
  );
}

function PasswordInput({ label, value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="text-sm text-[#555] mb-1 block">{label}</label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="
            w-full border border-[#D6D5D699] rounded-md py-2.5 px-4 text-sm
            text-[#333] placeholder:text-[#B3B3B3] focus:outline-none
          "
        />

        {/* Toggle Eye Icon */}
        <div
          onClick={() => setShow(!show)}
          className="absolute right-3 top-3.5 text-[#888] cursor-pointer"
        >
          {show ? (
            <FiEyeOff size={18} />
          ) : (
            <FiEyeOff size={18} className="opacity-50" />
          )}
        </div>
      </div>
    </div>
  );
}
