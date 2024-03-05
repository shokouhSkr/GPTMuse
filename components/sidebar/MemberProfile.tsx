import { UserButton, auth, currentUser } from "@clerk/nextjs";

const MemberProfile = async () => {
  const user = await currentUser();
  // const { userId } = auth();

  return (
    <div className="px-3 flex items-center gap-4 font-medium text-sm">
      <UserButton afterSignOutUrl="/" />
      <p>{user?.emailAddresses[0].emailAddress}</p>
    </div>
  );
};

export default MemberProfile;
