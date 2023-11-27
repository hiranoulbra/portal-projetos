'use client';
import { useFormStatus } from "react-dom";
import { SecondaryButton } from "../ui/buttons"

type DeleteDialogProps = {
    title: string;
    buttonText?: string;
    buttonClassName?: string;
    text: string;
    onCancel: () => void;

}
type DeleteButtonProps = {
    text?: string;
    className?: string;
}

export const DeleteButton = ({ className, text }: DeleteButtonProps) => {
    const { pending } = useFormStatus();
    return <button type="submit" className={`${className ?? "bg-red-900 hover:bg-red-800"} text-white rounded-md p-2 aria-disabled:bg-gray-200 pr-10 pl-10`} aria-disabled={pending}>{text ?? 'Excluir'}</button>
}
export const DeleteDialog = ({ title, text, onCancel, buttonClassName, buttonText }: DeleteDialogProps) => {
    return <div className="fixed inset-0 w-screen overflow-y-autoabsolute left-0 h-full top-0 bg-black bg-opacity-30 z-40 flex justify-center items-center">
        <div className="bg-white p-6 p-b relative w-96 h-fit">
            <h2 className="text-2xl font-bold text-center text-cyan-600">{title}</h2>
            <p className="text-center">{text}</p>
            <div className="flex justify-between mt-4">
                <DeleteButton className={buttonClassName} text={buttonText} />
                <SecondaryButton onClick={onCancel} >Cancelar</SecondaryButton>
            </div>
        </div>
    </div>
}