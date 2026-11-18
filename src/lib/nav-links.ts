import type { CategoryI } from "@/types/category.type";

export interface navLinks {
  label: string;
  href: string;
  children?: navLinks[];
}

export function createNavLinks(categories: CategoryI[]): navLinks[] {
  return [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    {
      label: "Categories",
      href: "/categories",
      children: [
        { label: "All Categories", href: "/categories" },
        ...categories.map((category) => ({
          label: category.name,
          href: `/categories/${category._id}`,
        })),
      ],
    },
    { label: "Brands", href: "/brands" },
  ];
}