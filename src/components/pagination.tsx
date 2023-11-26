'use client';
import React, { useEffect, useState } from 'react';
import { ArrowIcon } from './ui/arrow';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
    totalPages: number;
};

const Pagination = ({ totalPages }: Props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const maxPageButtons = 5;
    const searchParams = useSearchParams()
    const pages = Array.from({ length: totalPages }, (_, index) => index);
    const startIndex = currentPage <= 3 ? 0 : currentPage - 3;
    const visiblePages = pages.slice(startIndex, startIndex + maxPageButtons);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const page = parseInt(searchParams.get('page') || '0');
        
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages,searchParams])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push(pathname + '?' + params.toString());

    };

    return (
        <div className="flex justify-center p-4">
            <button
                className="mx-1 px-3 py-2 bg-cyan-900 text-white rounded  hover:bg-cyan-800 disabled:bg-gray-400"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 0}
            >
                <ArrowIcon direction="double-left" />
            </button>
            <button
                className="mx-1 px-3 py-2 bg-cyan-900 text-white rounded  hover:bg-cyan-800 disabled:bg-gray-400"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                <ArrowIcon direction="left" />
            </button>
            {visiblePages.map(page => (
                <button
                    key={page}
                    className={`mx-1 px-3 py-2 rounded bg-cyan-900 hover:bg-cyan-800 text-white disabled:bg-gray-400`}
                    onClick={() => handlePageChange(page)}
                    disabled={page === currentPage}
                >
                    {page + 1}
                </button>
            ))}
            <button
                className="mx-1 px-3 py-2 bg-cyan-900 text-white rounded  hover:bg-cyan-800 disabled:bg-gray-400"
                onClick={() => handlePageChange(currentPage)}
                disabled={currentPage === totalPages -1}
            >
                <ArrowIcon direction="right" />
            </button>
            <button
                className="mx-1 px-3 py-2 bg-cyan-900 text-white rounded  hover:bg-cyan-800 disabled:bg-gray-400"
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
            >
                <ArrowIcon direction="double-right" />
            </button>
        </div>
    );
}

export default Pagination;