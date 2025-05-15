import UserTable from "@/components/dashboard/UsersTable";
import Header from "@/components/mainComponents/Header";

const DashboardPage = () => {

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header isDashboard />
      <UserTable className="mt-16"/>
    </div>
  );
};

export default DashboardPage;
