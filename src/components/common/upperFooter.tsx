import { Headset, RotateCcw, Shield, Truck } from "lucide-react";

const benefits = [
  {
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    Icon: Truck,
  },
  {
    title: "Easy Returns",
    description: "14-day return policy",
    Icon: RotateCcw,
  },
  {
    title: "Secure Payment",
    description: "100% secure checkout",
    Icon: Shield,
  },
  {
    title: "24/7 Support",
    description: "Contact us anytime",
    Icon: Headset,
  },
];

export default function UpperFooter() {
  return (
    <section aria-label="Shopping benefits" className="bg-green-50">
      <div className="mx-auto grid w-full max-w-[1568px] grid-cols-1 gap-6 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {benefits.map(({ title, description, Icon }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <Icon aria-hidden="true" size={20} strokeWidth={2.5} />
            </span>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
              <p className="text-xs font-semibold text-slate-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
