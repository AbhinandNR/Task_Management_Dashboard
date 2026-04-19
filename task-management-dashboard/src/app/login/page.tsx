"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { storage } from "@/lib/storage";
import { LayoutDashboard, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = storage.getAuth();
    if (auth.isLoggedIn) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      storage.setAuth({ isLoggedIn: true, email });
      router.push("/dashboard");
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] relative overflow-hidden selection:bg-indigo-500/30">
      <div className="absolute top-0 -left-4 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 -right-4 w-[40rem] h-[40rem] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700"></div>

      <Card className="w-full max-w-md relative z-10 border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
        <CardHeader className="space-y-4 pt-12 pb-8">
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-white dark:bg-white/[0.05] rounded-3xl flex items-center justify-center shadow-2xl ring-1 ring-white/10">
              <LayoutDashboard className="w-6 h-6 text-indigo-500" />
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-black tracking-tighter text-center text-white">
              ANTIGRAVITY
            </CardTitle>
            <CardDescription className="text-center text-zinc-500 text-sm font-medium">
              Enterprise Task Management Portfolio
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-12 px-10">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="h-13 bg-white/[0.03] border-white/5 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/20 rounded-2xl pl-12 transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Security Key"
                required
                className="h-13 bg-white/[0.03] border-white/5 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/20 rounded-2xl pl-12 transition-all"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-13 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-2xl shadow-indigo-500/20 transition-all active:scale-[0.98] mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Access Dashboard"}
            </Button>
            
            <p className="text-center text-xs text-zinc-600 mt-8 font-medium">
              Protected by Antigravity Cloud Security 2026
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
