"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin/quotes");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-text-primary">
      <div className="w-full max-w-md p-8 bg-surface border border-border/50 rounded-sm shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center border border-accent-primary/30">
              <Lock className="w-5 h-5 text-accent-primary" />
            </div>
          </div>
          
          <h2 className="text-2xl font-display font-bold uppercase tracking-widest text-center mb-8">Admin Access</h2>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">Email Address</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary outline-none font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">Password</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-sm focus:border-accent-primary outline-none font-sans"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-4 px-4 py-3 bg-accent-primary text-on-accent font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {isLoading ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
