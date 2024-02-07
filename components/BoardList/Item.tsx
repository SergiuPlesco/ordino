"use client";
import React, { forwardRef, useState, useRef } from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Button } from "../ui/button";
import { GripVerticalIcon, Trash2Icon, Settings2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import ItemMenu from "./ItemMenu";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const Item = forwardRef(
  (
    {
      id,
      props,
      style,
      field,
      index,
      attributes,
      listeners,
      isDragging,
      dragOverlay,
      value,
    }: {
      id: UniqueIdentifier;
      props?: any;
      style?: any;
      field?: any;
      index: number;
      attributes?: any;
      listeners?: any;
      isDragging?: boolean;
      dragOverlay?: boolean | undefined;
      value: any;
    },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isEditing = searchParams.has("isEditing");
    const boardId = searchParams.get("boardId");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleBlur = () => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("isEditing");

      replace(`${pathname}?${params.toString()}`);
      buttonRef.current?.focus();
    };

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          "flex w-[300px] p-2 border rounded ",
          dragOverlay ? "bg-white scale-105" : ""
        )}
        onClick={() => console.log("board", value)}
      >
        <div
          className="flex w-full items-center gap-2"
          data-cypress="draggable-item"
        >
          <div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="flex justify-center items-center gap-1"
              {...attributes}
              {...listeners}
            >
              <GripVerticalIcon className="w-4 h-4" />
              <Label className="font-bold leading-normal">{index + 1} </Label>
            </Button>
          </div>
          <div className="flex flex-1 justify-between items-center gap-2">
            {isEditing && boardId === value ? (
              <Input
                id={value}
                ref={(input) => input && input.focus()}
                value={value}
                className={cn(
                  "leading-normal",
                  dragOverlay ? "bg-fuchsia-300" : ""
                )}
                onChange={() => {}}
                onBlur={handleBlur}
                readOnly={dragOverlay}
              />
            ) : (
              <p className="flex items-center px-3 py-1 h-9 text-sm leading-normal">
                {value}
              </p>
            )}

            <ItemMenu value={value} inputRef={inputRef} />
          </div>
        </div>
      </div>
    );
  }
);
