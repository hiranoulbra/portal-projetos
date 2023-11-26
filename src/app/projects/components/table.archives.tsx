import { ArchiveType } from "@/types/archive";
import DeleteIcon from "@/utils/icons/delete.icon";
import DownloadIcon from "@/utils/icons/download.icon";

type TableArchiveProps = {
    archives: ArchiveType[];
    onRemove?: React.MouseEventHandler<HTMLAnchorElement>;
    isEdit?: boolean;
}

export const TableArchive = ({ archives, onRemove, isEdit }: TableArchiveProps) => {
    return <table className="w-full text-left">
        <thead>
            <tr className="border-b border-gray-300">
                <th className="pt-4 pb-4">Nome</th>
                <th className="pt-4 pb-4">Tamanho</th>
                <th className="pt-4 pb-4"></th>
            </tr>
        </thead>
        <tbody>
            {archives.map((archive, index) => (
                <tr className="even:bg-gray-100" key={`archive-${index}`}>
                    <td className="pt-4 pb-4">{archive.name}</td>
                    <td className="pt-4 pb-4">{archive.size}KB</td>
                    <td className="pt-4 pb-4 flex justify-end items-center cursor-pointer gap-2">
                        {archive.id ?
                            <a target="_blank" href={`/api/files?id=${archive.id}`}><DownloadIcon /></a>
                            : 'N/A'}
                        {isEdit && <a className="text-red-800" data-index={index} onClick={onRemove} ><DeleteIcon /></a>}
                    </td>
                </tr>

            ))}
            {archives.length === 0 && <tr><td colSpan={3} className="text-center p-4">Nenhum arquivo encontrado</td></tr>}
        </tbody>
    </table>
}