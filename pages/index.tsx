import Form from './Form';
import UploadImage from '../components/UploadImage';

const IndexPage = () => {
  return (
    <div className='w-8/12 mx-auto mt-5'>
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
      <UploadImage />
      {/* <Form /> */}
    </div>
  );
};

export default IndexPage;