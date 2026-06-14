import { useEffect, useState } from 'react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/**
 * Fetches the static profile configuration from our backend.
 */
export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    axios
      .get(`${API}/profile`)
      .then((r) => {
        if (alive && r.data) {
          setProfile(r.data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch profile', err);
      })
      .finally(() => {
        if (alive) {
          setLoading(false);
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  return { profile, loading };
}
