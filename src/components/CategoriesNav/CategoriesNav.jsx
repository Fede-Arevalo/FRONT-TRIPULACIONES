import { Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../features/categories/categorySlice";
import "./CategoriesNav.scss";

const CategoriesNav = ({ selectedCategory, setSelectedCategory }) => {
  const { Option } = Select;
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    // eslint-disable-next-line
  }, []);

  const selectOption = categories?.map((category) => {
    return (
      <Option key={category?._id} value={category?.name}>
        {category?.name}
      </Option>
    );
  });
  return (
    <div>
      <Select
        placeholder="por favor selecione una categoria"
        className="input-category"
        value={selectedCategory}
        onChange={(value) => setSelectedCategory(value)}
      >
        {selectOption}
      </Select>
    </div>
  );
};
export default CategoriesNav;
