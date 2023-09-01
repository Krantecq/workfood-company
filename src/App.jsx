import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Router from "./routes";
import { NotistackProvider } from "./components";
import UserSelectedProvider from "./contexts/UserSelectedContext";

function App() {
  return (
    <BrowserRouter>
      <NotistackProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <UserSelectedProvider>
            <Router />
          </UserSelectedProvider>
        </LocalizationProvider>
      </NotistackProvider>
    </BrowserRouter>
  );
}

export default App;
