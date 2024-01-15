import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link
        href={"/"}
        className="text-xl font-bold tracking-wide text-2xl font-bold "
      >
        ordino
      </Link>
    </div>
  );
};

export default Logo;
