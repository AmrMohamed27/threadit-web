import UserGetter from "@/components/user/UserGetter";
import React from "react";

const UserPage = async ({ params }: { params: Promise<{ name: string }> }) => {
  const name = (await params).name.replace("%20", " ");
  return <UserGetter name={name} />;
};

export default UserPage;
