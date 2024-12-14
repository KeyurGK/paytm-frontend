import axios from "axios";
import { useEffect, useState } from "react";

const Balance = ({ getCookie }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [balance, setBalance] = useState(0);
  const token = getCookie("acc_token");
  useEffect(() => {
    axios
      .get(`${API_KEY}/account/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBalance(res.data.balance);       
      },[]);
  });
  return (
    <div className="border mt-5  h-[10vh] lg:w-[70vw] flex items-center justify-center ">
      <p>Current Balance : {balance}</p>
    </div>
  );
};

export default Balance;
