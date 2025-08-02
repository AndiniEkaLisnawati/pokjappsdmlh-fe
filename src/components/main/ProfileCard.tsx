import React from "react";
import Image from "next/image";
import PDFViewer from "@/components/main/PDFViewer";
import BaseCard from "./BaseCard";

interface ProfileCardProps {
  Logo: string;
  name: string;
  field: string;
  since: number;
  
}

export default function ProfileCard({
  Logo,
  name,
  field,
  since,
}: ProfileCardProps) {
  return (
    <div>
      <BaseCard className="">
        <div className="flex flex-col justify-start items-center">
          <div className="Logo flex gap-2.5">
            <Image src={Logo} width={60} height={10} alt="logo" />
            <h1 className="font-bold text-black dark:text-slate-50 transition-colors duration-500 text-md text-start">
              {name}
            </h1>
          </div>
          <div className="flex flex-col relative items-start">
            <p className="text-sm dark:text-slate-50 transition-colors duration-500">
              Bidang : {field}
            </p>
            <p className="text-sm dark:text-slate-50 transition-colors duration-500">
              Sejak: {since}
            </p>
          </div>

          <div className="pt-2">
            <PDFViewer fileUrl="../../../files/MoU.pdf" name="Lihat MoU"></PDFViewer>
          </div>
        </div>
      </BaseCard>
    </div>
  );
}
