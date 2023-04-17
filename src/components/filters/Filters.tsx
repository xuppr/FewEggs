import { useNavigate } from "react-router-dom";
import { ReactComponent as FilterArrow } from "../../icons/polygon.svg";
import { ReactComponent as FilterIcon } from "../../icons/Vector.svg";
import { useState } from "react";

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

const FilterItemMd = ({
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

const FilterItemSm = ({
  name,
  values,
  filterValue,
  matchActiveFilter,
}: FilterItemType) => {
  const navigate = useNavigate();

  return (
    <div className="my-2 px-2 flex flex-col gap-1">
      <div className="mr-4 font-semibold text-sm">{name.toUpperCase()}</div>
      <div className="flex gap-3">
        {values.map((value) => (
          <div
            key={value.name}
            onClick={() => navigate(`/products?${filterValue}=${value.value}`)}
            className={`font-light text-xs ${
              matchActiveFilter &&
              matchActiveFilter[0] === filterValue &&
              matchActiveFilter[1] === value.value
                ? "font-normal"
                : ""
            }`}
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

const MdFilters = ({ filters, activeFilter, className }: FiltersProps) => (
  <div
    className={`hidden md:flex gap-16 w-full ${className} pb-2.5 border-b border-b-black`}
  >
    {filters.map((filter) => (
      <FilterItemMd
        key={filter.name}
        matchActiveFilter={activeFilter}
        name={filter.name}
        values={filter.values}
        filterValue={filter.filterValue}
      />
    ))}
  </div>
);

const SmFilters = ({ filters, activeFilter, className }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${className} w-full md:hidden border-t-2 border-t-black flex flex-col gap-2.5`}
    >
      <div
        className="flex justify-between pt-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex gap-1 items-center">
          <FilterIcon />
          <div className="font-semibold">FILTRI</div>
        </div>
        <FilterArrow
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      <div
        className={`flex flex-col gap-2 ml-2 pl-3 border-l border-l-black transition-[max-height] overflow-hidden ${
          isOpen ? "max-h-32 " : "max-h-0"
        }`}
      >
        {filters.map((filter) => (
          <FilterItemSm
            key={filter.name}
            matchActiveFilter={activeFilter}
            name={filter.name}
            values={filter.values}
            filterValue={filter.filterValue}
          />
        ))}
      </div>
    </div>
  );
};

const Filters = ({ filters, activeFilter, className }: FiltersProps) => (
  <>
    <MdFilters
      filters={filters}
      activeFilter={activeFilter}
      className={className}
    />
    <SmFilters
      filters={filters}
      activeFilter={activeFilter}
      className={className}
    />
  </>
);

export default Filters;
