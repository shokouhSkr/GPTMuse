import { ThemeToggle } from "@/components";
import { SiOpenai } from "react-icons/si";

const SidebarHeader = () => {
  return (
    <div className="flex items-center my-4 gap-4 px-3">
      <SiOpenai className="w-6 h-6 text-primary" />
      <h2 className="text-xl text-primary mr-auto font-medium">GPTMuse</h2>
      <ThemeToggle />
    </div>
  );
};

export default SidebarHeader;
