"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgTrees, CgTree, CgUser } from "react-icons/cg";
import { RiChat1Line } from "react-icons/ri";

const links = [
  {
    href: "/chat",
    label: "chat",
    icon: <RiChat1Line />,
  },
  { href: "/tours", label: "tours", icon: <CgTrees /> },
  { href: "/tours/new-tour", label: "new tour", icon: <CgTree /> },
];

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <ul className="text-base-content space-y-1.5">
      {links.map(({ href, label, icon }) => {
        const isActive = href === currentPath;

        return (
          <li key={label}>
            <Link
              href={href}
              className={`flex flex-1 items-center gap-4 px-4 py-2.5 rounded-md capitalize text-sm font-medium ${
                isActive
                  ? "text-gray-50 bg-emerald-600"
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
