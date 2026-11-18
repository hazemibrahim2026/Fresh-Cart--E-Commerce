import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import logo from "@/assets/imgi_1_freshcart-logo.49f1b44d.svg";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: FaFacebookF },
  { label: "Twitter", href: "https://x.com/", Icon: FaTwitter },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/", Icon: FaYoutube },
];

export default function Footer() {
  const linkGroups = [
    {
      title: "Shop",
      links: [
        { label: "All Products", href: "/products" },
        { label: "Categories", href: "/categories" },
        { label: "Brands", href: "/brands" },
        { label: "Electronics", href: "/categories/6439d2d167d9aa4ca970649f" },
        { label: "Men's Fashion", href: "/categories/6439d5b90049ad0b52b90048" },
        { label: "Women's Fashion", href: "/categories/6439d58a0049ad0b52b9003f" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "My Account", href: "/profile/me" },
        { label: "Order History", href: "/allorders" },
        { label: "Wishlist", href: "/wishlist" },
        { label: "Shopping Cart", href: "/cart" },
        { label: "Sign In", href: "/login" },
        { label: "Create Account", href: "/register" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "mailto:support@freshcart.com" },
        { label: "Help Center", href: "mailto:support@freshcart.com" },
        { label: "Shipping Info", href: "/terms" },
        { label: "Returns & Refunds", href: "/terms" },
        { label: "Track Order", href: "/allorders" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/privacy#cookies" },
      ],
    },
  ];

  return (
    <footer className="bg-[#101828] text-slate-400">
      <div className="mx-auto grid w-full max-w-[1568px] gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(4,minmax(0,1fr))] lg:gap-12 lg:py-12">
        <div>
          <Link
            href="/"
            aria-label="FreshCart home"
            className="inline-flex rounded-lg bg-white px-4 py-2"
          >
            <Image src={logo} alt="FreshCart" className="h-8.5 w-auto" />
          </Link>
          <p className="mt-7 max-w-md text-sm leading-6">
            FreshCart is your one-stop destination for quality products. From
            fashion to electronics, we bring you the best brands at competitive
            prices with a seamless shopping experience.
          </p>
          <address className="mt-6 space-y-3 text-sm not-italic">
            <a
              href="tel:+18001234567"
              className="flex items-center gap-3 transition-colors hover:text-white"
            >
              <Phone aria-hidden="true" className="size-4 shrink-0 text-green-500" />
              +1 (800) 123-4567
            </a>
            <a
              href="mailto:support@freshcart.com"
              className="flex items-center gap-3 transition-colors hover:text-white"
            >
              <Mail aria-hidden="true" className="size-4 shrink-0 text-green-500" />
              support@freshcart.com
            </a>
            <p className="flex items-center gap-3">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-green-500" />
              123 Commerce Street, New York, NY 10001
            </p>
          </address>
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-green-600 hover:text-white focus-visible:text-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                <Icon aria-hidden="true" size={16} />
              </Link>
            ))}
          </div>
        </div>

        {linkGroups.map(({ title, links }) => (
          <nav key={title} aria-label={`${title} links`}>
            <h2 className="mb-6 text-base font-semibold text-slate-100">{title}</h2>
            <ul className="space-y-4 text-sm">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-[1568px] flex-col gap-4 px-6 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-5" aria-label="Accepted payment methods">
            {["Visa", "Mastercard", "PayPal"].map((method) => (
              <span key={method} className="flex items-center gap-2">
                <CreditCard aria-hidden="true" className="size-4" />
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
