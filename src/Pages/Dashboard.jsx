import Balance from "../components/Balance";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";

const Dashboard = () => {
    const getCookie = (name) => {
        const cookieArr = document.cookie.split("; ");
        for (const cookie of cookieArr) {
            const [key, value] = cookie.split("=");
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return null;
    }
    return (
        <div className="lg:flex flex-col items-center py-5">
            <Navbar />
            <Balance getCookie={getCookie} /> 
            <UserList getCookie={getCookie}/>
        </div>
    )
}

export default Dashboard;