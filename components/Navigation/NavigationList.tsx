import React from "react";
import Link from "next/link";

const NavigationItems = [
  { href: "/features", name: "Features" },
  { href: "/about", name: "About" },
  { href: "/pricing", name: "Pricing" },
  { href: "/dashboard", name: "Dashboard" },
];

const NavigationList = () => {
  return (
    <ul className="flex items-center gap-2 text-xl font-semibold">
      {NavigationItems.map((item) => {
        return (
          <li key={item.name}>
            <Link href={item.href}>{item.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationList;
