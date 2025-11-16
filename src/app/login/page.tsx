"use client"

import AuthForm from '../../components/AuthForm';
import { useState } from 'react';
import { login } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: "Multi-Timeframe Analysis",
    description: "4H, 1H, and 15M timeframe alignment"
  },
  {
    icon: TrendingUp,
    title: "AI-Powered Insights",
    description: "Advanced technical indicator analysis"
  },
  {
    icon: Zap,
    title: "Real-time Signals",
    description: "Instant trade decision with confidence scoring"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Automatic stop-loss and take-profit levels"
  }
];

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin({ email, password }: { email: string; password: string }) {
    setLoading(true);
    setError(null);
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.access_token);
      router.push('/dashboard');
    } catch (e: any) {
      setError(e?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-3xl opacity-60"></div>
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
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <TrendingUp className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Crypto Analysis Pro
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Sign in to access AI-powered trading insights and multi-timeframe analysis
          </p>
        </motion.div>

        <div className="gap-12 items-center">
         

          {/* Right Column - Login Form */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              <AuthForm
                type="login"
                onSubmit={handleLogin}
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
                  Don't have an account?{' '}
                  <a
                    href="/register"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Create one now
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