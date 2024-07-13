import ProductItem from '@/components/products/productItem'
import data from '@/lib/data'
import productService from '@/lib/services/productService'
import { convertDocToObj } from '@/lib/utilis/utilis'
import { Metadata } from 'next'
import Link from 'next/link'
import BecomeAUser from '../become-a-user/page'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'BlueSky BookStore',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Nextjs, Server components, Next auth, daisyui, zustand',
}

export default async function Home() {
  const availableBooks  = await productService.getAvailableBooks()
  return (
    <>
     
      <h2 className="text-2xl py-2">Available Books</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {availableBooks.map((product) => (
          <ProductItem key={product.slug} product={convertDocToObj(product)} />
        ))}
      </div>
    </>
  )
}
