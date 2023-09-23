import React from "react";
import Container from "@/components/ui/container";
import NextImage from "next/image";
import moment from "moment";
import { User, Cupon } from "@/types";

interface LayoutProps {
  user: User;
  cupons: Cupon[];
}

const Layout: React.FC<LayoutProps> = ({ user, cupons }) => {
  // map through cupons and find the ones which id match to user.cupons
  const userCoupons = user.cupons
    .map((userCupon: any) => {
      return cupons.find((cupon: any) => cupon.id === userCupon.cuponId);
    })
    .filter(Boolean);

  return (
    <Container>
      <div className="flex flex-col mt-20 p-3 space-y-3">
        <h1 className="text-3xl font-bold text-left">User Page</h1>
        <div className="flex items-start justify-start gap-7">
          <NextImage
            alt="user_img"
            src={user.image}
            width={400}
            height={400}
            className="rounded-md"
          />
          <div className="flex flex-col items-start justify-start pt-3">
            <h1 className="text-2xl font-semibold text-left">
              Personal Information
            </h1>
            <hr className="w-full text-black" />

            <h1 className="text-[17px] font-semibold text-left text-slate-900 opacity-75 mt-3">
              Name: {user.name}
            </h1>
            <h1 className="text-[17px] font-semibold text-left text-slate-900 opacity-75 mt-3">
              Username: {`@${user.name.split(" ").join("_").toLowerCase()}`}
            </h1>
            <h1 className="text-[17px] font-semibold text-left text-slate-900 opacity-75">
              Email: {user.email}
            </h1>
            <h1 className="text-[17px] font-semibold text-left text-slate-900 opacity-75">
              Cupons Claimed: {user.cupons.length}
            </h1>
            <h1 className="text-[17px] font-semibold text-left text-slate-900 opacity-75">
              User Since: {moment(user.createdAt).format("DD/MM/YYYY")}
            </h1>
            <br />
            <br />
            <h1 className="text-2xl font-semibold text-left">
              Accoutnt Security
            </h1>
            <hr className="w-full text-black" />
            <h1 className="text-[17px] font-semibold text-left text-slate-900 opacity-75 mt-3">
              Auth provider: {user.accounts[0].provider}
            </h1>
            <h1 className="text-[17px] font-semibold text-left text-slate-900 opacity-75">
              User ID: {user.accounts[0].id}
            </h1>
            <h1 className="text-[17px] font-semibold text-left text-slate-900 opacity-75">
              Auth type: {user.accounts[0].type}
            </h1>
          </div>
          {/*
            cupons claimed by user
          */}
          <div className="flex flex-col items-start justify-start pt-3">
            <h1 className="text-2xl font-semibold text-left">Cupons Claimed</h1>
            <hr className="w-full text-black" />
            {userCoupons.map((cupon: any) => (
              <div
                key={cupon.id}
                className="flex items-start justify-start mt-3 bg-gray-300 bg-opacity-40 p-3 rounded-md w-full"
              >
                <h1 className="text-[17px] font-semibold text-left text-slate-900 opacity-75">
                  Cupon ID: {cupon.id}
                </h1>
                <h1 className="text-[17px] font-semibold text-left text-slate-900 opacity-75">
                  Cupon Code: {cupon.code}
                </h1>
                <h1 className="text-[17px] font-semibold text-left text-slate-900 opacity-75">
                  Cupon Value: {cupon.value}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Layout;
