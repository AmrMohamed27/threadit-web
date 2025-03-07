import CommunityGetter from "@/components/communities/CommunityGetter";
import React from "react";

const CommunityPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const name = (await params).name.replace("%20", " ");
  return <CommunityGetter name={name} />;
};

export default CommunityPage;
