"use client";

import { FileQuestion } from "lucide-react";

interface NoDataProps {
  subject: string; 
}

function NoData({ subject }: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 bg-white border border-dashed border-gray-300 rounded-lg shadow-sm">
      <FileQuestion className="h-12 w-12 text-gray-600 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800">
        Data {subject} Belum Tersedia
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        Informasi {subject} akan ditampilkan di halaman ini apabila sudah tersedia.
      </p>
    </div>
  );
}

export default NoData;