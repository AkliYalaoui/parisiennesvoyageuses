import { createClient } from '@/app/config/supabaseServerClient'
import { redirect } from 'next/navigation'


export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/admin/login')
  }

  return <p>Dashboard</p>
}