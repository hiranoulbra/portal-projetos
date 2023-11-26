import { PrimaryButton } from "../ui/buttons";

type SuccessDialogProps = {
    isOpen: boolean;
    title: string;
    message: string;
    link: string;

}

export const SuccessDialog = ({ title, message, link, isOpen }: SuccessDialogProps) => {
    if (!isOpen) {
        return <></>
    }
    return (
        <div className="fixed inset-0 w-screen overflow-y-autoabsolute left-0 h-full top-0 bg-black bg-opacity-30 z-40 flex justify-center items-center">
            <div className="bg-white p-6 p-b relative w-96 h-fit">
                <h2 className="text-2xl font-bold text-center text-cyan-600">{title}</h2>
                <p className="text-center">{message}</p>
                <div className="flex justify-center mt-4">
                    <PrimaryButton href={link}>Fechar</PrimaryButton>
                </div>
            </div>
        </div>)
}