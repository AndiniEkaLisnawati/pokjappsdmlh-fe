"use client";

import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import Label from "@/components/auth/Label";
import Input from "@/components/auth/Input";
import Heading from "@/components/auth/Heading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://pokjappsdmlh-be.vercel.app/api/users", {
        fullname,
        email,
        password,
      });

      toast("Register successfully!", {
        description: "Akun berhasil dibuat",
      });

      const { fullname: name, role } = res.data;
      localStorage.setItem("role", role);
      localStorage.setItem("fullname", name);

      router.push("/");
    } catch (err) {
      console.error({ message: "Gagal Register!", err });
      toast("Register Failed!", {
        description: "Please check your input fields",
      });
    }
  };

  return (
    <>
      <AuthForm btnType="submit" btnText="Register" onsubmit={handleSubmit}>
        <Heading
          title="Register Page"
          description="Please create your acc first"
        />

        <div className="mb-6">
          <Label text="Fullname" />
          <Input
            type="text"
            placeholder="John doe"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <Label text="Email" />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
        </div>

        <div className="mb-6">
          <Label text="Password" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
        </div>
      </AuthForm>
    </>
  );
}
