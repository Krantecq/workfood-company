import * as React from "react";
import {
  Avatar,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  Link,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../../routes/paths";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useToaster } from "../../../hooks";
import { toastMessages, toastTypes } from "../../../constants/keywords";
import { resetPassword } from "../../../firebase/services/auth";

const formSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

export default function ForgotPassword() {
  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const { toaster } = useToaster();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async ({ email }) => {
    try {
      const res = await resetPassword(email);
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        toaster(
          toastTypes.SUCCESS,
          toastMessages.RESET_PASSWORD_SUCCESS.replace("this", res.data)
        );
        navigate(PATH_AUTH.login);
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
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
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
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

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
            >
              Forgot
            </LoadingButton>
          </FormProvider>

          <Grid container>
            <Grid item xs>
              <Link component={NavLink} to={PATH_AUTH.login} variant="body2">
                Back to Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
