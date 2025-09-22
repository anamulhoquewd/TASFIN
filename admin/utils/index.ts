export const formatPrice = (price: number = 0) =>
  `BDT ${price.toLocaleString()}`;

// Function to copy the access key to clipboard
export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
