import { useEffect, useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import * as API from "@/constants/api";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { toast } from "react-toastify";
import { Spinner } from "@/widgets/spinner";
import useStore from "@/context/store";
import store from "@/context/store";

export function SignIn() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm();
  const navigate = useNavigate();
  const signInHook = useSignIn();
  const loginSuccess = useStore((state) => state.loginSuccess);
  useEffect(() => {
    setValue("username", watch("username"));
    setValue("password", watch("password"));
  }, [setValue, watch]);

  const onSubmit = async ({ username, password }) => {
    setLoading(true);
    try {
      const response = await axios.post(API.USER_LOGIN, {
        username,
        password,
      });
      signInHook({
        auth: {
          token: response.data.access_token,
          type: "Bearer",
        },
        userState: {
          username,
        },
      });
      loginSuccess({ isSuper: response.data.is_super });
      navigate("/dashboard");
      toast.success("Successfully signed in");
    } catch (error) {
      if (!error.response) {
        toast.error("The server is not responding. Please try again later.", {
          theme: "colored",
        });
        reset();
      } else {
        toast.error(
          error.response.data.error || "An error occurred. Please try again.",
          {
            theme: "colored",
          },
        );
        reset();
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="flex gap-4 justify-center items-center h-screen">
      <div className="w-full lg:w-1/3 py-12 bg-white border-2 shadow-xl">
        <div className="text-center">
          <Typography variant="h4" className="font-bold mb-4">
            Вход в Inha-Engineering
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-xs font-normal"
          >
            Введите свою почту и пароль для входа.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Имя Пользователя
            </Typography>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  {...register("username", { required: true })}
                  size="lg"
                  placeholder="username"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              )}
            />
            {errors?.username && (
              <Typography variant="small" color="red">
                Please enter username
              </Typography>
            )}

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Пароль
            </Typography>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters",
                    },
                  })}
                  type="password"
                  size="lg"
                  placeholder="********"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              )}
            />
            {errors?.password && (
              <Typography variant="small" color="red">
                {errors.password.message}
              </Typography>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center mt-6">
              <Spinner />
            </div>
          ) : (
            <Button className="mt-6" type="submit" fullWidth>
              Sign In
            </Button>
          )}

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">Forgot Password</a>
            </Typography>
          </div>

          <Typography
            variant="paragraph"
            className="text-center text-[10px] text-blue-gray-500 font-medium mt-4"
          >
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">
              Регистрация
            </Link>
          </Typography>
          {errors && (
            <Typography variant="small" color="red" className="mt-2">
              {errors.message}
            </Typography>
          )}
        </form>
      </div>
    </section>
  );
}

export default SignIn;
