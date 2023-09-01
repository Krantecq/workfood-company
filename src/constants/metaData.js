import {
  BorderColor,
  Dns,
  Folder,
  ModeOfTravel,
  ReceiptLong,
  RequestQuote,
} from "@mui/icons-material";

export const productTableHeaders = [
  {
    id: "products",
    numeric: false,
    disablePadding: true,
    label: "Product",
  },
  {
    id: "last_modified",
    numeric: true,
    disablePadding: false,
    label: "Last Modified",
  },
  {
    id: "product_id",
    numeric: true,
    disablePadding: false,
    label: "Product Id",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "categories",
    numeric: true,
    disablePadding: false,
    label: "Categories",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "action",
  },
];

export const companiesTableHeaders = [
  {
    id: "CompanyName",
    numeric: false,
    disablePadding: false,
    label: "Company Name",
  },
  {
    id: "DomainName",
    numeric: false,
    disablePadding: false,
    label: "Domain Name",
  },
  {
    id: "CompanyAddress",
    numeric: false,
    disablePadding: false,
    label: "Company Address",
  },
  {
    id: "Email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "ContactPerson",
    numeric: false,
    disablePadding: false,
    label: "Contact Person",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];
export const companiesUsersTableHeaders = [
  {
    id: "index",
    numeric: false,
    disablePadding: false,
    label: "Sr. No.",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "User Name",
  },
  {
    id: "designation",
    numeric: false,
    disablePadding: false,
    label: "User Designation",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "Email",
    numeric: false,
    disablePadding: false,
    label: "Email Address",
  },
  {
    id: "balance",
    numeric: false,
    disablePadding: false,
    label: "Wallet Balance",
  },
  {
    id: "orderStatus",
    numeric: false,
    disablePadding: false,
    label: "Last Order Status",
  },
];

export const companiesOrdersTableHeaders = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Order Number",
  },
  {
    id: "companyname",
    numeric: false,
    disablePadding: false,
    label: "Company Name",
  },
  {
    id: "orderDate",
    numeric: false,
    disablePadding: false,
    label: "Time",
  },
  {
    id: "customerName",
    numeric: false,
    disablePadding: false,
    label: "Customer Name",
  },
  {
    id: "method",
    numeric: false,
    disablePadding: false,
    label: "Payment method",
  },
  {
    id: "orderTiming",
    numeric: false,
    disablePadding: false,
    label: "Order Timing",
  },
  {
    id: "totalQuantity",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];
