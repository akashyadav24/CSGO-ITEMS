import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CustomChart = ({ options }) => {
  return (
    <div>
      <Chart options={options} series={options.series} height="300" />
    </div>
  );
};

export default CustomChart;
