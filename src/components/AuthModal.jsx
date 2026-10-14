import { useEffect, useRef, useState } from 'react';

/**
 * Authentication modal with login + registration modes.
 * Registration requires a matching password confirmation; validation errors are
 * surfaced inline exactly like the original vanilla implementation.
 */
export default function AuthModal({ open, mode, onClose, onAuthenticated, onToggleMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const emailRef = useRef(null);

  const isLogin = mode === 'login';

  // Reset the form whenever the modal opens or the mode flips.
  useEffect(() => {
    if (open) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      const id = window.setTimeout(() => emailRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [open, mode]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Email is required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    onAuthenticated(trimmedEmail);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="card-bg w-full max-w-sm rounded-lg p-6 space-y-4 border border-slate-700 animate-fade-in">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold uppercase heading-font text-cyan-400">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 hover:text-white text-lg leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs uppercase font-medium text-slate-400 mb-1" htmlFor="authEmail">
              Email
            </label>
            <input
              id="authEmail"
              ref={emailRef}
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full text-xs px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-medium text-slate-400 mb-1" htmlFor="authPassword">
              Password
            </label>
            <input
              id="authPassword"
              type="password"
              minLength={6}
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full text-xs px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label
                className="block text-xs uppercase font-medium text-slate-400 mb-1"
                htmlFor="authConfirmPassword"
              >
                Confirm Password
              </label>
              <input
                id="authConfirmPassword"
                type="password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full text-xs px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          )}

          {error && <p className="text-xs text-rose-400">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs uppercase rounded transition"
          >
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>{isLogin ? "Don't have an account?" : 'Already registered?'}</span>
          <button
            type="button"
            onClick={onToggleMode}
            className="text-cyan-400 hover:underline font-semibold ml-1"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
