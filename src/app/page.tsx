"use client";

import { AuthProvider, useAuth } from "@/components/context/AuthContext";
import { RegistrationForm } from "@/components/UI/RegistrationForm";
import Header from "@/components/layouts/header/Header";

function ContentGate() {
  const { isRegistered } = useAuth();

  if (isRegistered) {
    return <Header />;
  }

  return <RegistrationForm />;
}

export default function Home() {
  return (
    <AuthProvider>
      <ContentGate />
    </AuthProvider>
  );
}
