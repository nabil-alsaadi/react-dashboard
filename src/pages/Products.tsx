import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import { RootState, AppDispatch } from "../store";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import FilterBar, { Filter } from "../components/FilterBar";
import { fetchCategories } from "../store/categoriesSlice";
import PageSizeSelector from "../components/PageSizeSelector";
import { useLocation } from "react-router-dom";

const Products = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, total, loading, error } = useSelector((state: RootState) => state.products);
    const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.categories);

    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState<{ key: string; value: string } | undefined>();

    const location = useLocation();
    const category = useMemo(() => new URLSearchParams(location.search).get("category") || "all", [location.search]);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length]);

    useEffect(() => {
        const filter = category === "laptops" ? { key: "category", value: "laptops" } : activeFilter;
        dispatch(fetchProducts({ page: currentPage, pageSize, filter }));
    }, [dispatch, pageSize, currentPage, activeFilter, category]);

    const applyFilter = useCallback((key: string, value: string) => {
        setActiveFilter({ key, value });
        setCurrentPage(1);
    }, []);

    const clearFilters = useCallback(() => {
        setActiveFilter(undefined);
        setCurrentPage(1);
    }, []);

    const filteredProducts = useMemo(() => {
        return searchTerm
            ? products.filter((product) =>
                Object.values(product).some((value) =>
                    value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
            : products;
    }, [searchTerm, products]);

    const baseFilters: Filter[] = [
        { label: "Title", key: "title", type: "text" },
        { label: "Brand", key: "brand", type: "text" },
    ];

    const categoryFilter: Filter[] = useMemo(() => (
        category === "all"
            ? [{ label: "Category", key: "category", type: "list", options: categoriesLoading ? [] : categories }]
            : []
    ), [category, categoriesLoading, categories]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold text-black mb-4">Home / <span className="text-yellow">Products</span></h1>
            <div className="flex items-center space-x-4 mb-4">
                <PageSizeSelector pageSize={pageSize} onPageSizeChange={(size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                }} />
                <div className="h-6 border-l border-gray"></div>
                <SearchBar placeholder="Search products..." onSearch={setSearchTerm} />
                <div className="h-6 border-l border-gray"></div>
                <FilterBar
                    filters={[...baseFilters, ...categoryFilter]}
                    onApplyFilter={applyFilter}
                    onClearFilters={clearFilters}
                />
            </div>
            {error && <p className="text-red-500 text-lg font-semibold my-4">{error}</p>}
            {loading ? (
                <p className="text-black">Loading...</p>
            ) : (
                <DataTable
                    columns={["title", "brand", "category", "price", "stock", "rating", "sku", "weight"]}
                    data={filteredProducts}
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

export default Products;
