import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Search } from "lucide-react";
import { useGetUsers } from "@/hooks/useGetUsers";
import { Input } from "@/components/ui/input";
import { Pagination1 } from "../common/Pagination";

interface UserTableProps {
  itemsPerPage?: number;
  className?: string;
}

export default function UserTable({
  itemsPerPage = 2,
  className,
}: UserTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, error } = useGetUsers({
    currentPage,
    itemsPerPage,
    search: debouncedSearch,
  });

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={`w-full bg-[#121212] p-6 rounded-lg ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Users List</h2>
        <div className="relative max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#9e9e9e]" />
          <Input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 bg-[#1e1e1e] border-[#333] text-[#e0e0e0] focus:ring-[#00b37e] focus:border-[#00b37e]"
          />
        </div>
      </div>

      <div className="border border-[#333] rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-[#1e1e1e]">
            <TableRow className="border-b border-[#333]">
              <TableHead className="text-[#9e9e9e] font-medium">
                Sl. No
              </TableHead>
              <TableHead className="text-[#9e9e9e] font-medium">ID</TableHead>
              <TableHead className="text-[#9e9e9e] font-medium">
                Email
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <div className="flex justify-center items-center text-[#9e9e9e]">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Loading users...
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-red-400"
                >
                  Error loading users: {(error as Error).message}
                </TableCell>
              </TableRow>
            ) : data?.users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-[#9e9e9e]"
                >
                  {debouncedSearch
                    ? `No users found matching "${debouncedSearch}"`
                    : "No users found"}
                </TableCell>
              </TableRow>
            ) : (
              data?.users.map((user, index) => {
                // Calculate the actual serial number based on page and items per page
                const serialNumber =
                  (currentPage - 1) * itemsPerPage + index + 1;

                return (
                  <TableRow
                    key={user._id}
                    className="border-b border-[#333] hover:bg-[#1e1e1e]"
                  >
                    <TableCell className="text-[#e0e0e0]">
                      {serialNumber}
                    </TableCell>
                    <TableCell className="text-[#e0e0e0] font-mono text-sm">
                      {user._id}
                    </TableCell>
                    <TableCell className="text-[#e0e0e0]">
                      {user.email}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* {data?.totalPages && data.totalPages > 1 && ( */}
      <div className="mt-4">
        <Pagination1
          currentPage={currentPage}
          totalPages={data?.totalPages || 1}
          onPageChange={paginate}
        />
      </div>
      {/* )} */}
    </div>
  );
}
