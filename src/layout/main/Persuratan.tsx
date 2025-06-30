import { BsBoxArrowUpRight } from "react-icons/bs";

export default function Persuratan() {
    const gdriveUrl = process.env.GDRIVE_URL;  
    const embeddedGdriveUrl = process.env.EMBEDDED_GDRIVE_URL;

    const parseUrl = (url: string) => {
       return url.startsWith('https://') ? url : `https://${url}`;
    };

    return (
        <section id="persuratan" className="bg-teal-500 dark:bg-gray-800 py-20 px-4 flex flex-col items-center">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow mb-4">Persuratan</h1>
                <div className="w-30 h-1 bg-white mx-auto"></div>
                <p className="text-lg md:text-xl text-white/90 mt-2">Untuk detail foldernya tekan tombol di bawah</p>
            </div>

            <div className="w-full max-w-5xl aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-lg">
                <iframe
                    className="w-full h-full"
                    src={parseUrl(embeddedGdriveUrl)}
                    frameBorder="0"
                    loading="lazy"
                ></iframe>
            </div>

            <a
                className="mt-10 flex items-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-teal-100 transition duration-300"
                href={parseUrl(gdriveUrl)}
                target="_blank"
                rel="noopener noreferrer"
            >
                <p>Lihat Folder Lengkap</p>
                 <BsBoxArrowUpRight />
            </a>
        </section>
    );
}
