import { MemberProfile, NavLinks, SidebarHeader } from "..";
import { CgTrees } from "react-icons/cg";

const Sidebar = () => {
  return (
    <div className="min-h-full px-4 py-8 bg-primary border-r border-gray-400/15 w-72 grid grid-rows-[auto,1fr,auto] relative">
      <SidebarHeader />
      <NavLinks />
      {/* <MemberProfile /> */}

      <div className="absolute -bottom-[7px] -left-[25px] text-[15rem] text-gray-200 dark:text-gray-200/10 -z-10">
        <CgTrees />
      </div>
    </div>
  );
};

export default Sidebar;
