'use client'

import { useSession } from "next-auth/react"

export default function AuthHomeView() {
  const { data: session } = useSession()

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <h1>Welcome, {session?.user?.name}!</h1>
      {/* Add your authenticated user content here */}
    </div>
  )
}