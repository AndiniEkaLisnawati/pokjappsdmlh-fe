import { useEffect, useState } from "react";
import { HiArrowSmUp } from "react-icons/hi";

export default function GoToTop() {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        setScrolled(window.scrollY > 200);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div onClick={() => window.scrollTo(0, 0)} className={`${scrolled ? 'opacity-100 visible' : 'opacity-0 invisible'} cursor-pointer shadow-2xl transition-all duration-200 p-1 bg-gray-100 dark:bg-gray-800 rounded-md fixed bottom-5 right-5 md:bottom-10 md:right-10 `}>
                <HiArrowSmUp className="w-10 h-10 text-teal-500 shadow-xl" />
            </div>
        </>
    )
}