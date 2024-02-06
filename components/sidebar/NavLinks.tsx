"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa6";

const links = [
  { href: "/chat", label: "chat", icon: <FaUser /> },
  { href: "/tours", label: "tours", icon: <FaUser /> },
  { href: "/tours/new-tour", label: "new tour", icon: <FaUser /> },
  { href: "/profile", label: "profile", icon: <FaUser /> },
];

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <ul className="text-base-content space-y-2">
      {links.map(({ href, label, icon }) => {
        const isActive = currentPath.startsWith(href);

        return (
          <li key={label}>
            <Link
              href={href}
              className={`flex flex-1 items-center gap-4 px-4 py-2 rounded-md capitalize text-[13px] font-medium ${
                isActive
                  ? "text-slate-200 bg-blue-600"
                  : "text-slate-500 transition-all duration-200 hover:bg-blue-400 hover:text-black"
              }`}
            >
              <span className="text-sm">{icon}</span>
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
