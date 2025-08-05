'use client';

import MySwiper from '@/components/main/MySwiper';
import { Button } from '@/components/ui/button';
import {
    Users,
    Building2
} from 'lucide-react';


export default function Hero() {
    const images = [
        "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600"
    ];

    return (
        <section className="min-h-screen relative flex items-center justify-center text-center px-4">
            <div className="absolute right-0 left-0 top-0 bottom-0 flex items-center justify-center">

                <MySwiper image={images} />
                <div className='bg-gradient-to-tr from-transparent to-slate-100/90 dark:to-gray-900 drop-shadow-md inset-0 absolute justify-center items-center flex flex-col'>
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="inline-flex items-center space-x-3 mb-6 animate-bounce-gentle">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">Platform Internal</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                POKJA PPSDMLH
                            </span>
                        </h1>

                        <p className="text-xl text-black dark:text-slate-50 mb-8 max-w-3xl mx-auto animate-slide-up">
                            Platform terintegrasi untuk pengelolaan dan koordinasi Pengembangan Program
                            Sumber Daya Manusia Lingkungan Hidup yang efisien dan terstruktur.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl transition-all duration-300 hover:scale-105">
                                <Users className="w-5 h-5 mr-2" />
                                Portfolio Widyaiswara
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
