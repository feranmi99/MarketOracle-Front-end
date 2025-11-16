"use client"

import AuthForm from '../../components/AuthForm';
import { useState } from 'react';
import { register, login } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, BarChart3, Users, Rocket, Target, ChartBar } from 'lucide-react';


export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleRegister({ email, password, username }: { email: string; password: string; username: string }) {
    setLoading(true);
    setError(null);
    try {
      const res = await register(email, password, username);
      // Auto-login after successful registration
      const loginRes = await login(email, password);
      localStorage.setItem('token', loginRes.access_token);
      router.push('/dashboard');
    } catch (e: any) {
      setError(e?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.access_token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to login:', error);
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <Rocket className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Join Crypto Analysis Pro
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start your journey to smarter trading with AI-powered insights
          </p>
        </motion.div>

        <div className="">
          {/* Left Column - Registration Form */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              <AuthForm
                type="register"
                onSubmit={handleRegister}
                loading={loading}
                error={error || undefined}
              />

              {/* Additional Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-6"
              >
                <p className="text-slate-600">
                  Already have an account?{' '}
                  <a
                    href="/login"
                    className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                  >
                    Sign in here
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}