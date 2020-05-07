import React, { useState, useEffect } from "react";

const CovidWorld = (props) => {
  const [coronaData, setData] = useState([]);
  useEffect(() => {
    const getFromServer = async () => {
      const res = await fetch("http://127.0.0.1:8000/covid/");
      const result = await res.json();
      // console.log(result.data);
      setData([...result.data]);
    };
    getFromServer();
  }, []);

  const fetchDataPerCountry = () => {
    return coronaData.map((data) => {
      return (
        <tr>
          <td>{data.Country}</td>
          <td>{data.Total_Cases}</td>
          <td>{data.New_Cases}</td>
          <td>{data.Total_Deaths}</td>
          <td>{data.New_Deaths}</td>
          <td>{data.Total_Recovered}</td>
          <td>{data.Active_Cases}</td>
          <td>{data.Critical_Cases}</td>
          <td>{data.Total_Tests}</td>
        </tr>
      );
    });
  };

  const showTable = () => {
    return (
      <table className="table table-hover table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">Country/Other</th>
            <th scope="col">Total Cases</th>
            <th scope="col">New Cases</th>
            <th scope="col">Total Deaths</th>
            <th scope="col">New Deaths</th>
            <th scope="col">Total Recovered</th>
            <th scope="col">Active Cases</th>
            <th scope="col">Critical Cases</th>
            <th scope="col">Total Tests</th>
          </tr>
        </thead>
        <tbody>{fetchDataPerCountry()}</tbody>
      </table>
    );
  };

  return (
    <div className="container-fluid" style={{ marginTop: 20 + "px" }}>
      <h3>World Covid-19 Statistics</h3>
      {showTable()}
    </div>
  );
};

export default CovidWorld;
