import Balance from "../components/Balance";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    return (
        <div className="lg:flex flex-col items-center py-5">
            <Navbar />
            <Balance/> 
        </div>
    )
}

export default Dashboard;