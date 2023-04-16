import { useNavigate } from "react-router-dom";

type FilterItemValue = {
  name: string;
  value: string;
};

type FilterItemType = {
  name: string;
  filterValue: string;
  values: FilterItemValue[];
  matchActiveFilter?: string[];
};

const FilterItem = ({
  name,
  values,
  filterValue,
  matchActiveFilter,
}: FilterItemType) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <div className="font-semibold">{name.toUpperCase()}</div>
      <div className="flex gap-2">
        {values.map((value) => (
          <div
            className={`font-light cursor-pointer ${
              matchActiveFilter &&
              matchActiveFilter[0] === value.name &&
              matchActiveFilter[1] === value.value
                ? "font-normal"
                : ""
            }`}
            key={value.name}
            onClick={() => navigate(`/products/${filterValue}/${value.value}`)}
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
  activeFilter?: string[];
}

const Filters = ({ filters, activeFilter }: FiltersProps) => (
  <div className="flex">
    {filters.map((filter) => (
      <FilterItem
        matchActiveFilter={activeFilter}
        name={filter.name}
        values={filter.values}
        filterValue={filter.filterValue}
      />
    ))}
  </div>
);

export default Filters;
