"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiChatCircleTextBold } from "react-icons/pi";
import { CgTrees, CgTree, CgUser } from "react-icons/cg";

const links = [
  { href: "/chat", label: "chat", icon: <PiChatCircleTextBold /> },
  { href: "/tours", label: "tours", icon: <CgTrees /> },
  { href: "/tours/new-tour", label: "new tour", icon: <CgTree /> },
  { href: "/profile", label: "profile", icon: <CgUser /> },
];

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <ul className="text-base-content space-y-2">
      {links.map(({ href, label, icon }) => {
        const isActive = href === currentPath;

        return (
          <li key={label}>
            <Link
              href={href}
              className={`flex flex-1 items-center gap-4 px-4 py-2 rounded-md capitalize text-[13px] font-medium ${
                isActive
                  ? "text-secondary bg-accent"
                  : "text-[#949eb2] transition-all duration-200 hover:text-secondary"
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
