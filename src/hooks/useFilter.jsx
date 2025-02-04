import { useContext } from "react";


export const useFilters = () => {
  return useContext(FilterContext);
};