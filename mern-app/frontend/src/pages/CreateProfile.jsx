import ProfileEditingCard from "../components/ProfileEditingCard";

export default function CreateProfile() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-secondary text-4xl mb-8 font-semibold">Create your Profile!</h1>
      <ProfileEditingCard />
    </div>
);
}
