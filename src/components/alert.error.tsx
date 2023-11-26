
export const AlertError = ({ message }: { message: string }) => {
    if (!message || message === "success") return null;
    return (
        <div className="bg-red-600 text-white rounded-lg p-4 w-full mb-4" role="alert">
            {message}
        </div>
    );
}