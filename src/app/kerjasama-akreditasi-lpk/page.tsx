"use client";
import Jumbotron from "@/app/kerjasama-akreditasi-lpk/img/Jumbotron.png";
import Image from "next/image";
import GoToTop from "@/components/main/GoToTop";
import Card from "@/components/main/ProfileCard";
import KLHK from "@/app/kerjasama-akreditasi-lpk/img/Klhk.png";
import AccreditationCard from "@/components/main/AccreditationCard";
import BAN from "@/app/kerjasama-akreditasi-lpk/img/BAN.png";
import LpkCard from "@/components/main/LpkCard";
import Worker from "@/app/kerjasama-akreditasi-lpk/img/Worker.png";
import GoToHome from "@/components/main/GoToHome";

export default function Page() {

  const collabs = [
    {
      Logo: KLHK,
      name: "Kementrian Lingkungan Hidup dan Kehutanan",
      field: "Pengolah sampah",
      since: 2019,
    },
    {
      Logo: KLHK,
      name: "Kementrian Lingkungan Hidup dan Kehutanan",
      field: "Pengolah sampah",
      since: 2019,
    },
    {
      Logo: KLHK,
      name: "Kementrian Lingkungan Hidup dan Kehutanan",
      field: "Pengolah sampah",
      since: 2019,
    },
  ];

  const Accreditations = [
    {
      skUrl: "KLHK",
      institution: "BNSP",
      status: "Unggul",
      skNumber: "1234/SK/BAN-PT/Ak/S/XI/2023",
      issuedAt: "8 aug 2025",
    },
    {
      skUrl: "",
      institution: "BNSP",
      status: "Unggul",
      skNumber: "1234/SK/BAN-PT/Ak/S/XI/2023",
      issuedAt: "8 aug 2025",
    },
    {
      skUrl: "",
      institution: "BNSP",
      status: "Unggul",
      skNumber: "1234/SK/BAN-PT/Ak/S/XI/2023",
      issuedAt: "8 aug 2025",
    },
    {
      skUrl: "",
      institution: "BNSP",
      status: "Unggul",
      skNumber: "1234/SK/BAN-PT/Ak/S/XI/2023",
      issuedAt: "8 aug 2025",
    },
  ];

  const LPKList = [
    {
      name: "LPK Hijau Nusantara",
      description:
        "Menyediakan pelatihan intensif tentang pengelolaan sampah rumah tangga, daur ulang, serta sistem bank sampah komunitas untuk masyarakat urban dan rural.",
      tag: "Pelatihan Pengelolaan Sampah",
      tagColor: "bg-green-100 text-green-800",
      logo: KLHK,
    },
    {
      name: "LPK EcoSkill Indonesia",
      description:
        "Fokus pada pelatihan konservasi alam, restorasi ekosistem, dan edukasi lingkungan berbasis komunitas, dengan pendekatan praktik lapangan dan materi digital.",
      tag: "Konservasi & Lingkungan",
      tagColor: "bg-blue-100 text-blue-800",
      logo: KLHK,
    },
    {
      name: "LPK Mandiri Lestari",
      description:
        "Menawarkan pelatihan tenaga kerja terampil untuk sektor energi terbarukan seperti panel surya, biogas, dan efisiensi energi di lingkungan pemukiman.",
      tag: "Energi Terbarukan",
      tagColor: "bg-amber-100 text-amber-800",
      logo: KLHK,
    },
    {
      name: "LPK Hijau Nusantara",
      description:
        "Menyediakan pelatihan intensif tentang pengelolaan sampah rumah tangga, daur ulang, serta sistem bank sampah komunitas untuk masyarakat urban dan rural.",
      tag: "Pelatihan Pengelolaan Sampah",
      tagColor: "bg-green-100 text-green-800",
      logo: KLHK,
    },
    {
      name: "LPK EcoSkill Indonesia",
      description:
        "Fokus pada pelatihan konservasi alam, restorasi ekosistem, dan edukasi lingkungan berbasis komunitas, dengan pendekatan praktik lapangan dan materi digital.",
      tag: "Konservasi & Lingkungan",
      tagColor: "bg-blue-100 text-blue-800",
      logo: KLHK,
    },
    {
      name: "LPK Mandiri Lestari",
      description:
        "Menawarkan pelatihan tenaga kerja terampil untuk sektor energi terbarukan seperti panel surya, biogas, dan efisiensi energi di lingkungan pemukiman.",
      tag: "Energi Terbarukan",
      tagColor: "bg-amber-100 text-amber-800",
      logo: KLHK,
    },
  ];

  return (
    <div className="w-full min-h-screen gap-10 bg-gray-100 dark:bg-gray-900 transition-colors duration-700 flex flex-col items-center px-4">
      {/* Jumbotron */}
      <div className="top-0 left-0 right-0 w-screen h-[50vh] flex justify-center items-center bg-gradient-to-t from-white to-sky-200 dark:from-gray-700 dark:to-black transition-all duration-700">
        <Image
          src={Jumbotron}
          alt="jumbotron"
          width={430}
          height={450}
          className="drop-shadow-xl relative w-auto h-full rounded-lg"
          priority
        />
      </div>

      {/* Konten Utama */}
      <div className=" flex flex-col items-center text-center gap-4">
        <div className="kerjasama flex flex-col gap-3 justify-center items-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-wide transition-all duration-500">
            Kerjasama
          </h1>
          <div className="w-52 h-1.5 bg-teal-300 rounded-3xl" />

          <p className="text-teal-900 dark:text-gray-300 max-w-xl">
            Kami bekerjasama dengan berbagai mitra untuk pelatihan dan
            pengembangan sumber daya manusia di bidang lingkungan hidup.
          </p>
          <div className="flex flex-col md:flex-row gap-5">
            {collabs.map((collab, idx) => (
              <Card
                key={idx}
                Logo={collab.Logo}
                name={collab.name}
                field={collab.field}
                since={collab.since}
              ></Card>
            ))}
          </div>
        </div>

        <div className="Akreditasi flex flex-col gap-3 pt-5 relative justify-center items-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-wide transition-all duration-500">
            Akreditasi
          </h1>
          <div className="w-52 h-1.5 bg-teal-300 rounded-3xl" />

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[2fr_1fr] gap-4 w-full max-w-6xl mx-auto bg-teal-50 px-4 sm:px-0 h-auto sm:h-[500px] overflow-hidden rounded-xl shadow-md">
            <div className="bg-slate-50 dark:bg-slate-100 w-full h-full p-6 flex flex-col justify-center space-y-4">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                Akreditasi Resmi POKJAPPSDMLH
              </h1>

              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                Lembaga ini telah terakreditasi oleh Badan Akreditasi Nasional
                sebagai bentuk pengakuan atas komitmen dalam menjaga mutu
                pendidikan dan standar pelayanan. Status akreditasi mencerminkan
                kualitas penyelenggaraan dan sistem manajemen yang telah sesuai
                dengan kriteria nasional.
              </p>

              <span className="inline-block mt-3 bg-emerald-100 text-emerald-700 text-sm font-medium px-4 py-1 rounded-full w-max">
                Terakreditasi A – BAN-PT
              </span>

              <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-4 sm:gap-10">
                <Image
                  width={50}
                  height={50}
                  src={BAN}
                  alt="Logo BAN-PT"
                  className="w-20 opacity-70 mt-2 sm:mt-4"
                />

                <div className="text-sm text-gray-600 space-y-1">
                  <p>SK No: 1234/BAN-PT/Ak/X/2023</p>
                  <p>Berlaku hingga: Oktober 2028</p>
                  <a
                    href="/files/sertifikat-akreditasi.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Lihat Sertifikat Akreditasi →
                  </a>
                </div>
              </div>

              <blockquote className="italic text-sm text-gray-600 border-l-4 border-teal-400 pl-3 mt-6">
                “Kami berkomitmen pada mutu, integritas, dan pelayanan
                berstandar nasional.”
              </blockquote>
            </div>

            <div className="w-full h-full flex flex-col justify-start items-center gap-2 p-2 overflow-y-auto">
              {Accreditations.map((Accreditation, idx) => (
                <AccreditationCard
                  key={idx}
                  skUrl={Accreditation.skUrl}
                  institution={Accreditation.institution}
                  status={Accreditation.status}
                  skNumber={Accreditation.skNumber}
                  issuedAt={Accreditation.issuedAt}
                ></AccreditationCard>
              ))}
            </div>
          </div>
        </div>
        <div className="LPK relative flex flex-col gap-6 justify-center items-center px-4 py-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-wide transition-all duration-500">
            LPK
          </h1>
          <div className="w-52 h-1.5 bg-teal-300 rounded-3xl" />

          <p className="text-teal-900 dark:text-gray-300 max-w-xl text-center">
            Kami bekerjasama dengan berbagai Lembaga Pelatihan Kerja (LPK) untuk
            mencetak tenaga terampil di bidang lingkungan hidup, pengelolaan
            sampah, serta konservasi dan keberlanjutan.
          </p>
          <div className="flex md:flex-row items-center gap-10">
            <div className="grid grid-cols-1 max-h-[650px] py-5 sm:grid-cols-2 md:grid-cols-1 gap-6 w-full max-w-6xl mt-8 overflow-y-auto">
              {LPKList.map((list, idx) => (
                <LpkCard
                  key={idx}
                  name={list.name}
                  tag={list.tag}
                  tagColor={list.tagColor}
                  logo={list.logo}
                  description={list.description}
                />
              ))}
            </div>
            <div className="hidden md:block w-full items-center shadow-md rounded-2xl bg-slate-50 h-auto">
            
              <Image
                src={Worker}
                width={500}
                height={100}
                alt="pekerja"
              ></Image>
            </div>
          </div>
        </div>

        <GoToTop />
        <GoToHome />
      </div>
    </div>
  );
}
