import React, { useState } from "react";
import Input from "../components/Input";
import api from "../services/api";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  phone_no: string;
  address: {
    street_name: string;
    house_no: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
  };
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    phone_no: "",
    address: {
      street_name: "",
      house_no: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const [errors, setErrors] = useState<any>({});
  const [apiError, setApiError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Key is: ${name}, Value is: ${value}`);
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm({
        ...form,
        address: { ...form.address, [key]: value },
      });
      setErrors({ ...errors, address: { ...errors.address, [key]: "" } });
    } else {
      setForm({ ...form, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: any = {};
    if (!form.name) newErrors.name = "Required";
    if (!form.email) newErrors.email = "Required";
    if (!form.password) newErrors.password = "Required";
    if (!form.phone_no) newErrors.phone_no = "Required";

    const addr = form.address;
    const addressErrors: any = {};
    if (!addr.street_name) addressErrors.street_name = "Required";
    if (!addr.house_no) addressErrors.house_no = "Required";
    if (!addr.pincode) addressErrors.pincode = "Required";
    if (!addr.city) addressErrors.city = "Required";
    if (!addr.state) addressErrors.state = "Required";
    if (!addr.country) addressErrors.country = "Required";

    if (Object.keys(addressErrors).length > 0)
      newErrors.address = addressErrors;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await api.post("/auth/register", form);
      alert("Registered successfully!");
      console.log("Success:", res.data);
      // Optionally redirect to login page here
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <h2 className="text-3xl font-bold mb-4 md:col-span-2 text-center">
          Register
        </h2>
        {apiError && (
          <p className="text-red-600 md:col-span-2 text-center">{apiError}</p>
        )}

        <Input
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          label="Phone Number"
          name="phone_no"
          value={form.phone_no}
          onChange={handleChange}
          error={errors.phone_no}
        />

        <Input
          label="Street Name"
          name="address.street_name"
          value={form.address.street_name}
          onChange={handleChange}
          error={errors?.address?.street_name}
        />
        <Input
          label="House Number"
          name="address.house_no"
          type="number"
          value={form.address.house_no}
          onChange={handleChange}
          error={errors?.address?.house_no}
        />
        <Input
          label="Pincode"
          name="address.pincode"
          type="number"
          value={form.address.pincode}
          onChange={handleChange}
          error={errors?.address?.pincode}
        />
        <Input
          label="City"
          name="address.city"
          value={form.address.city}
          onChange={handleChange}
          error={errors?.address?.city}
        />
        <Input
          label="State"
          name="address.state"
          value={form.address.state}
          onChange={handleChange}
          error={errors?.address?.state}
        />
        <Input
          label="Country"
          name="address.country"
          value={form.address.country}
          onChange={handleChange}
          error={errors?.address?.country}
        />

        <button
          type="submit"
          className="md:col-span-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
