export function isImageUrl(url: string): boolean {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const urlExtension = url.split("?")[0].split("#")[0].toLowerCase();
  return imageExtensions.some((extension) => urlExtension.endsWith(extension));
}

export function formatNumberByCurrency(
  amount: number,
  currency: string
): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency, // ex: 'USD', 'EUR'
  });
  return formatter.format(amount);
}
