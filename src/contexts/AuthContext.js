import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";

import { getDocument } from "../firebase/services/getServices";
import { collections } from "../firebase/collections";
import { firebaseQueryOperators } from "../firebase/queryBuilder";

const initialState = {
  user: null,
  isLoading: true,
};

const reducer = (state, { payload, type }) => {
  if (type === "INIT") {
    const { user } = payload;
    return {
      ...state,
      user,
    };
  } else if (type === "LOGIN") {
    const { user } = payload;
    return {
      ...state,
      user,
    };
  } else if (type === "LOGOUT") {
    return {
      ...state,
      user: null,
    };
  } else if (type === "LOAD") {
    const { isLoading } = payload;
    return {
      ...state,
      isLoading,
    };
  }
  return state;
};

const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const localAuth = localStorage.getItem("AUTH");
    if (localAuth) {
      const selected = JSON.parse(localStorage.getItem("AUTH"));
      if (selected) {
        dispatch({
          type: "INIT",
          payload: {
            user: selected,
          },
        });
        dispatch({
          type: "LOAD",
          payload: {
            isLoading: false,
          },
        });
      } else {
        dispatch({
          type: "INIT",
          payload: {
            user: null,
          },
        });
        dispatch({
          type: "LOAD",
          payload: {
            isLoading: false,
          },
        });
      }
    } else {
      dispatch({
        type: "INIT",
        payload: {
          user: null,
        },
      });
      dispatch({
        type: "LOAD",
        payload: {
          isLoading: false,
        },
      });
    }
  }, []);

  const login = (email, password) =>
    new Promise(async (resolve) => {
      try {
        const domain = email.split("@")[1];
        const res = await getDocument(collections.companies, [
          {
            property: "DomainName",
            operator: firebaseQueryOperators.EQUAL_TO,
            value: domain,
          },
        ]);
        if (res.status) {
          if (
            email === res.data?.at(0)?.Email &&
            password === res.data?.at(0)?.password
          ) {
            dispatch({
              type: "LOGIN",
              payload: {
                user: res.data?.at(0),
              },
            });
            localStorage.setItem("AUTH", JSON.stringify(res.data?.at(0)));
            resolve({ status: true, data: res.data?.at(0) });
          } else {
            resolve({
              status: false,
              error: {
                message:
                  "Credentials are wrong. Please enter correct credentials!",
              },
            });
          }
        } else {
          dispatch({
            type: "LOGIN",
            payload: {
              user: null,
            },
          });
          resolve({
            status: false,
            error: {
              message: "Account doesn't exist! Contact Admin",
            },
          });
        }
      } catch (error) {
        dispatch({
          type: "LOGIN",
          payload: {
            user: null,
          },
        });
        resolve({
          status: false,
          error: {
            message: "Something went wrong",
          },
        });
      }
    });

  const logout = () =>
    new Promise((resolve) => {
      dispatch({
        type: "LOGOUT",
      });
      localStorage.clear();
      resolve({ status: true });
    });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
