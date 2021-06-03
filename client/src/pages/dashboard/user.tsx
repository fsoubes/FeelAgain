import React from "react";

interface UserProps {}

const User: React.FC<UserProps> = ({}) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <h1>Utilisateurs</h1>
    </div>
  );
};
export default User;
