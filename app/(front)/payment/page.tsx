import { Metadata } from 'next'
import Form from './form'

export const metadata: Metadata = {
  title: 'Payment Method',
}

export default async function PaymentPage() {
  return <Form />
}
