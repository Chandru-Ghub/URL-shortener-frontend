import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLinks } from '../hooks/useLinks.js';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import Table from '../components/Table.jsx';
import Loader from '../components/Loader.jsx';
import Alert from '../components/Alert.jsx';
import CopyButton from '../components/CopyButton.jsx';


export default function Dashboard() {
  const { links, loading, error, createLink, deleteLink, fetchLinks } = useLinks();
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  // Life cycle hook
  useEffect(()=>{
    fetchLinks();
  },[])


  // Delete URL
  const handleDelete = async (codeToDelete) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      try {
        await deleteLink(codeToDelete);
        setAlert({ type: 'success', message: 'Link deleted successfully!' });
      } catch (err) {
        setAlert({ type: 'error', message: err.message });
      }
    }
  };

  // Slice character limited
  const truncateURL = (url, maxLength = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  // Converting date to format
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Search filter
  const filteredLinks = links.filter(link => {
    const searchLower = searchTerm.toLowerCase();
    return (
      link.code.toLowerCase().includes(searchLower) ||
      link.url.toLowerCase().includes(searchLower)
    );
  });

  // Get short URL
  const getShortUrl = (code) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${baseUrl}/${code}`;
  };

  return (
    <div className='p-5'>
      {/* Search */}
      <div className="mb-4">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by code or URL..."
          className="mb-0"
        />
      </div>

      {/* Links Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
        <div className='bg-slate-100 opacity-65 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center '>
          <Loader />
        </div>
        ) : error ? (
          <Alert type="error" message={error} />
        ) : filteredLinks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchTerm ? 'No links found matching your search.' : 'No links yet. Create your first short link!'}
          </div>
        ) : (
          <Table>
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Clicked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLinks.map((link) => (
                <tr key={link._id} className="hover:bg-[#e3e3e3]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <a
                        href={getShortUrl(link.code)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-mono"
                      >
                        {link.code}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md truncate" title={link.url}>
                      {truncateURL(link.url)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {link.clicks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(link.lastClicked)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <Link to={`/code/${link.code}`}>
                        <Button variant="secondary" className="text-sm">
                          Stats
                        </Button>
                      </Link>
                      <CopyButton text={getShortUrl(link.code)} />
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(link.code)}
                        className="text-sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

