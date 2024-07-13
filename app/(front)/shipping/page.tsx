import { Metadata } from 'next'
import Form from './form'

export const metadata: Metadata = {
  title: 'Shipping Address',
}

export default async function ShippingPage() {
  return <Form />
}
