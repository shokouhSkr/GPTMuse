import { ThemeToggle } from "@/components";
import { SiOpenai } from "react-icons/si";

const SidebarHeader = () => {
  return (
    <div className="flex items-center mt-4 mb-5 gap-3 px-3 dark:text-gray-100 text-gray-900">
      <SiOpenai className="w-8 h-8" />
      <h2 className="text-xl mr-auto font-medium">OpenCity AI</h2>
      <ThemeToggle />
    </div>
  );
};

export default SidebarHeader;
