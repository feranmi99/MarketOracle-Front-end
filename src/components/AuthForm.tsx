"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Check, X } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: { email: string; password: string; username?: string }) => void;
  loading?: boolean;
  error?: string;
}

interface PasswordRequirement {
  text: string;
  met: boolean;
}

export default function AuthForm({ type, onSubmit, loading, error }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirm, setConfirm] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordRequirements: PasswordRequirement[] = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    // { text: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    // { text: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    // { text: 'Contains number', met: /\d/.test(password) },
  ];

  const passwordsMatch = password === confirm;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (type === 'register') {
      if (!username.trim()) return setFormError('Username is required');
      if (password.length < 8) return setFormError('Password must be at least 8 characters');
      if (!passwordRequirements.every(req => req.met)) return setFormError('Please meet all password requirements');
      if (password !== confirm) return setFormError('Passwords do not match');
    }

    onSubmit({ email, password, ...(type === 'register' ? { username } : {}) });
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border-2 border-slate-200/80 shadow-xl p-8 space-y-6"
    >
      <motion.div variants={itemVariants} className="text-center mb-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {type === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-600 mt-2">
          {type === 'login'
            ? 'Sign in to access your trading dashboard'
            : 'Start your trading journey today'
          }
        </p>
      </motion.div>

      <AnimatePresence>
        {(formError || error) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <div className="flex items-center">
              <X className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700 text-sm">{formError || error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Username Field (Register only) */}
      {type === 'register' && (
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>
        </motion.div>
      )}

      {/* Email Field */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>
      </motion.div>

      {/* Password Field */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-11 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter your password"
            required
            minLength={8}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Password Requirements (Register only) */}
        {type === 'register' && password && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 space-y-2"
          >
            {passwordRequirements.map((req, index) => (
              <motion.div
                key={req.text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-sm"
              >
                {req.met ? (
                  <Check className="w-4 h-4 text-emerald-500 mr-2" />
                ) : (
                  <X className="w-4 h-4 text-red-400 mr-2" />
                )}
                <span className={req.met ? 'text-emerald-600' : 'text-slate-500'}>
                  {req.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Confirm Password Field (Register only) */}
      {type === 'register' && (
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={`w-full pl-11 pr-12 py-3 bg-slate-50 border-2 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${confirm ? (passwordsMatch ? 'border-emerald-200 focus:ring-emerald-500' : 'border-red-200 focus:ring-red-500') : 'border-slate-200 focus:ring-blue-500'
                }`}
              placeholder="Confirm your password"
              required
              minLength={8}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {confirm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex items-center mt-2 text-sm ${passwordsMatch ? 'text-emerald-600' : 'text-red-600'
                }`}
            >
              {passwordsMatch ? (
                <Check className="w-4 h-4 mr-1" />
              ) : (
                <X className="w-4 h-4 mr-1" />
              )}
              {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        variants={itemVariants}
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-sm relative overflow-hidden"
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
          />
        ) : (
          <span>{type === 'login' ? 'Sign In to Dashboard' : 'Create Account'}</span>
        )}

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: loading ? '100%' : 0 }}
          transition={{ duration: 2, repeat: loading ? Infinity : 0 }}
          className="absolute bottom-0 left-0 h-1 bg-white/30"
        />
      </motion.button>
    </motion.form>
  );
}