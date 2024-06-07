import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProductsAsync, fetchProductByFiltersAsync, selectAllProducts } from "../productSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const sortOptions = [
  { name: "Most Popular", sort: "rating", current: true }, // for this not done but I have to do
  { name: "Best Rating", sort: "rating", current: false },
  { name: "Newest", sort: "date", current: false }, // for this not done but I have to do
  { name: "Price: Low to High", sort: "price", current: false },
  { name: "Price: High to Low", sort: "price", current: false },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: 'beauty', label: 'beauty', checked: false },
      { value: 'fragrances', label: 'fragrances', checked: false },
      { value: 'furniture', label: 'furniture', checked: false },
      { value: 'groceries', label: 'groceries', checked: false },
      {
        value: 'home-decoration',
        label: 'home decoration',
        checked: false
      },
      {
        value: 'kitchen-accessories',
        label: 'kitchen accessories',
        checked: false
      },
      { value: 'laptops', label: 'laptops', checked: false },
      { value: 'mens-shirts', label: 'mens shirts', checked: false },
      { value: 'mens-shoes', label: 'mens shoes', checked: false },
      { value: 'mens-watches', label: 'mens watches', checked: false },
      {
        value: 'mobile-accessories',
        label: 'mobile accessories',
        checked: false
      }
    ],
  },
  {
    id: "brands",
    name: "Brands",
    options: [
      { value: 'Essence', label: 'Essence', checked: false },
      { value: 'Glamour Beauty', label: 'Glamour Beauty', checked: false },
      { value: 'Velvet Touch', label: 'Velvet Touch', checked: false },
      { value: 'Chic Cosmetics', label: 'Chic Cosmetics', checked: false },
      { value: 'Nail Couture', label: 'Nail Couture', checked: false },
      { value: 'Calvin Klein', label: 'Calvin Klein', checked: false },
      { value: 'Chanel', label: 'Chanel', checked: false },
      { value: 'Dior', label: 'Dior', checked: false },
      {
        value: 'Dolce & Gabbana',
        label: 'Dolce & Gabbana',
        checked: false
      },
      { value: 'Gucci', label: 'Gucci', checked: false },
      {
        value: 'Annibale Colombo',
        label: 'Annibale Colombo',
        checked: false
      },
      { value: 'Furniture Co.', label: 'Furniture Co.', checked: false },
      { value: 'Knoll', label: 'Knoll', checked: false },
      { value: 'Bath Trends', label: 'Bath Trends', checked: false },
      { value: undefined, label: undefined, checked: false },
      { value: 'Apple', label: 'Apple', checked: false },
      { value: 'Asus', label: 'Asus', checked: false },
      { value: 'Huawei', label: 'Huawei', checked: false },
      { value: 'Lenovo', label: 'Lenovo', checked: false },
      { value: 'Dell', label: 'Dell', checked: false },
      { value: 'Fashion Trends', label: 'Fashion Trends', checked: false },
      { value: 'Gigabyte', label: 'Gigabyte', checked: false },
      { value: 'Classic Wear', label: 'Classic Wear', checked: false },
      { value: 'Casual Comfort', label: 'Casual Comfort', checked: false },
      { value: 'Urban Chic', label: 'Urban Chic', checked: false },
      { value: 'Nike', label: 'Nike', checked: false },
      { value: 'Puma', label: 'Puma', checked: false },
      { value: 'Off White', label: 'Off White', checked: false },
      {
        value: 'Fashion Timepieces',
        label: 'Fashion Timepieces',
        checked: false
      },
      { value: 'Longines', label: 'Longines', checked: false },
      { value: 'Rolex', label: 'Rolex', checked: false },
      { value: 'Amazon', label: 'Amazon', checked: false }
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// const products = [
//   {
//     id: 1,
//     title: "iPhone 9",
//     description: "An apple mobile which is nothing like apple",
//     price: 549,
//     discountPercentage: 12.96,
//     rating: 4.69,
//     stock: 94,
//     brand: "Apple",
//     category: "smartphones",
//     thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/1/1.jpg",
//       "https://cdn.dummyjson.com/product-images/1/2.jpg",
//       "https://cdn.dummyjson.com/product-images/1/3.jpg",
//       "https://cdn.dummyjson.com/product-images/1/4.jpg",
//       "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 2,
//     title: "iPhone X",
//     description:
//       "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
//     price: 899,
//     discountPercentage: 17.94,
//     rating: 4.44,
//     stock: 34,
//     brand: "Apple",
//     category: "smartphones",
//     thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/2/1.jpg",
//       "https://cdn.dummyjson.com/product-images/2/2.jpg",
//       "https://cdn.dummyjson.com/product-images/2/3.jpg",
//       "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 3,
//     title: "Samsung Universe 9",
//     description:
//       "Samsung's new variant which goes beyond Galaxy to the Universe",
//     price: 1249,
//     discountPercentage: 15.46,
//     rating: 4.09,
//     stock: 36,
//     brand: "Samsung",
//     category: "smartphones",
//     thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
//     images: ["https://cdn.dummyjson.com/product-images/3/1.jpg"],
//   },
//   {
//     id: 4,
//     title: "OPPOF19",
//     description: "OPPO F19 is officially announced on April 2021.",
//     price: 280,
//     discountPercentage: 17.91,
//     rating: 4.3,
//     stock: 123,
//     brand: "OPPO",
//     category: "smartphones",
//     thumbnail: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/4/1.jpg",
//       "https://cdn.dummyjson.com/product-images/4/2.jpg",
//       "https://cdn.dummyjson.com/product-images/4/3.jpg",
//       "https://cdn.dummyjson.com/product-images/4/4.jpg",
//       "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 5,
//     title: "Huawei P30",
//     description:
//       "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
//     price: 499,
//     discountPercentage: 10.58,
//     rating: 4.09,
//     stock: 32,
//     brand: "Huawei",
//     category: "smartphones",
//     thumbnail: "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/5/1.jpg",
//       "https://cdn.dummyjson.com/product-images/5/2.jpg",
//       "https://cdn.dummyjson.com/product-images/5/3.jpg",
//     ],
//   },
//   {
//     id: 6,
//     title: "MacBook Pro",
//     description:
//       "MacBook Pro 2021 with mini-LED display may launch between September, November",
//     price: 1749,
//     discountPercentage: 11.02,
//     rating: 4.57,
//     stock: 83,
//     brand: "Apple",
//     category: "laptops",
//     thumbnail: "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
//     images: [
//       "https://cdn.dummyjson.com/product-images/6/1.png",
//       "https://cdn.dummyjson.com/product-images/6/2.jpg",
//       "https://cdn.dummyjson.com/product-images/6/3.png",
//       "https://cdn.dummyjson.com/product-images/6/4.jpg",
//     ],
//   },
//   {
//     id: 7,
//     title: "Samsung Galaxy Book",
//     description:
//       "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
//     price: 1499,
//     discountPercentage: 4.15,
//     rating: 4.25,
//     stock: 50,
//     brand: "Samsung",
//     category: "laptops",
//     thumbnail: "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/7/1.jpg",
//       "https://cdn.dummyjson.com/product-images/7/2.jpg",
//       "https://cdn.dummyjson.com/product-images/7/3.jpg",
//       "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 8,
//     title: "Microsoft Surface Laptop 4",
//     description:
//       "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
//     price: 1499,
//     discountPercentage: 10.23,
//     rating: 4.43,
//     stock: 68,
//     brand: "Microsoft Surface",
//     category: "laptops",
//     thumbnail: "https://cdn.dummyjson.com/product-images/8/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/8/1.jpg",
//       "https://cdn.dummyjson.com/product-images/8/2.jpg",
//       "https://cdn.dummyjson.com/product-images/8/3.jpg",
//       "https://cdn.dummyjson.com/product-images/8/4.jpg",
//       "https://cdn.dummyjson.com/product-images/8/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 9,
//     title: "Infinix INBOOK",
//     description:
//       "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
//     price: 1099,
//     discountPercentage: 11.83,
//     rating: 4.54,
//     stock: 96,
//     brand: "Infinix",
//     category: "laptops",
//     thumbnail: "https://cdn.dummyjson.com/product-images/9/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/9/1.jpg",
//       "https://cdn.dummyjson.com/product-images/9/2.png",
//       "https://cdn.dummyjson.com/product-images/9/3.png",
//       "https://cdn.dummyjson.com/product-images/9/4.jpg",
//       "https://cdn.dummyjson.com/product-images/9/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 10,
//     title: "HP Pavilion 15-DK1056WM",
//     description:
//       "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
//     price: 1099,
//     discountPercentage: 6.18,
//     rating: 4.43,
//     stock: 89,
//     brand: "HP Pavilion",
//     category: "laptops",
//     thumbnail: "https://cdn.dummyjson.com/product-images/10/thumbnail.jpeg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/10/1.jpg",
//       "https://cdn.dummyjson.com/product-images/10/2.jpg",
//       "https://cdn.dummyjson.com/product-images/10/3.jpg",
//       "https://cdn.dummyjson.com/product-images/10/thumbnail.jpeg",
//     ],
//   },
//   {
//     id: 11,
//     title: "perfume Oil",
//     description:
//       "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
//     price: 13,
//     discountPercentage: 8.4,
//     rating: 4.26,
//     stock: 65,
//     brand: "Impression of Acqua Di Gio",
//     category: "fragrances",
//     thumbnail: "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/11/1.jpg",
//       "https://cdn.dummyjson.com/product-images/11/2.jpg",
//       "https://cdn.dummyjson.com/product-images/11/3.jpg",
//       "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 12,
//     title: "Brown Perfume",
//     description: "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
//     price: 40,
//     discountPercentage: 15.66,
//     rating: 4,
//     stock: 52,
//     brand: "Royal_Mirage",
//     category: "fragrances",
//     thumbnail: "https://cdn.dummyjson.com/product-images/12/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/12/1.jpg",
//       "https://cdn.dummyjson.com/product-images/12/2.jpg",
//       "https://cdn.dummyjson.com/product-images/12/3.png",
//       "https://cdn.dummyjson.com/product-images/12/4.jpg",
//       "https://cdn.dummyjson.com/product-images/12/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 13,
//     title: "Fog Scent Xpressio Perfume",
//     description:
//       "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
//     price: 13,
//     discountPercentage: 8.14,
//     rating: 4.59,
//     stock: 61,
//     brand: "Fog Scent Xpressio",
//     category: "fragrances",
//     thumbnail: "https://cdn.dummyjson.com/product-images/13/thumbnail.webp",
//     images: [
//       "https://cdn.dummyjson.com/product-images/13/1.jpg",
//       "https://cdn.dummyjson.com/product-images/13/2.png",
//       "https://cdn.dummyjson.com/product-images/13/3.jpg",
//       "https://cdn.dummyjson.com/product-images/13/4.jpg",
//       "https://cdn.dummyjson.com/product-images/13/thumbnail.webp",
//     ],
//   },
//   {
//     id: 14,
//     title: "Non-Alcoholic Concentrated Perfume Oil",
//     description:
//       "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
//     price: 120,
//     discountPercentage: 15.6,
//     rating: 4.21,
//     stock: 114,
//     brand: "Al Munakh",
//     category: "fragrances",
//     thumbnail: "https://cdn.dummyjson.com/product-images/14/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/14/1.jpg",
//       "https://cdn.dummyjson.com/product-images/14/2.jpg",
//       "https://cdn.dummyjson.com/product-images/14/3.jpg",
//       "https://cdn.dummyjson.com/product-images/14/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 15,
//     title: "Eau De Perfume Spray",
//     description:
//       "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
//     price: 30,
//     discountPercentage: 10.99,
//     rating: 4.7,
//     stock: 105,
//     brand: "Lord - Al-Rehab",
//     category: "fragrances",
//     thumbnail: "https://cdn.dummyjson.com/product-images/15/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/15/1.jpg",
//       "https://cdn.dummyjson.com/product-images/15/2.jpg",
//       "https://cdn.dummyjson.com/product-images/15/3.jpg",
//       "https://cdn.dummyjson.com/product-images/15/4.jpg",
//       "https://cdn.dummyjson.com/product-images/15/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 16,
//     title: "Hyaluronic Acid Serum",
//     description:
//       "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
//     price: 19,
//     discountPercentage: 13.31,
//     rating: 4.83,
//     stock: 110,
//     brand: "L'Oreal Paris",
//     category: "skincare",
//     thumbnail: "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/16/1.png",
//       "https://cdn.dummyjson.com/product-images/16/2.webp",
//       "https://cdn.dummyjson.com/product-images/16/3.jpg",
//       "https://cdn.dummyjson.com/product-images/16/4.jpg",
//       "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 17,
//     title: "Tree Oil 30ml",
//     description:
//       "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
//     price: 12,
//     discountPercentage: 4.09,
//     rating: 4.52,
//     stock: 78,
//     brand: "Hemani Tea",
//     category: "skincare",
//     thumbnail: "https://cdn.dummyjson.com/product-images/17/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/17/1.jpg",
//       "https://cdn.dummyjson.com/product-images/17/2.jpg",
//       "https://cdn.dummyjson.com/product-images/17/3.jpg",
//       "https://cdn.dummyjson.com/product-images/17/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 18,
//     title: "Oil Free Moisturizer 100ml",
//     description:
//       "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
//     price: 40,
//     discountPercentage: 13.1,
//     rating: 4.56,
//     stock: 88,
//     brand: "Dermive",
//     category: "skincare",
//     thumbnail: "https://cdn.dummyjson.com/product-images/18/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/18/1.jpg",
//       "https://cdn.dummyjson.com/product-images/18/2.jpg",
//       "https://cdn.dummyjson.com/product-images/18/3.jpg",
//       "https://cdn.dummyjson.com/product-images/18/4.jpg",
//       "https://cdn.dummyjson.com/product-images/18/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 19,
//     title: "Skin Beauty Serum.",
//     description:
//       "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
//     price: 46,
//     discountPercentage: 10.68,
//     rating: 4.42,
//     stock: 54,
//     brand: "ROREC White Rice",
//     category: "skincare",
//     thumbnail: "https://cdn.dummyjson.com/product-images/19/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/19/1.jpg",
//       "https://cdn.dummyjson.com/product-images/19/2.jpg",
//       "https://cdn.dummyjson.com/product-images/19/3.png",
//       "https://cdn.dummyjson.com/product-images/19/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 20,
//     title: "Freckle Treatment Cream- 15gm",
//     description:
//       "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
//     price: 70,
//     discountPercentage: 16.99,
//     rating: 4.06,
//     stock: 140,
//     brand: "Fair & Clear",
//     category: "skincare",
//     thumbnail: "https://cdn.dummyjson.com/product-images/20/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/20/1.jpg",
//       "https://cdn.dummyjson.com/product-images/20/2.jpg",
//       "https://cdn.dummyjson.com/product-images/20/3.jpg",
//       "https://cdn.dummyjson.com/product-images/20/4.jpg",
//       "https://cdn.dummyjson.com/product-images/20/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 21,
//     title: "- Daal Masoor 500 grams",
//     description: "Fine quality Branded Product Keep in a cool and dry place",
//     price: 20,
//     discountPercentage: 4.81,
//     rating: 4.44,
//     stock: 133,
//     brand: "Saaf & Khaas",
//     category: "groceries",
//     thumbnail: "https://cdn.dummyjson.com/product-images/21/thumbnail.png",
//     images: [
//       "https://cdn.dummyjson.com/product-images/21/1.png",
//       "https://cdn.dummyjson.com/product-images/21/2.jpg",
//       "https://cdn.dummyjson.com/product-images/21/3.jpg",
//     ],
//   },
//   {
//     id: 22,
//     title: "Elbow Macaroni - 400 gm",
//     description: "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
//     price: 14,
//     discountPercentage: 15.58,
//     rating: 4.57,
//     stock: 146,
//     brand: "Bake Parlor Big",
//     category: "groceries",
//     thumbnail: "https://cdn.dummyjson.com/product-images/22/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/22/1.jpg",
//       "https://cdn.dummyjson.com/product-images/22/2.jpg",
//       "https://cdn.dummyjson.com/product-images/22/3.jpg",
//     ],
//   },
//   {
//     id: 23,
//     title: "Orange Essence Food Flavou",
//     description:
//       "Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item",
//     price: 14,
//     discountPercentage: 8.04,
//     rating: 4.85,
//     stock: 26,
//     brand: "Baking Food Items",
//     category: "groceries",
//     thumbnail: "https://cdn.dummyjson.com/product-images/23/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/23/1.jpg",
//       "https://cdn.dummyjson.com/product-images/23/2.jpg",
//       "https://cdn.dummyjson.com/product-images/23/3.jpg",
//       "https://cdn.dummyjson.com/product-images/23/4.jpg",
//       "https://cdn.dummyjson.com/product-images/23/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 24,
//     title: "cereals muesli fruit nuts",
//     description:
//       "original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji",
//     price: 46,
//     discountPercentage: 16.8,
//     rating: 4.94,
//     stock: 113,
//     brand: "fauji",
//     category: "groceries",
//     thumbnail: "https://cdn.dummyjson.com/product-images/24/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/24/1.jpg",
//       "https://cdn.dummyjson.com/product-images/24/2.jpg",
//       "https://cdn.dummyjson.com/product-images/24/3.jpg",
//       "https://cdn.dummyjson.com/product-images/24/4.jpg",
//       "https://cdn.dummyjson.com/product-images/24/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 25,
//     title: "Gulab Powder 50 Gram",
//     description: "Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds",
//     price: 70,
//     discountPercentage: 13.58,
//     rating: 4.87,
//     stock: 47,
//     brand: "Dry Rose",
//     category: "groceries",
//     thumbnail: "https://cdn.dummyjson.com/product-images/25/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/25/1.png",
//       "https://cdn.dummyjson.com/product-images/25/2.jpg",
//       "https://cdn.dummyjson.com/product-images/25/3.png",
//       "https://cdn.dummyjson.com/product-images/25/4.jpg",
//       "https://cdn.dummyjson.com/product-images/25/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 26,
//     title: "Plant Hanger For Home",
//     description:
//       "Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
//     price: 41,
//     discountPercentage: 17.86,
//     rating: 4.08,
//     stock: 131,
//     brand: "Boho Decor",
//     category: "home-decoration",
//     thumbnail: "https://cdn.dummyjson.com/product-images/26/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/26/1.jpg",
//       "https://cdn.dummyjson.com/product-images/26/2.jpg",
//       "https://cdn.dummyjson.com/product-images/26/3.jpg",
//       "https://cdn.dummyjson.com/product-images/26/4.jpg",
//       "https://cdn.dummyjson.com/product-images/26/5.jpg",
//       "https://cdn.dummyjson.com/product-images/26/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 27,
//     title: "Flying Wooden Bird",
//     description:
//       "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
//     price: 51,
//     discountPercentage: 15.58,
//     rating: 4.41,
//     stock: 17,
//     brand: "Flying Wooden",
//     category: "home-decoration",
//     thumbnail: "https://cdn.dummyjson.com/product-images/27/thumbnail.webp",
//     images: [
//       "https://cdn.dummyjson.com/product-images/27/1.jpg",
//       "https://cdn.dummyjson.com/product-images/27/2.jpg",
//       "https://cdn.dummyjson.com/product-images/27/3.jpg",
//       "https://cdn.dummyjson.com/product-images/27/4.jpg",
//       "https://cdn.dummyjson.com/product-images/27/thumbnail.webp",
//     ],
//   },
//   {
//     id: 28,
//     title: "3D Embellishment Art Lamp",
//     description:
//       "3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)",
//     price: 20,
//     discountPercentage: 16.49,
//     rating: 4.82,
//     stock: 54,
//     brand: "LED Lights",
//     category: "home-decoration",
//     thumbnail: "https://cdn.dummyjson.com/product-images/28/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/28/1.jpg",
//       "https://cdn.dummyjson.com/product-images/28/2.jpg",
//       "https://cdn.dummyjson.com/product-images/28/3.png",
//       "https://cdn.dummyjson.com/product-images/28/4.jpg",
//       "https://cdn.dummyjson.com/product-images/28/thumbnail.jpg",
//     ],
//   },
//   {
//     id: 29,
//     title: "Handcraft Chinese style",
//     description:
//       "Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate",
//     price: 60,
//     discountPercentage: 15.34,
//     rating: 4.44,
//     stock: 7,
//     brand: "luxury palace",
//     category: "home-decoration",
//     thumbnail: "https://cdn.dummyjson.com/product-images/29/thumbnail.webp",
//     images: [
//       "https://cdn.dummyjson.com/product-images/29/1.jpg",
//       "https://cdn.dummyjson.com/product-images/29/2.jpg",
//       "https://cdn.dummyjson.com/product-images/29/3.webp",
//       "https://cdn.dummyjson.com/product-images/29/4.webp",
//       "https://cdn.dummyjson.com/product-images/29/thumbnail.webp",
//     ],
//   },
//   {
//     id: 30,
//     title: "Key Holder",
//     description:
//       "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
//     price: 30,
//     discountPercentage: 2.92,
//     rating: 4.92,
//     stock: 54,
//     brand: "Golden",
//     category: "home-decoration",
//     thumbnail: "https://cdn.dummyjson.com/product-images/30/thumbnail.jpg",
//     images: [
//       "https://cdn.dummyjson.com/product-images/30/1.jpg",
//       "https://cdn.dummyjson.com/product-images/30/2.jpg",
//       "https://cdn.dummyjson.com/product-images/30/3.jpg",
//       "https://cdn.dummyjson.com/product-images/30/thumbnail.jpg",
//     ],
//   },
// ];

// const oldProducts = [
//   {
//     id: 1,
//     name: "Wireless Bluetooth Headphones",
//     description:
//       "High-quality wireless headphones with noise cancellation and 20 hours of battery life.",
//     price: 99.99,
//     category: "Electronics",
//     Thumbnail: "https://source.unsplash.com/random/?headphones",
//     imageAlt: "Wireless Bluetooth Headphones",
//     color: "Black",
//     brand: "AudioMax",
//     href: "#",
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     description:
//       "A sleek smartwatch with fitness tracking, heart rate monitoring, and customizable watch faces.",
//     price: 149.99,
//     category: "Wearables",
//     Thumbnail: "https://source.unsplash.com/random/?smartwatch",
//     imageAlt: "Smart Watch",
//     color: "Silver",
//     brand: "FitTech",
//     href: "#",
//   },
//   {
//     id: 3,
//     name: "Gaming Laptop",
//     description:
//       "High-performance gaming laptop with the latest graphics card and fast processor.",
//     price: 1199.99,
//     category: "Computers",
//     Thumbnail: "https://source.unsplash.com/random/?gaming_laptop",
//     imageAlt: "Gaming Laptop",
//     color: "Black",
//     brand: "GamePro",
//     href: "#",
//   },
//   {
//     id: 4,
//     name: "Digital Camera",
//     description:
//       "Compact digital camera with 20.1 MP resolution and 4K video recording.",
//     price: 499.99,
//     category: "Cameras",
//     Thumbnail: "https://source.unsplash.com/random/?digital_camera",
//     imageAlt: "Digital Camera",
//     color: "Black",
//     brand: "CamStar",
//     href: "#",
//   },
//   {
//     id: 5,
//     name: "Running Shoes",
//     description:
//       "Comfortable and durable running shoes designed for all terrains.",
//     price: 69.99,
//     category: "Footwear",
//     Thumbnail: "https://source.unsplash.com/random/?running_shoes",
//     imageAlt: "Running Shoes",
//     color: "Blue",
//     brand: "RunFast",
//     href: "#",
//   },
//   {
//     id: 6,
//     name: "Electric Kettle",
//     description:
//       "Fast-boiling electric kettle with auto shut-off and 1.7-liter capacity.",
//     price: 29.99,
//     category: "Kitchen Appliances",
//     Thumbnail: "https://source.unsplash.com/random/?electric_kettle",
//     imageAlt: "Electric Kettle",
//     color: "White",
//     brand: "KitchenEase",
//     href: "#",
//   },
//   {
//     id: 7,
//     name: "Backpack",
//     description:
//       "Durable backpack with multiple compartments and waterproof material.",
//     price: 39.99,
//     category: "Accessories",
//     Thumbnail: "https://source.unsplash.com/random/?backpack",
//     imageAlt: "Backpack",
//     color: "Grey",
//     brand: "PackIt",
//     href: "#",
//   },
//   {
//     id: 8,
//     name: "LED Desk Lamp",
//     description:
//       "Adjustable LED desk lamp with touch control and USB charging port.",
//     price: 24.99,
//     category: "Home Office",
//     Thumbnail: "https://source.unsplash.com/random/?led_desk_lamp",
//     imageAlt: "LED Desk Lamp",
//     color: "White",
//     brand: "BrightLite",
//     href: "#",
//   },
//   {
//     id: 9,
//     name: "Smartphone",
//     description:
//       "Latest model smartphone with a high-resolution display and advanced camera features.",
//     price: 699.99,
//     category: "Mobile Phones",
//     Thumbnail: "https://source.unsplash.com/random/?smartphone",
//     imageAlt: "Smartphone",
//     color: "Black",
//     brand: "PhonePro",
//     href: "#",
//   },
//   {
//     id: 10,
//     name: "Fitness Tracker",
//     description:
//       "Lightweight fitness tracker with heart rate monitoring and sleep tracking.",
//     price: 49.99,
//     category: "Wearables",
//     Thumbnail: "https://source.unsplash.com/random/?fitness_tracker",
//     imageAlt: "Fitness Tracker",
//     color: "Black",
//     brand: "FitLife",
//     href: "#",
//   },
//   {
//     id: 11,
//     name: "Bluetooth Speaker",
//     description:
//       "Portable Bluetooth speaker with powerful sound and 10-hour battery life.",
//     price: 59.99,
//     category: "Electronics",
//     Thumbnail: "https://source.unsplash.com/random/?bluetooth_speaker",
//     imageAlt: "Bluetooth Speaker",
//     color: "Red",
//     brand: "SoundWave",
//     href: "#",
//   },
//   {
//     id: 12,
//     name: "4K UHD TV",
//     description: "55-inch 4K UHD TV with HDR and smart features.",
//     price: 399.99,
//     category: "Home Entertainment",
//     Thumbnail: "https://source.unsplash.com/random/?4k_tv",
//     imageAlt: "4K UHD TV",
//     color: "Black",
//     brand: "VisionPlus",
//     href: "#",
//   },
//   {
//     id: 13,
//     name: "Electric Toothbrush",
//     description:
//       "Rechargeable electric toothbrush with multiple cleaning modes.",
//     price: 39.99,
//     category: "Personal Care",
//     Thumbnail: "https://source.unsplash.com/random/?electric_toothbrush",
//     imageAlt: "Electric Toothbrush",
//     color: "White",
//     brand: "SmileCare",
//     href: "#",
//   },
//   {
//     id: 14,
//     name: "Espresso Machine",
//     description:
//       "Compact espresso machine with milk frother and adjustable settings.",
//     price: 149.99,
//     category: "Kitchen Appliances",
//     Thumbnail: "https://source.unsplash.com/random/?espresso_machine",
//     imageAlt: "Espresso Machine",
//     color: "Silver",
//     brand: "CaffePro",
//     href: "#",
//   },
//   {
//     id: 15,
//     name: "Yoga Mat",
//     description: "Non-slip yoga mat with extra cushioning and carrying strap.",
//     price: 29.99,
//     category: "Fitness",
//     Thumbnail: "https://source.unsplash.com/random/?yoga_mat",
//     imageAlt: "Yoga Mat",
//     color: "Purple",
//     brand: "ZenFlex",
//     href: "#",
//   },
//   {
//     id: 16,
//     name: "Drone",
//     description:
//       "Quadcopter drone with 1080p camera and GPS return home feature.",
//     price: 299.99,
//     category: "Electronics",
//     Thumbnail: "https://source.unsplash.com/random/?drone",
//     imageAlt: "Drone",
//     color: "White",
//     brand: "SkyTech",
//     href: "#",
//   },
//   {
//     id: 17,
//     name: "Mechanical Keyboard",
//     description: "RGB backlit mechanical keyboard with customizable keys.",
//     price: 89.99,
//     category: "Computers",
//     Thumbnail: "https://source.unsplash.com/random/?mechanical_keyboard",
//     imageAlt: "Mechanical Keyboard",
//     color: "Black",
//     brand: "TypeMaster",
//     href: "#",
//   },
//   {
//     id: 18,
//     name: "Wireless Mouse",
//     description: "Ergonomic wireless mouse with adjustable DPI settings.",
//     price: 19.99,
//     category: "Computers",
//     Thumbnail: "https://source.unsplash.com/random/?wireless_mouse",
//     imageAlt: "Wireless Mouse",
//     color: "Black",
//     brand: "MouseTech",
//     href: "#",
//   },
//   {
//     id: 19,
//     name: "Water Bottle",
//     description: "Stainless steel water bottle with double-wall insulation.",
//     price: 15.99,
//     category: "Outdoor",
//     Thumbnail: "https://source.unsplash.com/random/?water_bottle",
//     imageAlt: "Water Bottle",
//     color: "Blue",
//     brand: "HydroFlow",
//     href: "#",
//   },
//   {
//     id: 20,
//     name: "Portable Charger",
//     description: "10,000mAh portable charger with dual USB ports.",
//     price: 29.99,
//     category: "Electronics",
//     Thumbnail: "https://source.unsplash.com/random/?portable_charger",
//     imageAlt: "Portable Charger",
//     color: "Black",
//     brand: "Lyne",
//     href: "#",
//   },
// ];

export default function ProductList() {
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({})

  const handleFilter = (e, section, option) =>{
    const newFilter = {...filter, [section.id]: option.value}
    setFilter(newFilter)
    dispatch(fetchProductByFiltersAsync(newFilter))
    console.log(section.id, option.value)
  }
  
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  return (
    <div>
      <div>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                className="relative z-40 lg:hidden"
                onClose={setMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          Filters
                        </h2>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Filters */}
                      <form className="mt-4 border-t border-gray-200">
                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-t border-gray-200 px-4 py-6"
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {section.name}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            defaultChecked={option.checked}
                                            onChange={e=>handleFilter(e, section, option)}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  All Products
                </h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <a
                                  href={option.href}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onClick={e=>handleFilter(e, section, option)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    <div className="bg-white">
                      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                          {products.map((product) => (
                            <Link to="/product-detail">
                              <div
                                key={product.id}
                                className="group relative border-solid border-2 border-gray-200 p-1"
                              >
                                <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                  <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                  />
                                </div>
                                <div className="mt-4 flex justify-between">
                                  <div>
                                    <h3 className="text-sm text-gray-700">
                                      <a href={product.thumbnail}>
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0"
                                        />
                                        {product.title}
                                      </a>
                                    </h3>
                                    <p className="align-middle mt-1 text-sm text-gray-500">
                                      <StarIcon className="w-6 h-6 inline"></StarIcon>
                                      <span className="align-bottom">
                                        {product.rating}
                                      </span>
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      $
                                      {Math.round(
                                        product.price *
                                          (1 - product.discountPercentage / 100)
                                      )}
                                    </p>
                                    <p className="text-sm line-through font-medium text-gray-400">
                                      ${product.price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* section of products and filters end here */}
              {/* pagination */}
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <a
                    href="/"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="/"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">10</span> of{" "}
                      <span className="font-medium">97</span> results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <a
                        href="/"
                        className="relative inline-flenpx items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                      {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                      <a
                        href="/"
                        aria-current="page"
                        className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        1
                      </a>
                      <a
                        href="/"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        2
                      </a>
                      <a
                        href="/"
                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                      >
                        3
                      </a>
                      <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        ...
                      </span>
                      <a
                        href="/"
                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                      >
                        8
                      </a>
                      <a
                        href="/"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        9
                      </a>
                      <a
                        href="/"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        10
                      </a>
                      <a
                        href="/"
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
