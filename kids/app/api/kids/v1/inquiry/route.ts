import { connectToDatabase } from '@/lib/mongodb'
import { KidsInquiry } from '@/lib/models/KidsInquiry'
import { inquirySchema } from '@/lib/validation'
import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate incoming data
    const validatedData = inquirySchema.parse(body)

    await connectToDatabase()

    // Save inquiry to database
    const inquiry = new KidsInquiry({
      fullName: validatedData.fullName,
      shopName: validatedData.shopName,
      city: validatedData.city,
      phone: validatedData.phone,
      email: validatedData.email,
      interestedProductIds: validatedData.interestedProductIds,
      estimatedQty: validatedData.estimatedQty || '',
      message: validatedData.message || '',
      status: 'New',
    })

    await inquiry.save()

    // Send email notification
    if (process.env.NOTIFY_EMAIL_TO && process.env.GMAIL_USER) {
      try {
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: process.env.NOTIFY_EMAIL_TO,
          subject: `New Inquiry from ${validatedData.fullName} - TASFIN | Kids`,
          html: `
            <h2>New Wholesale Inquiry</h2>
            <p><strong>Name:</strong> ${validatedData.fullName}</p>
            <p><strong>Shop/Company:</strong> ${validatedData.shopName}</p>
            <p><strong>City:</strong> ${validatedData.city}</p>
            <p><strong>Phone/WhatsApp:</strong> ${validatedData.phone}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Number of Interested Products:</strong> ${validatedData.interestedProductIds.length}</p>
            <p><strong>Estimated Quantity:</strong> ${validatedData.estimatedQty || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${validatedData.message || 'No additional message'}</p>
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              Inquiry ID: ${inquiry._id}
            </p>
          `,
        })
      } catch (emailError) {
        console.error('[v0] Failed to send notification email:', emailError)
        // Continue even if email fails - inquiry was saved successfully
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully',
        inquiryId: inquiry._id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Inquiry submission error:', error)

    if (error instanceof Error && 'issues' in error) {
      // Zod validation error
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}
