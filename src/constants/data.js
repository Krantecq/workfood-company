import images from "./images";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
const data = {
  user: {
    name: "User",
    img: images.avt,
  },
  summary: [
    {
      title: "Product",
      subtitle: "Total sales today",
      value: "$1.000",
      percent: 70,
    },
    {
      title: "Orders",
      subtitle: "Total orders today",
      value: "3000",
      percent: 49,
    },
    {
      title: "Revenue",
      subtitle: "Total revenue today",
      value: "$678",
      percent: 38,
    },
    {
      title: "Visits",
      subtitle: "Total visits today",
      value: "2345",
      percent: 55,
    },
  ],
  revenueSummary: {
    title: "Revenue",
    value: "$678",
    chartData: {
      labels: ["May", "Jun", "July", "Aug", "May", "Jun", "July", "Aug"],
      data: [300, 300, 280, 380, 200, 300, 280, 350],
    },
  },
  overall: [
    {
      value: "300K",
      title: "Orders",
      key: "orders",
      icon: <PlaylistAddCheckCircleRoundedIcon />,
    },
    {
      value: "9.876K",
      title: "Users",
      key: "users",
      icon: <AccountCircleRoundedIcon />,
    },
    {
      value: "1.234K",
      title: "Menu Items",
      key: "foodItems",
      icon: <CategoryRoundedIcon />,
    },
    {
      value: "$5678",
      title: "Today’s Order Value",
      key: "ordersValue",
      icon: <ApartmentRoundedIcon />,
    },
    {
      value: "$5678",
      title: "Today’s Delivered Order",
      key: "deliveredOrders",
      icon: <ApartmentRoundedIcon />,
    },
    {
      value: "$5678",
      title: "Today’s Undelivered Order",
      key: "undeliveredOrders",
      icon: <ApartmentRoundedIcon />,
    },
    {
      value: "$5678",
      title: "Cumulative Wallet Bal.",
      key: "walletBalance",
      icon: <ApartmentRoundedIcon />,
    },
  ],
  companyCard: [
    {
      title: "Orders",
      key: "orders",
      icon: <PlaylistAddCheckCircleRoundedIcon />,
      path: "orders",
    },
    {
      title: "Users",
      key: "users",
      icon: <AccountCircleRoundedIcon />,
      path: "users",
    },
    {
      title: "Ratings",
      key: "ratings",
      icon: <CategoryRoundedIcon />,
      path: "ratings",
    },
    {
      title: "Wallet Balance",
      key: "walletBalance",
      icon: <ApartmentRoundedIcon />,
      path: "walletBalance",
    },
  ],
  revenueByChannel: [
    {
      title: "Direct",
      value: 70,
    },
    {
      title: "External search",
      value: 40,
    },
    {
      title: "Referal",
      value: 60,
    },
    {
      title: "Social",
      value: 30,
    },
  ],
  revenueByMonths: {
    labels: [
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
    ],
    data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350],
  },
};

export default data;
