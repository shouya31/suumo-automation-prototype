import React, { useState, useRef, useMemo } from 'react';
import Loading from "./Loading";

interface UploadImageProps {
    onUploadComplete?: () => void;
    onFilesSelected: (files: FileList) => void;
}


const UploadImage: React.FC<UploadImageProps> = ({ onUploadComplete, onFilesSelected }: { onUploadComplete?: () => void; onFilesSelected: (files: FileList) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const selectedFileArray: File[] = useMemo(() => {
        return selectedFiles ? [...Array.from(selectedFiles)] : [];
    }, [selectedFiles]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);

        const files = e.target.files;
        if (!files) return;
        if (!inputRef.current?.files) return;
        const newFileArray = [
            ...selectedFileArray,
            ...Array.from(files),
        ].filter(
            (file, index, self) =>
                self.findIndex((f) => f.name === file.name) === index // 重複を削除
        );
        const dt = new DataTransfer();
        newFileArray.forEach((file) => dt.items.add(file));
        inputRef.current.files = dt.files;
        setSelectedFiles(dt.files);
        onFilesSelected(dt.files);
        setTimeout(() => {
            setIsLoading(false);
            if (onUploadComplete) {
                onUploadComplete();
            }
        }, 3000);
    };

    const handleDelete = (index: number) => {
        if (!inputRef.current?.files) return;
        const dt = new DataTransfer();
        selectedFileArray.forEach((file, i) => i !== index && dt.items.add(file));
        inputRef.current.files = dt.files;
        setSelectedFiles(dt.files);
        onFilesSelected(dt.files);
    };

    return (
        <>
            {isLoading && <Loading />}
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    ref={inputRef}
                    multiple />
            </label>
            <div className='w-6/12 m-auto'>
                {selectedFileArray.map((file, index) => (
                    <div
                        key={file.name}
                        className="flex items-center justify-between"
                    >
                        <div className='px-4'>{file.name}</div>
                        <button
                            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5'
                            onClick={() => handleDelete(index)
                            }>削除
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UploadImage;