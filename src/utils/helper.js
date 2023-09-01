import { format } from "date-fns";

export const formateFireStoreDate = (
  originalDate,
  dateFormat = "dd/MM/yyyy"
) => {
  if (!originalDate) return "";
  return format(originalDate.toDate(), dateFormat);
};

export const isValidFileType = (fileName, fileType) => {
  const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
  };
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
};

export const getUniqueId = () =>
  Math.random().toString(36).substring(2) + new Date().getTime().toString(36);

export const getAddress = ({ street, city, pincode }) =>
  `${street}, ${city}, ${pincode}`;

export const getFirstElements = (arr, n) =>
  arr && arr.length > 0 ? arr.slice(0, n) : [];

export const sortRecentOrders = (arr) =>
  arr.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

export const getDayFromDate = () => {
  const day = new Date().getDay();
  if (day === 0) {
    return 6;
  } else return day - 1;
};

export const getUniqueName = (company) => {
  if (company.split(" ")?.length > 0) {
    return company.split(" ").at(0);
  }
  return company;
};
