"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side password confirmation check (signup only)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          username: `${formData.fullname}`.trim(),
          email: formData.email,
          password: formData.password,
        };

        
    const endpoint = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/signup";


    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Error response:", error);
        alert("❌ " + error);
        return;
      }

      const data = await response.json();
      console.log("✅ Success:", data);

      alert(
        data.message || (isLogin ? "Login Successful" : "Signup Successful")
      );

      // Redirect to dashboard or homepage
      router.push("/homepage");
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Network error. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-sm relative backdrop-blur-xl bg-slate-900/30 border-violet-500/20 shadow-2xl hover:shadow-violet-500/10 transition-all duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-violet-500/20 rounded-xl mb-3 backdrop-blur-sm hover:bg-violet-500/30 transition-all duration-300">
              <User className="w-6 h-6 text-violet-300" />
            </div>
            <h1 className="text-xl font-bold text-white mb-1 font-mono">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-400 font-mono text-xs">
              {isLogin ? "Sign in to your account" : "Join us today"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields for signup */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label
                    htmlFor="fullName"
                    className="text-slate-300 font-mono text-xs"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    type="text"
                    value={formData.fullname}
                    onChange={(e) =>
                      handleInputChange("fullname", e.target.value)
                    }
                    className="bg-slate-800/50 border-violet-500/30 text-white placeholder-slate-500 font-mono backdrop-blur-sm focus:border-violet-400 focus:ring-violet-400/20 transition-all duration-200 hover:border-violet-500/40 h-9 text-sm"
                    placeholder="John"
                    required={!isLogin}
                  />
                </div>
                <div className="space-y-1"></div>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-slate-300 font-mono text-xs"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-slate-800/50 border-violet-500/30 text-white placeholder-slate-500 font-mono backdrop-blur-sm focus:border-violet-400 focus:ring-violet-400/20 transition-all duration-200 hover:border-violet-500/40 pl-9 h-9 text-sm"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1">
              <Label
                htmlFor="password"
                className="text-slate-300 font-mono text-xs"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="bg-slate-800/50 border-violet-500/30 text-white placeholder-slate-500 font-mono backdrop-blur-sm focus:border-violet-400 focus:ring-violet-400/20 transition-all duration-200 hover:border-violet-500/40 pl-9 pr-9 h-9 text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password for signup */}
            {!isLogin && (
              <div className="space-y-1">
                <Label
                  htmlFor="confirmPassword"
                  className="text-slate-300 font-mono text-xs"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="bg-slate-800/50 border-violet-500/30 text-white placeholder-slate-500 font-mono backdrop-blur-sm focus:border-violet-400 focus:ring-violet-400/20 transition-all duration-200 hover:border-violet-500/40 pl-9 pr-9 h-9 text-sm"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Forgot password link for login */}
            {isLogin && (
              <div className="text-right -mt-1">
                <button
                  type="button"
                  className="text-violet-400 hover:text-violet-300 text-xs font-mono transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-mono font-medium py-2.5 transition-all duration-300 shadow-lg hover:shadow-violet-500/30 hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <span className="flex items-center justify-center gap-2">
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Button>
          </form>

          {/* Toggle between login/signup */}
          <div className="text-center mt-4">
            <p className="text-slate-400 font-mono text-xs">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1.5 text-violet-400 hover:text-violet-300 font-medium transition-all duration-200 hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
