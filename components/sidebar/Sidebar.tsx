import { MemberProfile, NavLinks, SidebarHeader } from "..";

const Sidebar = () => {
  return (
    <div className="min-h-full px-4 py-8 bg-base-300 w-72 grid grid-rows-[auto,1fr,auto]">
      <SidebarHeader />
      <NavLinks />
      <MemberProfile />
    </div>
  );
};

export default Sidebar;
