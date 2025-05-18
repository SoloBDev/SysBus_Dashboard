"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
      toast({
        title: "Login successful",
        description: "Welcome back to the Addis Bus System",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-md flex-col items-center space-y-8 px-4">
        <div className="flex flex-col items-center space-y-2">
          <Logo />
          <h1 className="text-3xl font-bold">Welcome back to Dirlink</h1>
          <p className="text-center text-sm text-muted-foreground">Sign in-up to enjoy the best managing experience.</p>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                placeholder="enter your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-muted"
              />
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-muted pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "LOG IN"}
            </Button>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account yet?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
      <footer className="mt-8 w-full py-6 text-center">
        <div className="flex justify-center space-x-4">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy & Terms
          </Link>
          <Link href="/language" className="text-sm text-muted-foreground hover:underline">
            Language
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            Contact Us
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Powered By S4Y Development</p>
      </footer>
    </div>
  )
}
