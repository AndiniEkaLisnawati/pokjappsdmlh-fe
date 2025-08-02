import Slide from "@/components/main/Slide";

export default function Content() {
    const items = [
        {id: 1, title: "Kerjasama, Akreditasi, LPK", path:"/kerjasama-akreditasi-lpk", image: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600"},
        {id: 2, title: "Pelatihan",path:"/pelatihan", image: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=600"},
        {id: 3, title: "Kerjasama Pelatihan",path:"/kerjasama-pelatihan", image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=600"},
        {id: 4, title: "Dokumentasi Kegiatan",path:"/dokumentasi-kegiatan", image: "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=600"},
        {id: 5, title: "Kurikulum",path:"/kurikulum", image: "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=600"},
        {id: 6, title: "Silabus",path:"/silabus", image: "https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=600"}
    ];

    return (
        <section className="py-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 bg-gray-50 dark:bg-gray-900">
            {items.map((item) => (
                <Slide key={item.id} id={item.id} title={item.title} image={item.image} path={item.path} />
            ))}
        </section>
    );
}
