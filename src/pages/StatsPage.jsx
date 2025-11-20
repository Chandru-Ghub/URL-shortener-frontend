import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLink } from '../api/links.js';
import Loader from '../components/Loader.jsx';
import Alert from '../components/Alert.jsx';
import Button from '../components/Button.jsx';
import { MdOutlineAdsClick } from "react-icons/md";
import { IoGitNetwork } from "react-icons/io5";
import { MdOutlineRecentActors } from "react-icons/md";

export default function StatsPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Life cycle hook
  useEffect(() => {
    const fetchLink = async () => {
      try {
        setLoading(true);
        const data = await getLink(code);
        setLink(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchLink();
    }
  }, [code]);

  // date formater
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Get short URL
  const getShortUrl = (code) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${baseUrl}/${code}`;
  };

  if (loading) {
    return    <div className='bg-slate-100 opacity-65 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center '>
              <Loader />
            </div>;
  }

  if (error || !link) {
    return (
      <div>
        <Alert type="error" message={error || 'Link not found'} />
        <Button onClick={() => navigate('/')} className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button onClick={() => navigate('/dashboard')} variant="secondary">
          Back to Dashboard
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-white">Link Statistics</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div className='bg-[#031f39] p-3'>
            <label className="text-lg font-bold text-white">
              Code
            </label>
            {/* <h3 className="text-xl font-bold text-gray-800">Code</h3> */}
            <p className="text-lg font-mono text-orange-500">{link.code}</p>
          </div>

          <div className='border-2 border-gray-200 p-3 rounded-lg'>
            <label className="block mb-1 text-lg font-bold text-gray-800 ">
              Short URL
            </label>
            <a
              href={getShortUrl(link.code)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {getShortUrl(link.code)}
            </a>
          </div>

          <div className='border-2 border-gray-200 p-3 rounded-lg'>
            <label className="block mb-1 text-lg font-bold text-gray-800">
              Full URL
            </label>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {link.url}
            </a>
          </div>

    <div className='flex flex-wrap items-center gap-10 mt-10 bg-[#031f39] p-3 max-md:justify-center'>

        <div className="p-6 bg-white rounded-xl shadow-md min-w-60 w-80">
            <h3 className="text-xl font-bold text-gray-800 text-center">Total Clicks</h3>
                        <div className='flex items-center justify-center my-8 gap-8'>
                                 <p className="font-semibold text-6xl">{link.clicks}</p>
                            <span className='text-orange-500'>
                                <MdOutlineAdsClick style={{fontSize:'40px'}} /></span>
            </div>
            <p className="text-gray-600 mt-2 text-sm">Total no of visits with this link.</p>
          </div>
        <div className="p-6 bg-white rounded-xl shadow-md min-w-60 w-80">
            <h3 className="text-xl font-bold text-gray-800">Created Date</h3>
             <p className="text-orange-500 font-bold text-xl">{formatDate(link.createdAt)}</p>
                        <div className='flex items-center justify-center my-8'>
                            <span className='text-orange-500'>
                                <IoGitNetwork style={{fontSize:'40px'}} /></span>
            </div>
            <p className="text-gray-600 mt-2 text-sm">URL generated date.</p>
          </div>
        <div className="p-6 bg-white rounded-xl shadow-md min-w-60 w-80">
            <h3 className="text-xl font-bold text-gray-800">Recent Visited</h3>
            <p className="text-orange-500 font-bold text-xl">{formatDate(link.lastClicked)}</p>
                        <div className='flex items-center justify-center my-8'>
                            <span className='text-orange-500'>
                                <MdOutlineRecentActors style={{fontSize:'40px'}} /></span>
            </div>
            <p className="text-gray-600 mt-2 text-sm">User visted last through this url.</p>
          </div>

    </div>
        </div>
      </div>
    </div>
  );
}

