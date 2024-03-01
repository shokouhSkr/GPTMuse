import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div className="flex flex-col h-[calc(100dvh-70px)] max-w-4xl lg:h-auto mx-auto lg:mx-auto lg:w-full">
      <div className="flex-1 text-sm lg:text-base space-y-2 py-6 overflow-y-auto lg:space-y-6">
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
