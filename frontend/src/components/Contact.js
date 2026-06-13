import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, MapPin, Send, Check, AlertCircle } from 'lucide-react';
import { useContactForm } from '../hooks/useContactForm';
import ContactSignal from './ContactSignal';

function Field({ label, testid, value, onChange, type = 'text', textarea, required }) {
  return (
    <label className="block">
      <span className="mono-label">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      {textarea ? (
        <textarea
          data-testid={testid}
          value={value}
          onChange={onChange}
          required={required}
          rows={5}
          className="mt-2 w-full bg-ink border hairline px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors font-body resize-none"
          placeholder="Tell me about the role, project, or idea…"
        />
      ) : (
        <input
          data-testid={testid}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className="mt-2 w-full bg-ink border hairline px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors font-body"
          placeholder={label}
        />
      )}
    </label>
  );
}

function ContactInfo() {
  return (
    <div className="col-span-12 lg:col-span-6">
      <p className="mono-label text-accent">[ 06 / Contact ]</p>
      <h2 className="mt-4 sm:mt-6 font-display font-extrabold text-white text-[clamp(2.6rem,9vw,6rem)] tracking-tightest leading-[0.9]">
        LET'S <br />
        BUILD<span className="text-accent">.</span>
      </h2>
      <p className="mt-5 sm:mt-6 text-white/65 max-w-lg text-base sm:text-lg">
        Open to senior backend / cloud / AI-engineering roles, contract work, or a quick chat
        about architecture. Replies within 24 hours.
      </p>

      <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5">
        <a
          data-testid="contact-email-link"
          href="mailto:deepak23bansal1997@gmail.com"
          className="flex items-center gap-3 sm:gap-4 group"
        >
          <Mail size={18} className="text-accent shrink-0" />
          <span className="text-white text-base sm:text-lg break-all group-hover:text-accent transition-colors">
            deepak23bansal1997@gmail.com
          </span>
        </a>
        <a
          data-testid="contact-github-link"
          href="https://github.com/creatorbansal23-source"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 sm:gap-4 group"
        >
          <Github size={18} className="text-accent shrink-0" />
          <span className="text-white text-base sm:text-lg break-all group-hover:text-accent transition-colors">
            github.com/creatorbansal23-source
          </span>
        </a>
        <div className="flex items-center gap-3 sm:gap-4">
          <MapPin size={18} className="text-accent shrink-0" />
          <span className="text-white text-base sm:text-lg">New Delhi, India</span>
        </div>
      </div>

      <ContactSignal />
    </div>
  );
}

function StatusBanner({ status, error }) {
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        data-testid="contact-success"
        className="mt-5 flex items-center gap-3 border hairline p-4 text-white"
      >
        <Check size={16} className="text-accent" />
        <span className="text-sm">Message received. I'll get back within 24 hours.</span>
      </motion.div>
    );
  }
  if (status === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        data-testid="contact-error"
        className="mt-5 flex items-center gap-3 border border-accent p-4 text-white"
      >
        <AlertCircle size={16} className="text-accent" />
        <span className="text-sm">{error}</span>
      </motion.div>
    );
  }
  return null;
}

function ContactForm() {
  const { form, update, submit, state } = useContactForm();
  return (
    <form
      onSubmit={submit}
      data-testid="contact-form"
      className="border hairline p-5 sm:p-6 md:p-10 bg-[#0a0a0a]"
    >
      <div className="mono-label mb-6 sm:mb-8 text-white/60 text-[10px] sm:text-[11px] break-all">
        {'// contact.submit() — secured · stored · acknowledged'}
      </div>

      <div className="space-y-5 sm:space-y-6">
        <Field label="Name" testid="contact-form-name" value={form.name} onChange={update('name')} required />
        <Field label="Email" testid="contact-form-email" type="email" value={form.email} onChange={update('email')} required />
        <Field label="Subject" testid="contact-form-subject" value={form.subject} onChange={update('subject')} />
        <Field label="Message" testid="contact-form-message" textarea value={form.message} onChange={update('message')} required />
      </div>

      <button
        data-testid="contact-submit"
        type="submit"
        disabled={state.loading}
        className="mt-7 sm:mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-ink font-medium hover:bg-accent hover:text-white transition-colors disabled:opacity-50"
      >
        {state.loading ? 'Sending…' : (<><Send size={16} /> Send message</>)}
      </button>

      <StatusBanner status={state.status} error={state.error} />
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" data-testid="contact-section" className="relative">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <ContactInfo />
          <div className="col-span-12 lg:col-span-6">
            <ContactForm />
          </div>
        </div>
      </div>

      <footer className="border-t hairline">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-3 mono-label">
          <div className="text-[10px] sm:text-[11px]">© {new Date().getFullYear()} Deepak Bansal · Built with React Three Fiber</div>
          <div className="flex items-center gap-4">
            <button
              data-testid="footer-replay-intro"
              onClick={() => typeof window !== 'undefined' && window.__openIntro && window.__openIntro()}
              className="text-[10px] sm:text-[11px] text-white/50 hover:text-white transition-colors"
            >
              ↻ replay intro
            </button>
            <div className="text-white/40 text-[10px] sm:text-[11px]">v1.2 · production · 99.9% uptime</div>
          </div>
        </div>
      </footer>
    </section>
  );
}
