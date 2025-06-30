'use client';

import { useState } from "react";
import Image from "next/image";

interface Widyaiswara {
  id: string;
  name: string;
  bidang: string;
  instansi: string;
  totalPelatihan: number;
  fotoUrl: string;
  pengalaman: string[];
}

const dummyData: Widyaiswara[] = [
  {
    id: "1",
    name: "Dr. Brando",
    bidang: "Diklat Kepemimpinan",
    instansi: "BPSDM",
    totalPelatihan: 12,
    fotoUrl: "https://www.scm.co.id/files/Image/Zulfikar.png",
    pengalaman: [
      "Pelatihan Kepemimpinan Nasional",
      "Workshop Manajemen ASN",
    ],
  },
  {
    id: "2",
    name: "  Brando",
    bidang: "Administrasi Publik",
    instansi: "LAN RI",
    totalPelatihan: 8,
    fotoUrl: "https://www.scm.co.id/files/Image/Zulfikar.png",
    pengalaman: [
      "Seminar Tata Kelola Pemerintahan",
      "Pelatihan Reformasi Birokrasi",
    ],
  },
  {
    id: "2",
    name: "  Brando",
    bidang: "Administrasi Publik",
    instansi: "LAN RI",
    totalPelatihan: 8,
    fotoUrl: "https://www.scm.co.id/files/Image/Zulfikar.png",
    pengalaman: [
      "Seminar Tata Kelola Pemerintahan",
      "Pelatihan Reformasi Birokrasi",
    ],
  },
  {
    id: "2",
    name: "  Brando",
    bidang: "Administrasi Publik",
    instansi: "LAN RI",
    totalPelatihan: 8,
    fotoUrl: "https://www.scm.co.id/files/Image/Zulfikar.png",
    pengalaman: [
      "Seminar Tata Kelola Pemerintahan",
      "Pelatihan Reformasi Birokrasi",
    ],
  },
  {
    id: "2",
    name: "  Brando",
    bidang: "Administrasi Publik",
    instansi: "LAN RI",
    totalPelatihan: 8,
    fotoUrl: "https://www.scm.co.id/files/Image/Zulfikar.png",
    pengalaman: [
      "Seminar Tata Kelola Pemerintahan",
      "Pelatihan Reformasi Birokrasi",
    ],
  },
  {
    id: "2",
    name: "  Brando",
    bidang: "Administrasi Publik",
    instansi: "LAN RI",
    totalPelatihan: 8,
    fotoUrl: "https://www.scm.co.id/files/Image/Zulfikar.png",
    pengalaman: [
      "Seminar Tata Kelola Pemerintahan",
      "Pelatihan Reformasi Birokrasi",
    ],
  },
];

export default function PortoNasum() {
  const [selected, setSelected] = useState<Widyaiswara | null>(null);

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-800 dark:text-slate-50">Portofolio Widyaiswara</h1>
      <div className="w-30 h-1 bg-teal-800 dark:bg-white mx-auto rounded-full mb-2"></div>
      <p className="text-lg font-lg text-center text-teal-800 dark:text-slate-50 mb-4">Untuk detail Klik bagian kotak narasumber</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
       {dummyData.map((d) => (
  <div
    key={d.id}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 
      hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out 
      cursor-pointer transform"
    onClick={() => setSelected(d)}
  >
    <Image
      src={d.fotoUrl}
      alt={d.name}
      className="w-full h-40 object-cover rounded-md mb-4"
    />
    <h2 className="text-xl font-semibold">{d.name}</h2>
    <p className="text-sm text-gray-600 dark:text-gray-400">{d.bidang}</p>
    <p className="text-sm">Instansi: {d.instansi}</p>
    <p className="text-sm">Total Pelatihan: {d.totalPelatihan}</p>
  </div>
))}

      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-4 text-gray-600 dark:text-gray-300 text-xl"
              onClick={() => setSelected(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
              {selected.bidang} | {selected.instansi}
            </p>
            <p className="font-semibold">Riwayat Pelatihan:</p>
            <ul className="list-disc list-inside">
              {selected.pengalaman.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
