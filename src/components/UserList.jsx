import axios from "axios";
import { useEffect, useState } from "react";
import MoneyModal from "../modals/MoneyModal";

const UserList = ({ getCookie }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
    const [sendMoney, setSendMoney] = useState(false);
    const [enteredAmount, setEnteredAmount] = useState(0);
  const bearerToken = getCookie("acc_token");
  useEffect(() => {
    try {
      axios.get(`${API_KEY}/api/v1/user/bulk`).then((response) => {
        setUserList(response.data.user);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleSendMoney = (user) => {
    setSelectedUser(() => user);

    setSendMoney(true);
  };
  const handleClose = () => {
    setSendMoney(false);
  };
  const handleTransaction = () => {
    axios
      .post(
        `${API_KEY}/api/v1/account/transfer`,
        {
          amount: enteredAmount,
          to: selectedUser._id,
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      <div className="border py-2 mt-5 lg:w-[70vw] lg:h-[70vh]">
        {userList?.map((user, index) => (
          <div
            className="flex justify-around  items-center mt-5"
            key={user._id}
          >
            {sessionStorage.getItem("username") !== user.username && (
              <div className="w-[80vw] lg:w-[60vw] flex justify-between ">
                <p className="text-xl">{user.firstName}</p>
                <button
                  onClick={() => handleSendMoney(user)}
                  className="border bg-black text-white rounded-lg px-2 py-1 text-xs"
                >
                  Send Money
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {sendMoney && (
        <MoneyModal selectedUser={selectedUser} handleClose={handleClose} handleTransaction={handleTransaction} enteredAmount={enteredAmount} setEnteredAmount={setEnteredAmount} />
      )}
    </div>
  );
};

export default UserList;
