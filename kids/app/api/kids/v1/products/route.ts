import { connectToDatabase } from '@/lib/mongodb'
import { KidsProduct } from '@/lib/models/KidsProduct'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToDatabase()

    const products = await KidsProduct.find({ isActive: true })
      .select('-__v')
      .lean()

    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.error('[v0] Failed to fetch products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
