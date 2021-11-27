import React from "react";
import Classes from "./filter.module.css";
import { ReactComponent as Arrow } from "../../asset/arrow.svg";


const Filter = () => {
  const filters = [
    "World",
    "Following",
    "Popular",
    "Post",
    "Gender",
    "Location",
    "Profession",
  ];

  const mappedFilter = filters.map((v) => {
    return (
      <div key={Math.random()} className={Classes.eachFilter}>
        <div>{v}</div>
        <Arrow
          style={{
            width: "13px",
            marginLeft: "5px",
            transform: "rotate(-90deg)",
          }}
        />
      </div>
    );
  });

  return <div className={Classes.filterCover}>
      {mappedFilter}
  </div>;
};

export default Filter;
