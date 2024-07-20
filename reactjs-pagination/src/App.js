import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [onceFetched, setOnceFetched] = useState(false);
  const totalPages = 10;
  const [totalProd, setTotalProd] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${totalProd}&skip=${
        page * totalProd - totalProd
      }`
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalProd(Math.ceil(data.total / 10));
    }
  };

  const fetchOnes = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=10&skip=0");
    const data = await res.json();

    if (data && data.products) {
      // setProducts(data.products);
      setTotalProd(Math.ceil(data.total / 10));
      setOnceFetched(true);
    }
  };

  useEffect(() => {
    fetchOnes();
  }, []);

  useEffect(() => {
    if (totalProd && onceFetched) fetchProducts();
  }, [page, onceFetched]);

  const selectPageHandler = (selectPage) => {
    if (selectPage > 0 && selectPage <= totalPages) setPage(selectPage);
  };

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="product_single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page === 1 ? "pagination-disable" : ""}
            onClick={() => {
              selectPageHandler(page - 1);
            }}
          >
            ◀️
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "page-selected" : ""}
                onClick={() => {
                  selectPageHandler(i + 1);
                }}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page === totalPages ? "pagination-disable" : ""}
            onClick={() => {
              selectPageHandler(page + 1);
            }}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}
