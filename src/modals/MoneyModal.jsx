const MoneyModal = ({ selectedUser, handleClose,handleTransaction ,enteredAmount, setEnteredAmount}) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-[500px] relative">
          <h2 className="text-2xl font-bold mb-4 text-center">Send Money</h2>
          <p className="text-lg mb-4 text-center">
            Send money to <span className="font-semibold">{selectedUser?.firstName}</span>
          </p>
  
          <div className="flex flex-col gap-4">
            <input
              value={enteredAmount}
              onChange={(e)=>setEnteredAmount(e.target.value)}
              type="number"
              placeholder="Enter amount"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              onClick={handleTransaction}
            >
              Confirm
            </button>
            <button
              className="text-red-500 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default MoneyModal;
  