import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CustomChart = ({ options }) => {
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={options.series} height="300" />
        </div>
      </div>
    </div>
  );
};

export default CustomChart;
