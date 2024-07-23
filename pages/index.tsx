import React, { useState, useEffect } from 'react';
import UploadImage from '../components/UploadImage';
import FlashMessage from "../components/FlashMessage";

const IndexPage = () => {
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
        setShowForm(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  const handleUploadComplete = () => {
    setFlashMessage('ファイルのアップロードと画像からの文字取得が完了しました。');
  };

  const handleFilesSelected = (files: FileList) => {
    setSelectedFiles(files);
    setCurrentIndex(0);
    setShowForm(false); // フォームを隠す
  };

  const handleNext = () => {
    if (selectedFiles && currentIndex < selectedFiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className='w-8/12 mx-auto mt-5'>
      {flashMessage && (<FlashMessage message={flashMessage} />)}
      <div className='flex my-5 justify-between'>
        <div className='w-5/12'>
          <input type="text" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='ID' />
          <input type="password" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Password' />
        </div>
        <div className='w-4/12'>
          <div className="flex items-center mb-4">
            <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600" />
            <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900">SUUMO</label>
          </div>
          <div className="flex items-center">
            <input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600" />
            <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900">HOMES</label>
          </div>
        </div>
      </div>
      <UploadImage onFilesSelected={handleFilesSelected} onUploadComplete={handleUploadComplete} />
      {showForm && selectedFiles && (
        <div className='m-auto mt-4 border p-4'>
          {Array.from(selectedFiles).map((file, index) => (
            index === currentIndex && (
              <div key={file.name}>
                <div className='flex justify-center mb-4'>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className='max-h-96'
                  />
                </div>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`input1-${index}`}>
                      フィールド1
                    </label>
                    <input
                      id={`input1-${index}`}
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`input2-${index}`}>
                      フィールド2
                    </label>
                    <input
                      id={`input2-${index}`}
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`input3-${index}`}>
                      フィールド3
                    </label>
                    <input
                      id={`input3-${index}`}
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`input4-${index}`}>
                      フィールド4
                    </label>
                    <input
                      id={`input4-${index}`}
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </form>
                <div className='flex justify-between'>
                  <button
                    className='focus:outline-none text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2'
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                  >
                    前へ
                  </button>
                  {currentIndex < selectedFiles.length - 1 ? (
                    <button
                      className='focus:outline-none text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2'
                      onClick={handleNext}
                    >
                      次へ
                    </button>
                  ) : (
                    <button
                      className='focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2'
                    >
                      一括入稿
                    </button>
                  )}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default IndexPage;