export const companiesWalletTableHeaders = [
  {
    id: "index",
    numeric: false,
    disablePadding: false,
    label: "Sr. No.",
  },
  {
    id: "customerName",
    numeric: false,
    disablePadding: false,
    label: "Customer Name",
  },
  {
    id: "designation",
    numeric: false,
    disablePadding: false,
    label: "Customer Designation",
  },
  {
    id: "balance",
    numeric: false,
    disablePadding: false,
    label: "Wallet Balance",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Add Balance",
  },
];
export const companiesRatingsTableHeaders = [
  {
    id: "index",
    numeric: false,
    disablePadding: false,
    label: "Meal Name",
  },
  {
    id: "customerName",
    numeric: false,
    disablePadding: false,
    label: "Likes",
  },
  {
    id: "designation",
    numeric: false,
    disablePadding: false,
    label: "Dislikes",
  },
  {
    id: "balance",
    numeric: false,
    disablePadding: false,
    label: "Like to Dislikes Percent",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

export const companiesLocationTableHeaders = [
  {
    id: "index",
    numeric: false,
    disablePadding: false,
    label: "Sr. No.",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Location",
  },
  {
    id: "mealtime",
    numeric: false,
    disablePadding: false,
    label: "Meal Types",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

export const mealTableHeaders = [
  {
    id: "day",
    numeric: false,
    disablePadding: false,
    label: "Day",
  },
  {
    id: "breakfast",
    numeric: false,
    disablePadding: false,
    label: "Breakfast",
  },
  {
    id: "lunch",
    numeric: false,
    disablePadding: false,
    label: "Lunch",
  },
  {
    id: "dinner",
    numeric: false,
    disablePadding: false,
    label: "Dinner",
  },
  {
    id: "liveCounter",
    numeric: false,
    disablePadding: false,
    label: "Live Counter",
  },
  // {
  //   id: "addOns",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Addons",
  // },
];

export const foodItemsTableHeaders = [
  {
    id: "itemName",
    numeric: false,
    disablePadding: false,
    label: "Item Name",
  },
  {
    id: "itemPrice",
    numeric: false,
    disablePadding: false,
    label: "Item Price",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "like",
    numeric: false,
    disablePadding: false,
    label: "Like",
  },
  {
    id: "dislike",
    numeric: false,
    disablePadding: false,
    label: "Dislike",
  },
  {
    id: "nutrients",
    numeric: false,
    disablePadding: false,
    label: "Nutrients",
  },
];

export const headerImageTableHeaders = [
  {
    id: "index",
    numeric: false,
    disablePadding: false,
    label: "Sr. No",
  },
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "Image",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

export const blogTableHeaders = [
  {
    id: "products",
    numeric: false,
    disablePadding: true,
    label: "Blog Title",
  },
  {
    id: "last_modified",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },

  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Edit",
  },
];

export const userTableHeaders = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  // {
  //   id: "joined",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Joined",
  // },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
];

export const listTableHeaders = [
  {
    id: "orderNo",
    numeric: false,
    disablePadding: false,
    label: "Order No.",
  },
  {
    id: "companyname",
    numeric: false,
    disablePadding: false,
    label: "Company Name",
  },
  {
    id: "day",
    numeric: false,
    disablePadding: false,
    label: "Day",
  },

  {
    id: "customerName",
    numeric: false,
    disablePadding: true,
    label: "Customer Name",
  },
  {
    id: "orderTiming",
    numeric: false,
    disablePadding: false,
    label: "Order Timing",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Order Status",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
  // {
  //   id: "status",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Status",
  // },
];

export const userNavItems = [
  { label: "Orders", path: "/dashboard/users/id", icon: <BorderColor /> },
  { label: "Listing", path: "/dashboard/users/id/listings", icon: <Dns /> },
  {
    label: "Challan",
    path: "/dashboard/users/id/challans",
    icon: <ReceiptLong />,
  },
  {
    label: "Storage Request",
    path: "/dashboard/users/id/storageRequest",
    icon: <Folder />,
  },
  {
    label: "Transport Request",
    path: "/dashboard/users/id/transportRequest",
    icon: <ModeOfTravel />,
  },
  {
    label: "Orchard Request",
    path: "/dashboard/users/id/orchardRequest",
    icon: <RequestQuote />,
  },
];

export const userListingHeadingItems = [
  {
    id: "phoneno",
    numeric: false,
    disablePadding: true,
    label: "User",
  },
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "Product Name",
  },
  {
    id: "product_id",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Variety",
  },
  {
    id: "min",
    numeric: false,
    disablePadding: false,
    label: "Price Range",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

export const usersOrdersHeadingItems = [
  {
    id: "phoneno",
    numeric: false,
    disablePadding: true,
    label: "User",
  },
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "Product Name",
  },
  {
    id: "product_id",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "paymentId",
    numeric: false,
    disablePadding: false,
    label: "Order ID",
  },
  {
    id: "orderTotal",
    numeric: false,
    disablePadding: false,
    label: "Order Amount",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "",
    numeric: true,
    disablePadding: false,
    label: "Edit Order",
  },
];

export const usersChallenHeadingItems = [
  {
    id: "currentChallan",
    numeric: false,
    disablePadding: false,
    label: "Challan No.",
  },
  {
    id: "product_id",
    numeric: false,
    disablePadding: false,
    label: "Date Created",
  },
  {
    id: "paymentId",
    numeric: false,
    disablePadding: false,
    label: "Billed By",
  },
  {
    id: "orderTotal",
    numeric: false,
    disablePadding: false,
    label: "Billed To",
  },
  {
    id: "more",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];
export const usersOrchardRequestHeadingItems = [
  {
    id: "phoneno",
    numeric: false,
    disablePadding: true,
    label: "Request DATE",
  },
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "location",
  },
  {
    id: "product_id",
    numeric: false,
    disablePadding: false,
    label: "Complete Address",
  },
  {
    id: "paymentId",
    numeric: false,
    disablePadding: false,
    label: "Size (IN Canel)",
  },
  {
    id: "orderTotal",
    numeric: false,
    disablePadding: false,
    label: "Remarks",
  },
];

export const usersTransportRequestHeadingItems = [
  {
    id: "phoneno",
    numeric: false,
    disablePadding: true,
    label: "Request DATE",
  },
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "From",
  },
  {
    id: "product_id",
    numeric: false,
    disablePadding: false,
    label: "To",
  },
  {
    id: "paymentId",
    numeric: false,
    disablePadding: false,
    label: "Quantity of Boxes",
  },
  {
    id: "orderTotal",
    numeric: false,
    disablePadding: false,
    label: "Remarks",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Insurance Opted",
  },
];

export const usersStorageRequestHeadingItems = [
  {
    id: "phoneno",
    numeric: false,
    disablePadding: true,
    label: "Request DATE",
  },
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "From DATE",
  },
  {
    id: "product_id",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "paymentId",
    numeric: false,
    disablePadding: false,
    label: "To DATE",
  },
  {
    id: "orderTotal",
    numeric: false,
    disablePadding: false,
    label: "Quantity of Boxes",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Remarks",
  },
  {
    id: "",
    numeric: true,
    disablePadding: false,
    label: "View",
  },
];

export const productCategoriesHeadings = [
  {
    id: "categoryName",
    numeric: false,
    disablePadding: false,
    label: "Product Name",
  },
  {
    id: "subCategories",
    numeric: false,
    disablePadding: false,
    label: "VARIETY",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

export const bannerHeadings = [
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "Image",
  },
  {
    id: "uploadedAt",
    numeric: false,
    disablePadding: false,
    label: "Uploaded At",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

export const categoriesHeadings = [
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "Image",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

export const BLOG_CATEGORIES = [
  "Food blogs",
  "Travel blogs",
  "Health and fitness blogs",
  "Lifestyle blogs",
  "Fashion and beauty blogs",
  "Photography blogs",
  "Personal blogs",
  "DIY craft blogs",
];

export const MEAL_TIME = [
  { label: "Breakfast", value: "Breakfast" },
  { label: "Lunch", value: "Lunch" },
  { label: "Dinner", value: "Dinner" },
  { label: "Live Counter", value: "Live Counter" },
];

export const MEAL_DATA = [
  {
    day: 0,
    breakfast: "",
    lunch: "",
    dinner: "",
    liveCounter: "",
  },
  {
    day: 1,
    breakfast: "",
    lunch: "",
    dinner: "",
    liveCounter: "",
  },
  {
    day: 2,
    breakfast: "",
    lunch: "",
    dinner: "",
    liveCounter: "",
  },
  {
    day: 3,
    breakfast: "",
    lunch: "",
    dinner: "",
    liveCounter: "",
  },
  {
    day: 4,
    breakfast: "",
    lunch: "",
    dinner: "",
    liveCounter: "",
  },
  {
    day: 5,
    breakfast: "",
    lunch: "",
    dinner: "",
    liveCounter: "",
  },
  {
    day: 6,
    breakfast: "",
    lunch: "",
    dinner: "",
    liveCounter: "",
  },
];
