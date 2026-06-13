import { useEffect, useState } from 'react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/**
 * Fetches the GitHub repos for the portfolio owner from our backend
 * (which itself proxies github.com with cache + graceful fallback).
 */
export function useGithubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    axios
      .get(`${API}/github/repos`)
      .then((r) => {
        if (alive) setRepos(r.data?.repos || []);
      })
      .catch(() => {
        if (alive) setRepos([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { repos, loading };
}
