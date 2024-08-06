import React, { useState, useEffect } from "react";
import {
  deleteCategoryService,
  getCategoriesService,
  searchCategoriesService,
} from "../../services/CategoryService";
import CategorySearch from "../../component/Admin/CategorySearch";
import CategoryForm from "../../component/Admin/CategoryForm";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategoriesService();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    try {
      const data = await searchCategoriesService(term);
      setCategories(data);
    } catch (error) {
      console.error("Failed to search categories", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategoryService(id);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  return (
    <div>
      <h1>Category List</h1>
      <CategorySearch onSearch={handleSearch} />
      <CategoryForm onCategoryAdded={fetchCategories} />
      <ul>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.categoryId}>
              {category.categoryName}
              <button onClick={() => handleDelete(category.categoryId)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No categories found</li>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
