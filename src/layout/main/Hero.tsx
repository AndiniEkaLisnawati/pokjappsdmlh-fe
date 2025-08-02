'use client';

import MySwiper from '@/components/main/MySwiper';
import { Button } from '@/components/ui/button';
import {
    Mail,
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
                    <div className="inline-flex items-center space-x-3 mb-6">
                        <Building2 className="w-8 h-8 text-primary" />
                        <span className="text-sm text-teal-600 bg-sky-200 rounded-tr-2xl p-1 font-semibold text-accent uppercase tracking-wider">Platform Internal</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-teal-800">
                            POKJA PPSDMLH
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                        Platform terintegrasi untuk pengelolaan dan koordinasi Pengembangan Program
                        Sumber Daya Manusia Lingkungan Hidup yang efisien dan terstruktur.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button variant="institutional" size="lg" className="shadow-xl bg-teal-950 text-white">
                            <Users className="w-5 h-5 mr-2 text-white" />
                            Portfolio Widyaiswara
                        </Button>
                        <Button variant="outline" size="lg">
                            <Mail className="w-5 h-5 mr-2" />
                            Surat Menyurat
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
