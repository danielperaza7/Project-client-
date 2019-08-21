export const ORDER_STATUS_RULE_MAPPING = [
  {
    id: "closed",
    name: "Closed Order",
    dialog_name: "Closed Order",
    description:
      "All items returned after the return window are not eligible for a refund under our <Strong>30 DAYS</Strong> <a href='/page/return'>return policy.</a>",
  },
  {
    id: "store",
    name: "Store Purchase",
    dialog_name: "Store Purchase",
    description:
      "This is a store purchase and the order is not eligible for a refund or exchange online under our <a href='/page/return'>return policy.</a>",
  },
  {
    id: "processed",
    name: "Processed",
    dialog_name: "Processed Order",
    description:
      "Items are currently being picked & packaged and will be making its way to you shortly.",
  },
  {
    id: "shipped",
    name: "Shipped",
    dialog_name: "Shipped Order",
    description: "Items have been shipped.",
  },
  {
    id: "cancelled",
    name: "Cancelled",
  },
  {
    id: "on_hold",
    name: "On Hold",
    dialog_name: "On Hold Order",
    description:
      "Items are placed on hold for <Strong>15 days</Strong> from the date exchange is requested until the date return is received.",
  },
];
