import React from 'react'
import { useRouter } from 'next/router'
import Layout from './../../components/Layout'

export default function EventPage() {
  const router = useRouter()
  return (
    <Layout>
      <h1>My Event</h1>
    </Layout>
  )
}
