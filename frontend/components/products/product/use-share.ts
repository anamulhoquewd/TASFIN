import { useState } from "react";

const NEXT_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN as string;
const NEXT_PUBLIC_WHATS_APP = process.env.NEXT_PUBLIC_WHATS_APP as string;

function useShare() {
  const [copied, setCopied] = useState(false);

  const handleProductShareInWA = ({ url }: { url: string }) => {
    const message = `Hi, I'm interested in this product: ${NEXT_PUBLIC_DOMAIN}${url}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${NEXT_PUBLIC_WHATS_APP}?text=${encodedMessage}`;
    console.log("Clicked: ", url);
    window.open(whatsappLink, "_blank");
  };

  const handleOrderIssueShareInWA = ({ orderId }: { orderId: string }) => {
    const message = `Hi, I have an issue regarding my order (Order ID: ${orderId}). Please check this order and help me resolve the problem.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${NEXT_PUBLIC_WHATS_APP}?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
  };

  const handleShare = async ({ url }: { url: string }) => {
    try {
      await navigator.clipboard.writeText(`${NEXT_PUBLIC_DOMAIN}${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return {
    handleProductShareInWA,
    handleShare,
    copied,
    handleOrderIssueShareInWA,
  };
}

export default useShare;
