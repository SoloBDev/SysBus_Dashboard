"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/auth-context"
import { Logo } from "../components/logo"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "../hooks/use-toast"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    adminName: "",
    email: "",
    branch: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
      })
      return
    }

    setIsLoading(true)

    try {
      await signup({
        companyName: formData.companyName,
        adminName: formData.adminName,
        email: formData.email,
        branch: formData.branch,
        password: formData.password,
      })

      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "There was an error creating your account",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-between p-10">
        <div className="mb-8">
          <Logo />
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Let&apos;s get started</h1>
            <p className="mt-2 text-muted-foreground">
              Log in to your account so you can continue using our customer experience.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminName">Agent/Admin Name</Label>
              <Input
                id="adminName"
                name="adminName"
                placeholder="Admin Name"
                value={formData.adminName}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Branch (optional for others)</Label>
              <Input
                id="branch"
                name="branch"
                placeholder="your district(required for operators)"
                value={formData.branch}
                onChange={handleChange}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-12 pr-10"
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="h-12"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "SIGN UP"}
            </Button>
          </form>
        </div>
        <footer className="mt-8">
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy & Terms
            </Link>
            <Link to="/language" className="text-sm text-muted-foreground hover:underline">
              Language
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact Us
            </Link>
          </div>
        </footer>
      </div>
      <div className="hidden bg-primary md:block md:w-2/5">
        <div className="flex h-full items-center justify-center p-10">
          <div className="text-center text-primary-foreground">
            <blockquote className="text-3xl font-bold">
              &quot;Trust ADDIS BUS for reliable and efficient Travels across Ethiopia.&quot;
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}
