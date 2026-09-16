"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappLink = `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20TASFIN%20Kids%20wholesale%20products.`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-8 right-8 z-50 p-3 md:p-4 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      title="Contact us on WhatsApp"
    >
      <MessageCircle className="size-6 md:size-7" />
    </a>
  );
}
