import { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as API from "@/constants/api";
import axios from "axios";
import { Spinner } from "@/widgets/spinner";

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const newData = {
        fullname: data.fullName,
        email: data.email,
        organization: {
          inn: data.innOfOrganization,
          name: data.organizationName,
        },
        phone: data.contact_number,
        username: data.username,
      };
      const response = await axios.post(API.CREATE_CLIENT_USER, newData);
      if (response.data) {
        toast.success(
          "You submitted your data. The organization will check it and contact you. Thank you!",
          {
            theme: "colored",
          },
        );
        reset();
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      }
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
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Присоединяйтесь к нам сегодня
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Внимательно заполните форму для регистрации
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              ФИО
            </Typography>
            <Input
              size="lg"
              placeholder="Иванова София Ивановна"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("fullName", {
                required: true,
                pattern: /^[а-яА-ЯёЁa-zA-Z\s]+$/,
              })}
            />
            {errors.fullName && (
              <Typography variant="small" color="red" className="mt-1">
                Please enter a valid full name
              </Typography>
            )}
          </div>
          <div className="my-4 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Электронная почта
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {errors.email && (
              <Typography variant="small" color="red" className="mt-1">
                Please enter a valid email address
              </Typography>
            )}
          </div>
          <div className="my-4 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="Username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("username", {
                required: true,
              })}
            />
            {errors.username && (
              <Typography variant="small" color="red" className="mt-1">
                Please enter username
              </Typography>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Название Организации
            </Typography>
            <Input
              size="lg"
              placeholder="Digital Camp"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("organizationName", {
                required: true,
                pattern: /^[а-яА-ЯёЁa-zA-Z\s]+$/,
              })}
            />
            {errors.organizationName && (
              <Typography variant="small" color="red" className="mt-1">
                Please enter a valid organization name
              </Typography>
            )}
          </div>
          <div className="flex flex-col gap-6 my-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              ИНН организации
            </Typography>
            <Input
              size="lg"
              placeholder="7727563778"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              type="number"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("innOfOrganization", {
                required: true,
                pattern: /^\d{10}$/,
              })}
            />
            {errors.innOfOrganization && (
              <Typography variant="small" color="red" className="mt-1">
                Please enter a valid INN of Organization
              </Typography>
            )}
          </div>
          <div className="flex flex-col gap-6 my-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Контакатный номер
            </Typography>
            <Input
              size="lg"
              placeholder="+998911111111"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("contact_number", {
                required: true,
                pattern: /^\+998\d{9}$/,
              })}
            />
            {errors.contact_number && (
              <Typography variant="small" color="red" className="mt-1">
                Please enter a valid contact number
              </Typography>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center mt-6">
              <Spinner />
            </div>
          ) : (
            <Button className="mt-6" fullWidth type="submit">
              Register Now
            </Button>
          )}

          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
