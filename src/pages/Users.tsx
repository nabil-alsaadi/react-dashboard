import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/usersSlice";
import { RootState, AppDispatch } from "../store";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import PageSizeSelector from "../components/PageSizeSelector";

const Users = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, total, loading, error } = useSelector((state: RootState) => state.users);

    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState<{ key: string; value: string } | null>(null);

    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, pageSize, filter: activeFilter || undefined }));
    }, [dispatch, pageSize, currentPage, activeFilter]);

    const applyFilter = useCallback((key: string, value: string) => {
        setActiveFilter({ key, value });
        setCurrentPage(1);
    }, []);

    const clearFilters = useCallback(() => {
        setActiveFilter(null);
        setCurrentPage(1);
    }, []);

    const filteredUsers = useMemo(() => {
        return searchTerm
            ? users.filter((user) =>
                Object.values(user).some((value) =>
                    value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
            : users;
    }, [searchTerm, users]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold text-black mb-4">Home / <span className="text-yellow">Users</span></h1>
            <div className="flex items-center space-x-4 mb-4">
                <PageSizeSelector pageSize={pageSize} onPageSizeChange={(size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                }} />
                <div className="h-6 border-l border-gray"></div>
                <SearchBar placeholder="Search users..." onSearch={setSearchTerm} />
                <div className="h-6 border-l border-gray"></div>
                <FilterBar
                    filters={[
                        { label: "Name", key: "firstName", type: "text" },
                        { label: "Email", key: "email", type: "text" },
                        { label: "Birth Date", key: "birthDate", type: "date" },
                        { label: "Gender", key: "gender", type: "list", options: ["male", "female"] },
                    ]}
                    onApplyFilter={applyFilter}
                    onClearFilters={clearFilters}
                />
            </div>
            {error && <p className="text-red-500 text-lg font-semibold my-4">{error}</p>}
            {loading ? (
                <p className="text-black">Loading...</p>
            ) : (
                <DataTable
                    columns={["firstName", "lastName", "maidenName", "age", "gender", "email", "username", "bloodGroup", "birthDate", "eyeColor"]}
                    data={filteredUsers}
                />
            )}
            {!searchTerm && (
                <Pagination
                    total={total}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};

export default Users;
