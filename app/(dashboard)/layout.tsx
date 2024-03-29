import { Sidebar } from "@/components";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      {/* Sidebar toggle */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="fixed top-0 inset-x-0 shadow border-b border-gray-400/20 p-6 bg-white dark:bg-black/5 lg:hidden">
          <label
            htmlFor="my-drawer-2"
            className="drawer-button hover:cursor-pointer lg:hidden fixed top-4 right-4"
          >
            <HiOutlineMenuAlt3 className="size-5 dark:text-gray-100" />
          </label>
        </nav>

        <div className="mt-12 lg:mt-0 lg:pt-14 lg:pb-0">{children}</div>
      </div>

      <div className="drawer-side">
        {/* Sidebar */}
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
