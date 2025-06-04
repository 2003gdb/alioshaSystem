// app/login/page.tsx
import { Suspense } from 'react'
import LoginDashboard from "@/components/login-dashboard"

// Loading component that matches your design
function LoginLoading() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-alioshaWhite flex items-center justify-center">
      <div className="relative z-20 w-full max-w-md mx-4">
        <div className="bg-white border border-black rounded-none p-8 shadow-lg">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
          <div className="text-center mb-8">
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mx-auto"></div>
          </div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginDashboard />
    </Suspense>
  )
}