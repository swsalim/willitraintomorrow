'use server'

import { cookies } from 'next/headers'

export async function setTempScale(data: FormData) {
  console.log('Set Temperature')
  // console.log(request)
  // const formData = await request.formData()
  const temperature = data.get('tempScale') as string
  // const temperature = formData.get('temperature')

  cookies().set('tempScale', temperature)
}
