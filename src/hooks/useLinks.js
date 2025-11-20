import { useState, useEffect } from 'react';
import { listLinks, createLink as createLinkAPI, deleteLink as deleteLinkAPI } from '../api/links.js';

export const useLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLinks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listLinks();
      setLinks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  const createLink = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const newLink = await createLinkAPI(payload);
      setLinks([newLink, ...links]);
      return newLink;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (code) => {
    setLoading(true);
    setError(null);
    try {
      await deleteLinkAPI(code);
      setLinks(links.filter(link => link.code !== code));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    links,
    loading,
    error,
    fetchLinks,
    createLink,
    deleteLink
  };
};

