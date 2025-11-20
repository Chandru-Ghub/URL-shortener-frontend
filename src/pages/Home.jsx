import { useEffect, useState } from 'react';
import { useLinks } from '../hooks/useLinks.js';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import Loader from '../components/Loader.jsx';
import Alert from '../components/Alert.jsx';
import { FaLink } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { BsSpeedometer } from "react-icons/bs";
import { IoMdAnalytics } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const { loading, error, createLink } = useLinks();
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [urlError, setUrlError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const shortUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();


//   Validating the given URL
  const validateURL = (urlValue) => {
    if (!urlValue) {
      setUrlError('URL is required');
      return false;
    }
    try {
      new URL(urlValue);
      setUrlError('');
      return true;
    } catch {
      setUrlError('Invalid URL');
      return false;
    }
  };

//   Custom code Validation with conditions
  const validateCode = (codeValue) => {
    if (codeValue) {
      const codeRegex = /^[A-Za-z0-9]{6,8}$/;
      if (!codeRegex.test(codeValue)) {
        setCodeError('Code must be 6-8 alphanumeric characters');
        return false;
      }
    }
    setCodeError('');
    return true;
  };

// Handling URL
  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    if (value) {
      validateURL(value);
    } else {
      setUrlError('');
    }
  };

//  handling CODE
  const handleCodeChange = (e) => {
    const value = e.target.value;
    setCode(value);
    if (value) {
      validateCode(value);
    } else {
      setCodeError('');
    }
  };

//  Create URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateURL(url)) {
      return;
    }
    
    if (!validateCode(code)) {
      return;
    }

    setSubmitLoading(true);
    setAlert(null);

    try {
      const newLink = await createLink({ url, code: code || undefined });
      setUrl('');
      setCode('');
      setUrlError('');
      setCodeError('');
      setAlert({ type: 'success', message: 'Link created successfully!' });
      console.log(`${shortUrl}/code/${newLink.code}`);
      const viewLink = `${window.location.origin}/code/${newLink.code}`;
      setTimeout(()=>{
          navigate(viewLink);
      },2000)
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setSubmitLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 mt-20">
        
              <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Shorten Your Long URLs <span className="text-orange-500">in Seconds.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Use our URL shortner to engage and connect to the right information. Build edit and track everything inside Platform.
          </p>
        </div>
      </main>

              <div className="mt-10 bg-[#132b438a] rounded-3xl shadow-lg p-6 w-full max-w-6xl">
                              
                  {alert && (
                    <Alert
                      type={alert.type}
                      message={alert.message}
                      onClose={() => setAlert(null)}
                    />
                  )}
            
                  {/* Add Link Form */}
                  <div className='bg-[#fffdf8] mt-16 rounded-3xl p-5'>
                    <h2 className="text-xl font-semibold mb-4 flex items-start justify-center gap-4 bg-[#031f39] p-5 text-white rounded-2xl"> <span className='text-orange-500'><FaLink style={{fontSize:'30px'}} /></span>Create Short Link</h2>
                    <form onSubmit={handleSubmit}>
                      <Input
                        label="URL"
                        type="url"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder="https://example.com"
                        error={urlError}
                        required
                      />
                      <Input
                        label="Custom Code (optional)"
                        type="text"
                        value={code}
                        onChange={handleCodeChange}
                        placeholder="Leave empty for auto-generated"
                        error={codeError}
                      />
                    <div className='text-start py-3'>
                        <Button
                        type="submit"
                        className='h-14 rounded-xl bg-orange-500'
                        disabled={submitLoading || !!urlError || !!codeError}
                      >
                        {submitLoading ? 'Creating...' : <span className='flex items-center justify-center gap-5'>Get your link for free <FaArrowRight/></span> }
                      </Button>
                    </div>
                    </form>
                
                  </div>
           
                  {/* Links Table */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {loading ? (
                      <div className='bg-slate-100 opacity-65 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center '>
                        <Loader />
                      </div>
                    ) : error ? (
                      <Alert type="error" message={error} />
                    ) : <></>}
                  </div>
                </div>       
         <div className='my-16'>
             <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
             <span className="text-orange-500">More than a link shortner</span>
          </h1>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            Knowing how you clicks are performing should be as easy as making them. Track analyze, and optimize all your connections in one place.
          </p>
         </div>
        {/* Feature Section */}
        <div className="mt-20 max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Fast</h3>
      <div className='flex items-center justify-center my-8'>
                            <span className='text-orange-500'>
                                <BsSpeedometer  style={{fontSize:'40px'}} /></span>
            </div>
            <p className="text-gray-600 mt-2 text-sm">Get your short URL instantly.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Secure</h3>
       <div className='flex items-center justify-center my-8'>
                            <span className='text-orange-500'>
                                <GrSecure style={{fontSize:'40px'}} /></span>
            </div>
            <p className="text-gray-600 mt-2 text-sm">Protected, encrypted redirection.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Analytics</h3>
                        <div className='flex items-center justify-center my-8'>
                            <span className='text-orange-500'>
                                <IoMdAnalytics style={{fontSize:'40px'}} /></span>
            </div>
            <p className="text-gray-600 mt-2 text-sm">Track clicks & performance.</p>
          </div>
        </div>
      </section>


    </div>
  );
}
