import React, { useState, Fragment, useEffect } from "react";
// import MetaData from "../layout/MetaData";
import "./Search.css";

import { useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { red } from "@mui/material/colors";

import { useHistory } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const { product, loading, error } = useSelector((state) => state.products);
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push({
        pathname: `/products`,
        search: `?keyword=${keyword}`,
      });
    } else {
      history.push({
        pathname: `/products`,
      });
    }
  };

  return (
    <Fragment>
      {/* <MetaData title="Search A Product -- ECOMMERCE" /> */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ width: "100vw", height: "100vh", background: red[300] }}
      >
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search a Product ..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          {/* {console.log(searchParams.get("keyword"))} */}
          <input type="submit" value="Search" onClick={searchSubmitHandler} />
        </form>
      </Stack>
    </Fragment>
  );
};

export default Search;
