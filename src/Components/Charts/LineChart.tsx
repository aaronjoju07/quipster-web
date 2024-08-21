import React, { useState } from "react";
import { Line } from "react-chartjs-2";

// Define the interface for the user data with sentiment
interface UserDataEntry {
  id: number;
  year: number;
  userGain: number;
  userLost: number;
  sentiment: 'positive' | 'negative';
}

// Define the UserData array with sentiment labels
const UserData: UserDataEntry[] = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
    sentiment: 'positive',
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
    sentiment: 'positive',
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
    sentiment: 'positive',
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
    sentiment: 'negative',
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
    sentiment: 'positive',
  },
];

// Define the LineChart component directly in this file
const LineChart: React.FC<{ chartData: any }> = ({ chartData }) => {
  return <Line data={chartData} />;
};

function Chart() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT

  return (
    <div className="App">
      <div style={{ width: 700 }}>
        <LineChart chartData={userData} />
      </div>
    </div>
  );
}

export default Chart;
