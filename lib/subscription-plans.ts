export const subscriptionPlans = [
  { id: "yearly", label: "سالانه", price: 899000, duration: "در سال" },
  { id: "quarterly", label: "۳ ماهه", price: 249000, duration: "هر سه ماه", recommended: true },
  { id: "monthly", label: "ماهانه", price: 89000, duration: "در ماه" },
] as const;
export type SubscriptionPlanId = typeof subscriptionPlans[number]["id"];
