import React from 'react'
import BaseCard from './BaseCard';
import Image from 'next/image';
import PDFViewer from './PDFViewer';

interface AccreditationCardProps{
    institution: string;
    status: string;
    skNumber: string;
    issuedAt: string;
    skUrl?: string;
}

const AccreditationCard = ({institution, status, skNumber, skUrl, issuedAt}:AccreditationCardProps) => {
  return (
    <div>
        <BaseCard className=''>
        <div className="flex flex-col items-start">

        <div className="flex gap-5 justify-center items-center">
      
            <div className="font-semibold text-xl text-gray-800 dark:text-slate-50">{institution}</div>
    </div>
            <div className="text-gray-800 dark:text-slate-50">SK: {skNumber}</div>
            <div className="text-gray-800 dark:text-slate-50">Status: <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-md">
    {status}
  </span></div>
            <div className="text-gray-800 dark:text-slate-50">Tanggal Terbit: {issuedAt}</div>
        {skUrl &&
                <PDFViewer fileUrl={skUrl} name="Lihat Sertifikat"/>
            }
            </div>
        </BaseCard>
    </div>
  )
}

export default AccreditationCard