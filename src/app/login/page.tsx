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
import Loading from "@/components/main/Loading";

export default function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const router = useRouter();
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setLoading(true); // start loading

    const res = await axios.post("https://pokjappsdmlh-be.vercel.app/api/auth/login", {
      email,
      password,
    });

    const { token, role } = res.data;
    localStorage.setItem("role", role);

    Cookies.set("token", token, { expires: 1 });
    const decoded: { role: string } = jwtDecode(token);

    if (decoded.role?.toLowerCase() === "admin") {
      toast.success("Login Succes!", {
        description: "Welcome to Dashboard Platform POKJABANGKOM",
      });
      router.push("/admin/dashboard");
    } else {
      toast.success("Login Succes!", {
        description: "Welcome to Platform Internal POKJABANGKOM",
      });
      router.push("/");
    }
  } catch (err) {
    toast.error("Login Failed!", {
      description: "Please check your password and email.",
    });
    console.error("Login failed:", err);
  } finally {
    setLoading(false); // stop loading apapun hasilnya
  }
};
  return (
    <>
{loading? <Loading/> : <>

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
    </>}
   </>
  );
}
