'use client';

import { useState } from "react";
import Input from "@/components/auth/Input";
import Heading from "@/components/auth/Heading";
import AuthForm from "@/components/auth/AuthForm";
import Label from "@/components/auth/Label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { getUserRole } from "@/utils/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      const { token, role } = res.data;
      localStorage.setItem('role', role);

      setTimeout(() => {

        Cookies.set('token', token, { expires: 1 })
        const decoded: { role: string } = jwtDecode(token);

        console.log(getUserRole());

        if (decoded.role?.toLowerCase() === 'admin') {
          toast.success("Login Success!");
          router.push('/admin/dashboard');
          return;
        } else {
          toast.success("Login admin gagal!");
          router.push('/');
          return;
        }
      }, 5000);



    } catch (err) {
      toast.error('please check your password or email!')
      console.error("Login failed:", err);
    }
  };



  return (
    <AuthForm btnType="submit" btnText="Login" onsubmit={handleSubmit}>
      <Heading
        title="Login"
        description="Please enter your credentials to continue."
      />
      <div className="mb-4">
        <Label text="Email" htmlFor="email" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Label text="Password" htmlFor="password" />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </AuthForm>
  );
}
