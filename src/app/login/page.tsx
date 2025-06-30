'use client';

import { useEffect, useState } from "react";
import Input from "@/components/auth/Input";
import Heading from "@/components/auth/Heading";
import AuthForm from "@/components/auth/AuthForm";
import Label from "@/components/auth/Label";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log("Email:", email);
        console.log("Password:", password);
    }, [password, email]);

  return (
    <AuthForm 
        btnType="submit"
        btnText="Login"
        onsubmit={(e) => {
            e.preventDefault();
        }}
    > 
        <Heading title="Login" description="Please enter your credentials to continue." />
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