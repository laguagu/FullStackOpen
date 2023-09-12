import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleChange = (event) => {
    const filterText = event.target.value;
    dispatch(setFilter(filterText)); // Päivitetään filtterin tila Reduxin avulla
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter} />
    </div>
  );
};

export default Filter;
