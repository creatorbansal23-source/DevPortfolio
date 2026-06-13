import { useState } from 'react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

function extractErrorMessage(err) {
  return (
    err?.response?.data?.detail?.[0]?.msg ||
    err?.response?.data?.detail ||
    'Could not send. Please try again or email directly.'
  );
}

/**
 * Encapsulates contact-form state, validation feedback and submission.
 */
export function useContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [state, setState] = useState({ loading: false, status: null, error: null });

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, status: null, error: null });
    try {
      await axios.post(`${API}/contact`, form);
      setState({ loading: false, status: 'success', error: null });
      setForm(EMPTY_FORM);
    } catch (err) {
      setState({ loading: false, status: 'error', error: String(extractErrorMessage(err)) });
    }
  };

  return { form, update, submit, state };
}
