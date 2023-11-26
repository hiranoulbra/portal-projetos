import { PrimaryButton } from "./ui/buttons";

type Props = {
    href: string;
}

export const AccessDenied = ({ href }: Props) => {
    return (
        <div className="absolute left-0 w-full h-full top-0 z-20 flex justify-center items-center">
            <div className="relative w-full h-fit">
                <div className="flex justify-center items-center h-full w-full flex-wrap">

                    <h1 className="w-full text p-5 font-bold text-center">Você não tem permissão para acessar essa página</h1>
                    <PrimaryButton href={href}>Voltar</PrimaryButton>
                </div>
            </div>
        </div>
    )
}