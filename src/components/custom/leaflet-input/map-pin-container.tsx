"use client";

import { ElementType, FC } from "react";

// Map Pin Container - shared component for both input and display
export const MapPinContainer: FC<{
  icon: ElementType;
  color: string;
}> = ({ icon: Icon, color }) => {
  return (
    <div className="relative h-10 w-8">
      <svg
        viewBox="0 0 32 42"
        fill={color}
        className="absolute top-0 left-0 h-full w-full"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 9.882 16 26 16 26s16-16.118 16-26C32 7.163 24.837 0 16 0z" />
      </svg>
      <Icon
        className="absolute top-[16px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
        size={18}
      />
    </div>
  );
};
