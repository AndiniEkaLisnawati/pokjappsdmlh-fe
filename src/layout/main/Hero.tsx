'use client';

import MySwiper from '@/components/main/MySwiper';

export default function Hero() {
    const images = [
        "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600"
    ];

    return (
        <section className="min-h-screen relative flex items-center justify-center text-center px-4">
            <div className="absolute right-0 left-0 top-0 bottom-0 flex items-center justify-center">
                {/* <img
                    src={logo}
                    alt="Logo Pokja"
                    className="w-40 mx-auto mb-6 animate-fade-in"
                /> */}
                <MySwiper image={images} />
                <div className='bg-gradient-to-b from-transparent to-slate-100 dark:to-gray-900 drop-shadow-md inset-0 absolute justify-center items-center flex flex-col pt-50'>
                    <h1 className="text-4xl md:text-5xl font-bold text-teal-800 dark:text-white drop-shadow-md">
                        Selamat Datang di POKJAPPSDMLH
                    </h1>
                    <p className="mt-4 drop-shadow-md text-lg text-teal-900 dark:text-teal-400">
                        Platform digital untuk pengelolaan persuratan, dokumentasi, dan kolaborasi.
                    </p>

                    <a
                        href="#persuratan"
                        className="drop-shadow-md inline-block mt-8 bg-teal-600 text-white font-semibold py-3 px-6 rounded-full shadow hover:bg-teal-700 transition"
                    >
                        Lihat Persuratan
                    </a>
                </div>
            </div>
        </section>
    );
}
