
import { PrimaryButton } from "@/components/ui/buttons";
import { ArchiveType } from "@/types/archive";
import DeleteIcon from "@/utils/icons/delete.icon";
import DownloadIcon from "@/utils/icons/download.icon";
import { useState } from "react";
import { TableArchive } from "../../components/table.archives";

type Props = {
    archives: ArchiveType[];
    onChange: (archives: ArchiveType[]) => void;
}


const Archive = ({ archives, onChange }: Props) => {


    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const updatedArchives = [...archives];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const existingFileIndex = updatedArchives.findIndex(archive => archive.name === file.name);
                if (existingFileIndex !== -1) {
                    updatedArchives[existingFileIndex] = {
                        id: updatedArchives[existingFileIndex].id,
                        name: file.name,
                        project_id: updatedArchives[existingFileIndex].project_id,
                        size: Math.round(file.size/1024),
                        content: file
                    };
                } else {
                    updatedArchives.push({
                        id: 0,
                        name: file.name,
                        project_id: 0,
                        size: Math.round(file.size/1024),
                        content: file
                    });
                }
            }
            onChange(updatedArchives);
        }
    };

    const onRemove:React.MouseEventHandler<HTMLAnchorElement> = (ev) => {
        ev.preventDefault();
        const index = parseInt(ev.currentTarget.dataset.index as string);
        const updatedArchives = [...archives];
        updatedArchives.splice(index, 1);
        onChange(updatedArchives);
    };
    return (
        <div className="flex w-full flex-wrap">
            <h2 className="w-full text-xl p-5 pl-0">Arquivos</h2>
            <div className="flex flex-wrap p-10 w-full bg-white shadow-sm">
                <div className="w-full pb-10 pl-0 pr-0 flex justify-between">
                    <input className="hidden" type="file" name="files" multiple onChange={handleFileUpload} />
                    <PrimaryButton onClick={(ev) => {
                        ev.preventDefault();
                        (document.querySelector('input[type="file"]') as HTMLElement)?.click();

                    }}>Adicionar</PrimaryButton>
                </div>
                <TableArchive archives={archives} onRemove={onRemove} isEdit={true} />                
            </div>
        </div >
    );
}
export default Archive;