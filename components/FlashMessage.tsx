const FlashMessage = ({ message }: { message: string;}) => {
    return (
        <div
            className={`fixed top-0 right-0 m-4 p-4 bg-green-500 text-white rounded`}
        >
            {message}
        </div>
    );
}
export default FlashMessage