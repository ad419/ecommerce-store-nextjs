import getUser from "@/actions/get-user";
import React from "react";
import Layout from "../components/layout";
import getCupons from "@/actions/get-cupons";

interface UserPageProps {
  params: {
    userId: string;
    storeId: string;
  };
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const user = (await getUser(params.userId)) as any;
  const cupons = await getCupons(params.storeId);
  const { userData, message } = JSON.parse(user);
  return (
    <div>
      <Layout user={userData} cupons={cupons} />
    </div>
  );
};

export default UserPage;
