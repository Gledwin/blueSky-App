import data from '@/lib/data'
import dbConnect from '@/lib/DBConnect'
import ProductModel from '@/lib/models/productModel'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const { products } = data
  await dbConnect()

  await ProductModel.deleteMany()
  await ProductModel.insertMany(products)

  return NextResponse.json({
    message: 'seeded successfully',
    products,
  })
}
