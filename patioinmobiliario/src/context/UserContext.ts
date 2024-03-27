'use server';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function UserContext() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()

  if (data?.user === null) {
    return { data: null }
  }

  if (error || !data?.user) {
    redirect('/')
  }

  return { data }
}