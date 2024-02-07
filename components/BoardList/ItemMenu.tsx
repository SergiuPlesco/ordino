import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Settings2Icon } from "lucide-react";

const ItemMenu = ({ value, inputRef }: any) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showInput = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("isEditing", "true");
    params.set("boardId", value);
    replace(`${pathname}?${params.toString()}`);

    inputRef.current?.focus();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:cursor-pointer focus:border-fuchsia-400"
      >
        <Settings2Icon className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={showInput}>Rename Board</DropdownMenuItem>
        <DropdownMenuItem>Delete Board</DropdownMenuItem>
        <DropdownMenuItem>New Board</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ItemMenu;
