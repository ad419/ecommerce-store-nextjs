"use client";

import React from "react";

interface UserActionsProps {
  user: any;
  loading: boolean;
}

const UserActions: React.FC<UserActionsProps> = ({ user, loading }) => {
  return (
    <div>
      {user ? (
        <a href={`/user/${user?.id}`}>{user?.name}</a>
      ) : (
        <a href="/join">Join</a>
      )}
    </div>
  );
};

export default UserActions;
