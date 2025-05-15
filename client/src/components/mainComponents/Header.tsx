import { logoutUser } from "@/services/authService";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Header = ({ isDashboard }: { isDashboard?: boolean }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-[#1e1e1e] border-b fixed top-0 left-0 right-0 z-30 border-[#333333] p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold text-white">
        {isDashboard ? "Dashboard" : "KYC Verification"}
      </h2>
      <div className="flex gap-2">
        <Button
          onClick={() =>
            navigate(isDashboard ? "/dashboard/kyc" : "/dashboard")
          }
          className="border-[#444444] bg-[#333333] hover:bg-[#444444] text-white"
        >
          {isDashboard ? "Verify KYC" : "Dashboard"}
        </Button>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-[#444444] bg-[#333333] hover:bg-[#444444] text-white"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
