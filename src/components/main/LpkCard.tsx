"use client";
import React from "react";
import Image from "next/image";
import BaseCard from "./BaseCard";

type LpkCardProps = {
  name: string;
  description: string;
  tagColor: string;
  tag: string;
  logo: string;
};

export default function LpkCard({
  name,
  description,
  tag,
  tagColor,
  logo,
}: LpkCardProps) {
  return (
    <div>
      <BaseCard className="">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {name}
            </h2>
            <span
              className={`inline-block ${tagColor} text-xs font-medium px-3 py-1 rounded-full w-max`}
            >
              {tag}
            </span>
          </div>
          <Image
            width={50}
            height={50}
            src={logo}
            alt="pict logo"
            className="w-10 h-10 object-contain"
          />
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </BaseCard>
    </div>
  );
}
