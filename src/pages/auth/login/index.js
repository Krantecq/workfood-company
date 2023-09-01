import * as React from "react";
import { Avatar, CssBaseline, Box, Typography, Container } from "@mui/material";
import {
  FormProvider,
  RHFPasswordField,
  RHFTextField,
} from "../../../components/hook-form";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth, useToaster } from "../../../hooks";
import { toastMessages, toastTypes } from "../../../constants/keywords";
import PersonIcon from "@mui/icons-material/Person";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LogIn() {
  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { toaster } = useToaster();
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async ({ email, password }) => {
    try {
      const res = await login(email, password);
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        toaster(toastTypes.SUCCESS, toastMessages.LOGIN_SUCCESS);
        navigate(PATH_DASHBOARD.root);
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
      reset();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              name="email"
              label="Email Address"
              placeholder="Email Address"
              fullWidth
              margin="normal"
              autoComplete="email"
              autoFocus
              id="email"
            />
            <RHFPasswordField
              name="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              required
              fullWidth
              id="password"
              autoComplete="current-password"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
            >
              Login
            </LoadingButton>
          </FormProvider>
        </Box>
      </Box>
    </Container>
  );
}
