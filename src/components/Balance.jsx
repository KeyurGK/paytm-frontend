import axios from "axios";
import { useEffect, useState } from "react";

const Balance = ({ getCookie }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [balance, setBalance] = useState(0);
  const token = getCookie("acc_token");
  useEffect(() => {
    // Define fetchBalance as a function
    const fetchBalance = () => {
      axios
        .get(`${API_KEY}/api/v1/account/balance`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setBalance(res.data.balance);
        })
        .catch((err) => {
          console.error("Error fetching balance:", err);
        });
    };

    // Initial call to fetch balance
    fetchBalance();

    // Set up the interval to call fetchBalance every 10 seconds
    const interval = setInterval(() => {
      fetchBalance();
    }, 10 * 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); 
  return (
    <div className="border mt-5  h-[10vh] lg:w-[70vw] flex items-center justify-center ">
      <p>Balance : {balance}</p>
    </div>
  );
};

export default Balance;
