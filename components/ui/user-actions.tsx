"use client";

export default function UserActions({
  user,
  loading,
}: {
  user: any;
  loading: boolean;
}) {
  return <h1>{user.name}</h1>;
}
