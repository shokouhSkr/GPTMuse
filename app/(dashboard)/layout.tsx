import { Sidebar } from "@/components";
import { HiBars3 } from "react-icons/hi2";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Page content */}
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden fixed top-6 right-6">
          <HiBars3 className="size-5" />
        </label>
        <div className="px-8 py-12 min-h-screen">{children}</div>
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
