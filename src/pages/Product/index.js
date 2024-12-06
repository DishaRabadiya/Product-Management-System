import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../../redux/context/cartContext";

function Product() {
  const { addToCart } = useCartContext();
  const [productData, setUsers] = useState([]);
  const [paginationState, setPaginationState] = useState({
    currentPage: 1,
    rowsPerPage: 5,
  });

  const handlePageChange = (page) => {
    setPaginationState((prevState) => ({ ...prevState, currentPage: page }));
  };

  const handleRowsPerPageChange = (newRowsPerPage, page) => {
    setPaginationState({ currentPage: page, rowsPerPage: newRowsPerPage });
  };

  const getProductsData = () => {
    axios.get("https://dummyjson.com/products").then((response) => {
      setUsers(response?.data?.products);
    });
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const columns = [
    {
      name: "No",
      selector: (row, index) =>
        (paginationState?.currentPage - 1) * paginationState?.rowsPerPage +
        index +
        1,
      sortable: false,
      width: "50px",
    },
    {
      name: "Product Name",
      selector: (row) => <span title={row?.title}>{row?.title}</span>,
      sortable: true,
    },
    {
      name: "Brand",
      selector: (row) => <span title={row?.brand}>{row?.brand}</span>,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => <span title={row?.category}>{row?.category}</span>,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => (
        <span title={row?.description}>{row?.description}</span>
      ),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => <span title={row?.price}>{row?.price}</span>,
      sortable: true,
    },
    {
      name: "Rating",
      sortable: true,
      selector: (row) => <span title={row?.rating}>{row?.rating}</span>,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <NavLink to="/cart">
            <IoCartOutline
              title="Add to Cart"
              size={20}
              style={{ cursor: "pointer", color: "green" }}
              onClick={() => {
                addToCart(row);
              }}
            />
          </NavLink>
        </div>
      ),
    },
  ];

  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      <DataTable
        title="Products List"
        columns={columns}
        data={productData}
        pagination
        highlightOnHover
        striped
        paginationServer={false}
        paginationPerPage={paginationState?.rowsPerPage}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
      />

      <ToastContainer />
    </div>
  );
}

export default Product;
