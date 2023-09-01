export const toastTypes = {
  SUCCESS: "success",
  ERROR: "error",
  warning: "warning",
  INFO: "info",
};

const baseMessage = "item action successfully";

const getMessage = (item, action) =>
  baseMessage.replace("item", item).replace("action", action);

export const toastMessages = {
  // AUTH
  LOGIN_SUCCESS: getMessage("Logged", "in"),
  LOGOUT_SUCCESS: getMessage("Logged", "out"),
  RESET_PASSWORD_SUCCESS:
    "Reset password link has been sent on this email address. Please check your inbox",

  CREATE_COMMODITY_SUCCESS: getMessage("Commodity", "created"),
  UPDATE_COMMODITY_SUCCESS: getMessage("Commodity", "updated"),
  DELETED_COMMODITY_SUCCESS: getMessage("Commodity", "deleted"),

  CREATE_COMPANY_SUCCESS: getMessage("Company", "created"),
  UPDATE_COMPANY_SUCCESS: getMessage("Company", "updated"),
  DELETED_COMPANY_SUCCESS: getMessage("Company", "deleted"),

  CREATE_BLOG_SUCCESS: getMessage("Blog", "created"),
  UPDATE_BLOG_SUCCESS: getMessage("Blog", "updated"),
  DELETED_BLOG_SUCCESS: getMessage("Blog(s)", "deleted"),

  UPDATE_STATUS_LISTING_SUCCESS: getMessage("Listing status", "updated"),
  DELETE_LISTING_SUCCESS: getMessage("Listing", "deleted"),

  DELETED_USER_SUCCESS: getMessage("User(s)", "deleted"),

  CREATE_PRODUCT_CATEGORY_SUCCESS: getMessage("Product category", "created"),
  UPDATE_PRODUCT_CATEGORY_SUCCESS: getMessage("Product category", "updated"),
  DELETE_PRODUCT_CATEGORY_SUCCESS: getMessage("Product category", "deleted"),

  CREATE_PRODUCT_SUCCESS: getMessage("Product", "created"),
  UPDATE_PRODUCT_SUCCESS: getMessage("Product", "updated"),
  DELETED_PRODUCT_SUCCESS: getMessage("Product", "deleted"),

  BANNER_UPLOADED_SUCCESS: getMessage("Banner", "uploaded"),
  BANNER_DELETED_SUCCESS: getMessage("Banner", "deleted"),

  COMMENT_DELETED_SUCCESS: getMessage("Comment", "deleted"),

  CREATE_CATEGORY_SUCCESS: getMessage("Category", "created"),
  DELETE_CATEGORY_SUCCESS: getMessage("Category", "deleted"),

  CREATE_LOCATION_MEALTIME_SUCCESS: getMessage(
    "Location & mealtype",
    "created"
  ),
  UPDATE_LOCATION_MEALTIME_SUCCESS: getMessage(
    "Location & mealtype",
    "updated"
  ),
  DELETE_LOCATION_MEALTIME_SUCCESS: getMessage(
    "Location & mealtype",
    "deleted"
  ),
  BALANCE_UPDATE_SUCCESS: getMessage("Balance", "updated"),
  MEAL_ADDED_SUCCESS: getMessage("Meal", "added"),
  MEAL_UPDATE_SUCCESS: getMessage("Meal", "updated"),
  MEAL_DELETE_SUCCESS: getMessage("Meal", "deleted"),

  HEADER_ADDED_SUCCESS: getMessage("Header", "added"),
  HEADER_UPDATE_SUCCESS: getMessage("Header", "updated"),
  HEADER_DELETE_SUCCESS: getMessage("Header", "deleted"),

  PRODUCT_IMAGE_LENGTH_ERROR: "Product images must be 3",
  GENERAL_ERROR: "Oops! something went wrong",
};

const confirmationBaseMessage = "Are you sure want to action this target?";

const getConfirmationMessage = (action, target, isMany = false) =>
  confirmationBaseMessage
    .replace("action", action)
    .replace("target", isMany ? `${target}s` : target)
    .replace("this", isMany ? "these" : "this");

export const confirmationMessages = {
  PRODUCT: getConfirmationMessage("delete", "product"),
  BANNER: getConfirmationMessage("delete", "banner image"),
  COMPANY: getConfirmationMessage("delete", "company"),
  LOCATION: getConfirmationMessage("delete", "company location"),
};

export const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
