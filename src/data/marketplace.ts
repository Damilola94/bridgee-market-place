import { Product } from "../types/marketplace";

export const PRODUCTS: Product[] = [
  {
    id: "headphones",
    vendor: "TeeGadgets",
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium wireless headphones with active noise cancellation and 30-hour battery life",
    fullDescription:
      "Immerse yourself in a world of pure audio bliss with Albatross headphones. These headphones combine cutting-edge noise-canceling technology with exceptional comfort. Enjoy crystal-clear highs, deep bass, and a balanced sound signature that brings your music to life. With up to 30 hours of battery life, you can stay immersed in sound all day long.",
    price: 120000,
    seed: "headphones-1",
  },
  {
    id: "art",
    vendor: "ArtisanCrafts",
    name: "Elysian Harmony: The Sound of Serenity",
    description:
      "An exquisite masterpiece that captures the essence of creativity, blending vibrant colors and intricate details to evoke deep emotions.",
    price: 2200000,
    seed: "abstract-art-1",
  },
  {
    id: "coffee",
    vendor: "FreshBrew Café",
    name: "Artisan Roasted Brew",
    description:
      "Savor the perfect blend of rich coffee flavors and smooth melodies, creating an unforgettable experience for your senses.",
    price: 20000,
    seed: "coffee-1",
  },
  {
    id: "meal",
    vendor: "Nature's Palette",
    name: "Nature's Bounty Organic Meal",
    description:
      "Indulge in nutritious meals that nourish your body and elevate your well-being.",
    price: 120000,
    seed: "healthy-food-1",
  },
  {
    id: "culinary",
    vendor: "Gourmet Delights",
    name: "Savory Symphony: A Culinary Masterpiece",
    description:
      "Experience a delightful culinary adventure with our exquisite dishes, each crafted to perfection using the finest ingredients.",
    price: 120000,
    seed: "gourmet-food-1",
  },
  {
    id: "fashion",
    vendor: "Urban Threads",
    name: "Chic Elegance",
    description:
      "Elevate your style with our chic urban dress pieces, designed to blend comfort and contemporary fashion seamlessly.",
    price: 120000,
    seed: "fashion-1",
  },
  {
    id: "perfume",
    vendor: "Whimsical Wonders",
    name: "Elysian Essence: A Fragrance of Dreams",
    description:
      "Step into the captivating realm of Fragrant Fantasies, where elegance intertwines with allure in our exquisite collection of artisanal perfumes.",
    price: 120000,
    seed: "perfume-1",
  },
  {
    id: "wonder",
    vendor: "Culinary Creations",
    name: "Wonder Creation",
    description:
      "Savor the exquisite flavors of our culinary masterpieces, each designed to delight your palate and enhance your dining journey.",
    price: 120000,
    seed: "pizza-1",
  },
  {
    id: "jewelry",
    vendor: "Timeless Treasures",
    name: "Radiant Piece",
    description:
      "Discover exquisite timeless jewellery that beautifully blends elegance and sophistication, perfect for any occasion.",
    price: 120000,
    seed: "jewelry-1",
  },
  {
    id: "speaker",
    vendor: "TeeGadgets",
    name: "Bluetooth Speaker",
    description:
      "Portable speaker with rich, room-filling sound and a battery that keeps up with the party.",
    price: 120000,
    seed: "bluetooth-speaker-1",
  },
  {
    id: "mouse",
    vendor: "TeeGadgets",
    name: "Lit Gaming Mouse",
    description:
      "RGB gaming mouse built for precision and speed, with programmable buttons for every play style.",
    price: 120000,
    seed: "gaming-mouse-1",
  },
];

export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function getProductById(id: string) {
  return PRODUCTS.find((product) => product.id === id);
}
