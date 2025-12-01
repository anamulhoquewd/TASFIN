"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  preferredDeliveryDate: string;
  dressType: string;
  measurements: string;
  designImage: File | null;
  additionalNotes: string;
}

export default function CustomOrderPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    preferredDeliveryDate: "",
    dressType: "",
    measurements: "",
    designImage: null,
    additionalNotes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      designImage: file,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate required fields
    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.preferredDeliveryDate ||
      !formData.dressType ||
      !formData.measurements
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        preferredDeliveryDate: "",
        dressType: "",
        measurements: "",
        designImage: null,
        additionalNotes: "",
      });

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.log("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-block text-sm font-light tracking-wide text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            ← BACK TO HOME
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gray-900 font-light tracking-tight">
            Create Your Custom Look
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-light mt-3">
            Share your vision, measurements, and preferences for a personalized
            dress creation experience.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            // Success Message
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-sm p-8 sm:p-12 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-gray-900">
                Order Received
              </h2>
              <p className="text-gray-600 font-light">
                Thank you for your custom order request. We&apos;ve received
                your details and will be in touch shortly to discuss your
                vision.
              </p>
              <p className="text-sm text-gray-500 font-light">
                Expected contact within 24-48 hours
              </p>
              <Link
                href="/"
                className="inline-block mt-6 px-6 py-3 text-sm font-light tracking-widest text-white bg-gray-900 rounded-sm hover:bg-gray-800 transition-colors"
              >
                RETURN HOME
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-sm p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-light text-gray-900 mb-2 uppercase tracking-wide"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-light text-gray-900 mb-2 uppercase tracking-wide"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-light text-gray-900 mb-2 uppercase tracking-wide"
                >
                  Email <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                />
              </div>

              {/* Preferred Delivery Date */}
              <div>
                <label
                  htmlFor="preferredDeliveryDate"
                  className="block text-sm font-light text-gray-900 mb-2 uppercase tracking-wide"
                >
                  Preferred Delivery Date{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="preferredDeliveryDate"
                  name="preferredDeliveryDate"
                  value={formData.preferredDeliveryDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                  required
                />
              </div>

              {/* Dress Type */}
              <div>
                <label
                  htmlFor="dressType"
                  className="block text-sm font-light text-gray-900 mb-2 uppercase tracking-wide"
                >
                  Dress Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="dressType"
                  name="dressType"
                  value={formData.dressType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors appearance-none bg-white"
                  required
                >
                  <option value="">Select a dress type</option>
                  <option value="3-piece">3-Piece</option>
                  <option value="2-piece">2-Piece</option>
                  <option value="kameez">Kameez</option>
                  <option value="gown">Gown</option>
                  <option value="lehenga">Lehenga</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Measurements */}
              <div>
                <label
                  htmlFor="measurements"
                  className="block text-sm font-light text-gray-900 mb-2 uppercase tracking-wide"
                >
                  Measurements <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="measurements"
                  name="measurements"
                  value={formData.measurements}
                  onChange={handleInputChange}
                  placeholder="Bust, Waist, Hip, Length, Sleeve length, etc."
                  rows={4}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors resize-none"
                  required
                />
              </div>

              {/* Design/Image Upload */}
              <div>
                <label
                  htmlFor="designImage"
                  className="block text-sm font-light text-gray-900 mb-2 uppercase tracking-wide"
                >
                  Upload Design/Image{" "}
                  <span className="text-gray-500">(optional)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-sm p-6 text-center cursor-pointer hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="designImage"
                    name="designImage"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <label htmlFor="designImage" className="cursor-pointer">
                    <svg
                      className="mx-auto h-8 w-8 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <p className="text-sm font-light text-gray-600">
                      {formData.designImage
                        ? formData.designImage.name
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </label>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label
                  htmlFor="additionalNotes"
                  className="block text-sm font-light text-gray-900 mb-2 uppercase tracking-wide"
                >
                  Additional Notes{" "}
                  <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Any special requests, color preferences, or design details..."
                  rows={4}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 text-sm font-light tracking-widest text-white bg-gray-900 rounded-sm hover:bg-gray-800 disabled:bg-gray-400 transition-all duration-300 ease-out active:scale-95"
                >
                  {loading ? "SUBMITTING..." : "SUBMIT CUSTOM ORDER"}
                </button>
              </div>

              {/* Help Text */}
              <p className="text-xs text-gray-500 text-center font-light">
                <span className="text-red-500">*</span> Required fields.
                We&apos;ll reach out within 24-48 hours.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
