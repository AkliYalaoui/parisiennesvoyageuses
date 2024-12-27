'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../config/supabaseServerClient'


export async function login(formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw Error(error.message)
  }

  revalidatePath('/admin/dashboard', 'layout')
  redirect('/admin/dashboard')
}