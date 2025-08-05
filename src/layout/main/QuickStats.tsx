import React from 'react'

const QuickStats = () => {
  return (
    <div>
         <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/70 dark:bg-slate-900/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2 p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Program Pelatihan</div>
            </div>
            <div className="space-y-2 p-6 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300">
              <div className="text-3xl font-bold text-indigo-600">25+</div>
              <div className="text-sm text-gray-600">Widyaiswara</div>
            </div>
            <div className="space-y-2 p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
              <div className="text-3xl font-bold text-purple-600">100+</div>
              <div className="text-sm text-gray-600">Mitra Kerja</div>
            </div>
            <div className="space-y-2 p-6 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors duration-300">
              <div className="text-3xl font-bold text-emerald-600">1000+</div>
              <div className="text-sm text-gray-600">Peserta Terlatih</div>
            </div>
          </div>
        </div>
        </section> 
    </div>
  )
}

export default QuickStats