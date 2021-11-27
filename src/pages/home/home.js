import React, { useEffect, useState } from "react";
import Card from "../../component/card/card";
import Filter from "../../component/filter/filter";
import Loader from "../../component/loader/loader";
import Nav from "../../component/nav/nav";
import Classes from "./home.module.css";

/** @summary having the home page design with the search integration; note fetched items are stored at sessionstorage("bluecubeusers")  */
const Home = () => {
  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem("bluecubeusers")) || []
  );
  const [loading, setLoading] = useState(false);

  const getUser = async (query) => {
    setLoading(true);
    try {
      let _object = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&&per_page=8`,
        {
          method: "GET",
          headers: new Headers({
            Authorization: `Client-ID 3FSTBybiYPrdIQEtCEZ2M-Jwt_9RHzYAryB1OIv4CVQ`,
          }),
        }
      );
      let result = await _object.json();
      setData(result.results);

      sessionStorage.setItem("bluecubeusers", JSON.stringify(result.results));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("bluecubeusers")) {
      return;
    }
    getUser("men");
  });

  const mapData = data.map((v) => {
    return (
      <Card
        key={v.id}
        url={v.urls.regular}
        location={v.user?.location}
        total={v.user?.total_photos}
        name={v.user?.last_name}
      />
    );
  });

  // onSumbmit from nav search with forwarded ref
  const onSubmitHandler = (ref, e) => {
    e.preventDefault();
    getUser(ref.current.value);
  };

  return (
    <div>
      <Nav onSubmit={onSubmitHandler} />
      <div style={{ height: "40px" }}></div>
      <Filter />
      <div style={{ height: "40px" }}></div>
      {loading && <Loader />}
      <div className={Classes.gridCards}>{mapData}</div>
    </div>
  );
};

export default Home;
