import axios from "axios";
import React from "react";

const Detail = async ({ params }: { params: { id: number } }) => {
  const fetchUserDetail = await axios.get(
    `http://localhost:3000/api/detailUser?id=${params.id}`
  );

  const userData = fetchUserDetail.data.data;
  return <div>{userData.name}</div>;
};

export default Detail;
