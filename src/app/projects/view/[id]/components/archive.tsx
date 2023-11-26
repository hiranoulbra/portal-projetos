
import { TableArchive } from "@/app/projects/components/table.archives";
import { ArchiveType } from "@/types/archive";
import DownloadIcon from "@/utils/icons/download.icon";

type Props = {
    archives: ArchiveType[];

}


const Archive = ({ archives }: Props) => {


    return (
        <div className="flex w-full flex-wrap mb-10">
            <h2 className="w-full text-xl p-5 pl-0">Arquivos</h2>

            <div className="flex flex-wrap p-10 w-full bg-white shadow-sm">
                <TableArchive archives={archives} />               
            </div>
        </div >
    );
}
export default Archive;