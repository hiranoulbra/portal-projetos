'use client';
import { DataSetType } from '@/types/dataset';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const options = {
    plugins: {
        title: {
            display: false,
            text: 'Status de Projetos',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

type Props = {
    title: string;
    data: DataSetType[];
    description?: string;
}

export const StatusProject = ({ data, title, description }: Props) => {

    return <div className='w-full bg-white p-4 rounded-md mb-10'>
        <h2 className='text-xl  p-4'>{title}</h2>
        {description && <p className='text-sm p-4'>{description}</p>}
        <Bar options={options} data={{
            labels,
            datasets: data
        }} />
    </div>
}