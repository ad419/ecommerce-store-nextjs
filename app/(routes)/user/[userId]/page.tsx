import getUser from "@/actions/get-user";
import React from "react";
import Layout from "../components/layout";
import getCupons from "@/actions/get-cupons";
import { User, Cupon } from "@/types";

interface UserPageProps {
  params: {
    userId: string;
    storeId: string;
  };
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const user = (await getUser(params.userId)) as any;
  const cupons = (await getCupons(params.storeId)) as Cupon[];
  const { userData } = JSON.parse(user) as { userData: User };
  return (
    <div>
      <Layout user={userData} cupons={cupons} />
    </div>
  );
};

export default UserPage;
