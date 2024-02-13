import Product, { productType } from "./Product";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Toast from "./Toast";
import ProductsPerPageSwitcher from "./productFilters/ProductPerPageSwitcher";
import CategoryFilter from "./productFilters/CategoryFilter";
import Pagination from "./Pagination";

export default function Products() {
  const { category } = useParams();
  const { state, search } = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(search);
  const initialPage = parseInt(queryParams.get("p") || "0", 10);
  const initialProductsPerPage = parseInt(queryParams.get("pc") || "30", 10);

  const [page, setPage] = useState<number>(initialPage);
  const [productsPerPage, setProductsPerPage] = useState<number>(
    initialProductsPerPage
  );
  const [newCategory, setNewCategory] = useState<string>(category || "");
  const [products, setProducts] = useState<productType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  // products update
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products${
            category ? "/category/" + category : ""
          }?skip=${productsPerPage * page}&limit=${productsPerPage}`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (err) {
        setError(
          err instanceof Error
            ? `Error fetching categories: ${err.message}`
            : `Unexpected error: ${err}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    setError(state);
  }, [category, state, page, productsPerPage]);

  // url update
  useEffect(() => {
    if (category !== newCategory && newCategory !== "") setPage(0);
    navigate(
      `${
        newCategory ? "/" + newCategory : ""
      }/products?p=${page}&pc=${productsPerPage}`
    );
  }, [category, newCategory, page, productsPerPage, navigate]);

  return (
    <>
      {/* Product filters */}
      <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1 sm:gap-5 my-10 sm:m-10 ">
        <CategoryFilter
          className="w-full max-w-xs sm:w-auto min-w-[160px]"
          category={category || "All products"}
          setNewCategory={setNewCategory}
          setError={setError}
        />

        <ProductsPerPageSwitcher
          className="w-full max-w-xs sm:w-auto"
          page={page}
          productsPerPage={productsPerPage}
          setPage={setPage}
          setProductsPerPage={setProductsPerPage}
        />
      </div>

      {error && <Toast time={10} error={error} setError={setError} />}

      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 min-h-[500px]">
        {loading ? (
          <p className="w-full text-center self-center">Loading products...</p>
        ) : products instanceof Array && products.length > 0 ? (
          products.map((product) => <Product {...product} key={product.id} />)
        ) : (
          <p className="w-full text-center self-center">
            No products found on this page.
          </p>
        )}
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        productsPerPage={productsPerPage}
        totalProducts={totalProducts}
      />
    </>
  );
}
