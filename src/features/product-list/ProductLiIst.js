import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync, selectCount } from "./productListSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 20 hours of battery life.",
    price: 99.99,
    category: "Electronics",
    imageSrc: "https://source.unsplash.com/random/?headphones",
    imageAlt: "Wireless Bluetooth Headphones",
    color: "Black",
    brand: "AudioMax",
    href: "#",
  },
  {
    id: 2,
    name: "Smart Watch",
    description:
      "A sleek smartwatch with fitness tracking, heart rate monitoring, and customizable watch faces.",
    price: 149.99,
    category: "Wearables",
    imageSrc: "https://source.unsplash.com/random/?smartwatch",
    imageAlt: "Smart Watch",
    color: "Silver",
    brand: "FitTech",
    href: "#",
  },
  {
    id: 3,
    name: "Gaming Laptop",
    description:
      "High-performance gaming laptop with the latest graphics card and fast processor.",
    price: 1199.99,
    category: "Computers",
    imageSrc: "https://source.unsplash.com/random/?gaming_laptop",
    imageAlt: "Gaming Laptop",
    color: "Black",
    brand: "GamePro",
    href: "#",
  },
  {
    id: 4,
    name: "Digital Camera",
    description:
      "Compact digital camera with 20.1 MP resolution and 4K video recording.",
    price: 499.99,
    category: "Cameras",
    imageSrc: "https://source.unsplash.com/random/?digital_camera",
    imageAlt: "Digital Camera",
    color: "Black",
    brand: "CamStar",
    href: "#",
  },
  {
    id: 5,
    name: "Running Shoes",
    description:
      "Comfortable and durable running shoes designed for all terrains.",
    price: 69.99,
    category: "Footwear",
    imageSrc: "https://source.unsplash.com/random/?running_shoes",
    imageAlt: "Running Shoes",
    color: "Blue",
    brand: "RunFast",
    href: "#",
  },
  {
    id: 6,
    name: "Electric Kettle",
    description:
      "Fast-boiling electric kettle with auto shut-off and 1.7-liter capacity.",
    price: 29.99,
    category: "Kitchen Appliances",
    imageSrc: "https://source.unsplash.com/random/?electric_kettle",
    imageAlt: "Electric Kettle",
    color: "White",
    brand: "KitchenEase",
    href: "#",
  },
  {
    id: 7,
    name: "Backpack",
    description:
      "Durable backpack with multiple compartments and waterproof material.",
    price: 39.99,
    category: "Accessories",
    imageSrc: "https://source.unsplash.com/random/?backpack",
    imageAlt: "Backpack",
    color: "Grey",
    brand: "PackIt",
    href: "#",
  },
  {
    id: 8,
    name: "LED Desk Lamp",
    description:
      "Adjustable LED desk lamp with touch control and USB charging port.",
    price: 24.99,
    category: "Home Office",
    imageSrc: "https://source.unsplash.com/random/?led_desk_lamp",
    imageAlt: "LED Desk Lamp",
    color: "White",
    brand: "BrightLite",
    href: "#",
  },
  {
    id: 9,
    name: "Smartphone",
    description:
      "Latest model smartphone with a high-resolution display and advanced camera features.",
    price: 699.99,
    category: "Mobile Phones",
    imageSrc: "https://source.unsplash.com/random/?smartphone",
    imageAlt: "Smartphone",
    color: "Black",
    brand: "PhonePro",
    href: "#",
  },
  {
    id: 10,
    name: "Fitness Tracker",
    description:
      "Lightweight fitness tracker with heart rate monitoring and sleep tracking.",
    price: 49.99,
    category: "Wearables",
    imageSrc: "https://source.unsplash.com/random/?fitness_tracker",
    imageAlt: "Fitness Tracker",
    color: "Black",
    brand: "FitLife",
    href: "#",
  },
  {
    id: 11,
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with powerful sound and 10-hour battery life.",
    price: 59.99,
    category: "Electronics",
    imageSrc: "https://source.unsplash.com/random/?bluetooth_speaker",
    imageAlt: "Bluetooth Speaker",
    color: "Red",
    brand: "SoundWave",
    href: "#",
  },
  {
    id: 12,
    name: "4K UHD TV",
    description: "55-inch 4K UHD TV with HDR and smart features.",
    price: 399.99,
    category: "Home Entertainment",
    imageSrc: "https://source.unsplash.com/random/?4k_tv",
    imageAlt: "4K UHD TV",
    color: "Black",
    brand: "VisionPlus",
    href: "#",
  },
  {
    id: 13,
    name: "Electric Toothbrush",
    description:
      "Rechargeable electric toothbrush with multiple cleaning modes.",
    price: 39.99,
    category: "Personal Care",
    imageSrc: "https://source.unsplash.com/random/?electric_toothbrush",
    imageAlt: "Electric Toothbrush",
    color: "White",
    brand: "SmileCare",
    href: "#",
  },
  {
    id: 14,
    name: "Espresso Machine",
    description:
      "Compact espresso machine with milk frother and adjustable settings.",
    price: 149.99,
    category: "Kitchen Appliances",
    imageSrc: "https://source.unsplash.com/random/?espresso_machine",
    imageAlt: "Espresso Machine",
    color: "Silver",
    brand: "CaffePro",
    href: "#",
  },
  {
    id: 15,
    name: "Yoga Mat",
    description: "Non-slip yoga mat with extra cushioning and carrying strap.",
    price: 29.99,
    category: "Fitness",
    imageSrc: "https://source.unsplash.com/random/?yoga_mat",
    imageAlt: "Yoga Mat",
    color: "Purple",
    brand: "ZenFlex",
    href: "#",
  },
  {
    id: 16,
    name: "Drone",
    description:
      "Quadcopter drone with 1080p camera and GPS return home feature.",
    price: 299.99,
    category: "Electronics",
    imageSrc: "https://source.unsplash.com/random/?drone",
    imageAlt: "Drone",
    color: "White",
    brand: "SkyTech",
    href: "#",
  },
  {
    id: 17,
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with customizable keys.",
    price: 89.99,
    category: "Computers",
    imageSrc: "https://source.unsplash.com/random/?mechanical_keyboard",
    imageAlt: "Mechanical Keyboard",
    color: "Black",
    brand: "TypeMaster",
    href: "#",
  },
  {
    id: 18,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI settings.",
    price: 19.99,
    category: "Computers",
    imageSrc: "https://source.unsplash.com/random/?wireless_mouse",
    imageAlt: "Wireless Mouse",
    color: "Black",
    brand: "MouseTech",
    href: "#",
  },
  {
    id: 19,
    name: "Water Bottle",
    description: "Stainless steel water bottle with double-wall insulation.",
    price: 15.99,
    category: "Outdoor",
    imageSrc: "https://source.unsplash.com/random/?water_bottle",
    imageAlt: "Water Bottle",
    color: "Blue",
    brand: "HydroFlow",
    href: "#",
  },
  {
    id: 20,
    name: "Portable Charger",
    description: "10,000mAh portable charger with dual USB ports.",
    price: 29.99,
    category: "Electronics",
    imageSrc: "https://source.unsplash.com/random/?portable_charger",
    imageAlt: "Portable Charger",
    color: "Black",
    brand: "Lyne",
    href: "#",
  },
];
export default function ProductList() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
                            <div key={product.id} className="group relative">
                              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                  src={product.imageSrc}
                                  alt={product.imageAlt}
                                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                              </div>
                              <div className="mt-4 flex justify-between">
                                <div>
                                  <h3 className="text-sm text-gray-700">
                                    <a href={product.href}>
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0"
                                      />
                                      {product.name}
                                    </a>
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {product.color}
                                  </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                  {product.price}
                                </p>
                              </div>
                            </div>
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
