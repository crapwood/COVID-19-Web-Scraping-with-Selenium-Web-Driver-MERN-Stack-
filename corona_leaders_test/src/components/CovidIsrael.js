import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const CovidIsrael = (props) => {
  const [labels, setLabels] = useState([]);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchIsraelData = async () => {
      const res = await fetch(
        `https://api.covid19api.com/total/country/israel`
      );
      const data = await res.json();
      let dateLabels = [];
      let numCases = [];
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      for (let i = 30; i < data.length; i++) {
        const filter_date = new Date(data[i].Date.split("T")[0]);
        const month = monthNames[filter_date.getMonth()];
        const date = month + " " + filter_date.getDate();
        dateLabels.push(date);
        numCases.push(data[i].Confirmed);
      }
      setLabels([...dateLabels]);
      setCases([...numCases]);
    };
    fetchIsraelData();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Cases",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: cases,
      },
    ],
  };
  return (
    <div class="container-fluid">
      <h3>Total Coronavirus Cases in Israel</h3>
      <Line data={data} height={300} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default CovidIsrael;
