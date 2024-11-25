import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { editProduct, getAllProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";
const apiURL = process.env.REACT_APP_API_URL;

const EditProductModal = () => {
  const { data, dispatch } = useContext(ProductContext);

  const [categories, setCategories] = useState([]);
  const [editformData, setEditformdata] = useState({
    pId: "",
    pName: "",
    pDescription: "",
    pImages: null,
    pEditImages: null,
    pStatus: "",
    pCategory: "",
    pQuantity: "",
    pPrice: "",
    pOffer: "",
    error: false,
    success: false,
  });

  // Alert helper
  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategoryData = async () => {
      const responseData = await getAllCategory();
      if (responseData && responseData.Categories) {
        setCategories(responseData.Categories);
      }
    };
    fetchCategoryData();
  }, []);

  // Update the form data when editProductModal data changes
  useEffect(() => {
    if (data.editProductModal) {
      const modalData = data.editProductModal;
      setEditformdata({
        pId: modalData.pId || "",
        pName: modalData.pName || "",
        pDescription: modalData.pDescription || "",
        pImages: modalData.pImages || null,
        pEditImages: null, // Reset for new uploads
        pStatus: modalData.pStatus || "",
        pCategory: modalData.pCategory || "",
        pQuantity: modalData.pQuantity || "",
        pPrice: modalData.pPrice || "",
        pOffer: modalData.pOffer || "",
        error: false,
        success: false,
      });
    }
  }, [data.editProductModal]);

  // Fetch all products after successful edit
  const fetchData = async () => {
    const responseData = await getAllProduct();
    if (responseData && responseData.Products) {
      dispatch({
        type: "fetchProductsAndChangeState",
        payload: responseData.Products,
      });
    }
  };

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const responseData = await editProduct(editformData);
      if (responseData.success) {
        fetchData();
        setEditformdata({ ...editformData, success: true });
        setTimeout(() => {
          dispatch({ type: "editProductModalClose", payload: false });
        }, 2000);
      } else if (responseData.error) {
        setEditformdata({ ...editformData, error: responseData.error });
      }
    } catch (error) {
      console.error("Edit Product Error:", error);
      setEditformdata({ ...editformData, error: "Failed to update product" });
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={() => dispatch({ type: "editProductModalClose", payload: false })}
        className={`${
          data.editProductModal?.modal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* Modal Start */}
      <div
        className={`${
          data.editProductModal?.modal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className="relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Product
            </span>
            <span
              onClick={() => dispatch({ type: "editProductModalClose", payload: false })}
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full bg-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </div>
          {editformData.error && alert(editformData.error, "red")}
          {editformData.success && alert("Product updated successfully!", "green")}
          <form className="w-full" onSubmit={submitForm}>
            {/* Form fields */}
            <div className="flex space-x-1 py-4">
              <div className="w-1/2">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={editformData.pName}
                  onChange={(e) =>
                    setEditformdata({ ...editformData, pName: e.target.value })
                  }
                  className="px-4 py-2 border focus:outline-none w-full"
                />
              </div>
              <div className="w-1/2">
                <label>Product Price *</label>
                <input
                  type="number"
                  value={editformData.pPrice}
                  onChange={(e) =>
                    setEditformdata({ ...editformData, pPrice: e.target.value })
                  }
                  className="px-4 py-2 border focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label>Product Description *</label>
              <textarea
                value={editformData.pDescription}
                onChange={(e) =>
                  setEditformdata({ ...editformData, pDescription: e.target.value })
                }
                className="px-4 py-2 border focus:outline-none w-full"
                rows="4"
              />
            </div>
            {/* Category selector */}
            <div className="flex flex-col mt-4">
              <label>Product Category *</label>
              <select
                value={editformData.pCategory}
                onChange={(e) =>
                  setEditformdata({ ...editformData, pCategory: e.target.value })
                }
                className="px-4 py-2 border focus:outline-none"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.cName}
                  </option>
                ))}
              </select>
            </div>
            {/* Submit button */}
            <div className="mt-6">
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProductModal;
