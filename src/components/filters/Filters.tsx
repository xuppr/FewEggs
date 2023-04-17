import { useNavigate } from "react-router-dom";

type FilterItemValue = {
  name: string;
  value: string;
};

type FilterItemType = {
  name: string;
  filterValue: string;
  values: FilterItemValue[];
  matchActiveFilter?: string[] | null;
};

const FilterItem = ({
  name,
  values,
  filterValue,
  matchActiveFilter,
}: FilterItemType) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-7">
      <div className="font-semibold">{name.toUpperCase()}</div>
      <div className="flex gap-3">
        {values.map((value) => (
          <div
            className={`font-light cursor-pointer ${
              matchActiveFilter &&
              matchActiveFilter[0] === filterValue &&
              matchActiveFilter[1] === value.value
                ? "font-normal"
                : ""
            }`}
            key={value.name}
            onClick={() => navigate(`/products?${filterValue}=${value.value}`)}
          >
            {value.name.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

interface FiltersProps {
  filters: FilterItemType[];
  activeFilter?: string[] | null;
  className?: string;
}

const Filters = ({ filters, activeFilter, className }: FiltersProps) => (
  <div className={`flex gap-16 w-fit ${className}`}>
    {filters.map((filter) => (
      <FilterItem
        key={filter.name}
        matchActiveFilter={activeFilter}
        name={filter.name}
        values={filter.values}
        filterValue={filter.filterValue}
      />
    ))}
  </div>
);

export default Filters;
