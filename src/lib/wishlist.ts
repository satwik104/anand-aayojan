export type WishlistType = 'product' | 'service';

export interface WishlistItem {
  id: string;
  type: WishlistType;
  name: string;
  image: string;
  price?: number;
}

const keyFor = (email: string) => `aa_wishlist_${email}`;

export const getWishlist = (email: string): WishlistItem[] => {
  if (!email) return [];
  const raw = localStorage.getItem(keyFor(email));
  try {
    return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
  } catch {
    return [];
  }
};

export const saveWishlist = (email: string, items: WishlistItem[]) => {
  if (!email) return;
  localStorage.setItem(keyFor(email), JSON.stringify(items));
};

export const addToWishlist = (email: string, item: WishlistItem): { added: boolean } => {
  if (!email) return { added: false };
  const list = getWishlist(email);
  const exists = list.some((i) => i.type === item.type && i.id === item.id);
  if (exists) return { added: false };
  const updated = [{ ...item }, ...list];
  saveWishlist(email, updated);
  return { added: true };
};

export const removeFromWishlist = (email: string, type: WishlistType, id: string) => {
  const list = getWishlist(email).filter((i) => !(i.type === type && i.id === id));
  saveWishlist(email, list);
};
