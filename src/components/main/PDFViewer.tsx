import React from 'react'

import '@react-pdf-viewer/core/lib/styles/index.css';
import Link from 'next/link';

interface fileUrlProps {
  fileUrl: string;
  name: string;
}

const PDFViewer = ({fileUrl, name}: fileUrlProps) => {
  return (
    <div className='pt-1.5'>
<Link
  href={fileUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-gray-200 dark:bg-gray-700 dark:text-slate-50 px-5 p-1 hover:bg-gray-400 rounded-lg shadow-md transition-all duration-300"
>
 {name}
</Link>

    </div>
  )
}

export default PDFViewer