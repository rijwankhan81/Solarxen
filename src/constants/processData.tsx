import {
  FaSolarPanel,
  FaBolt,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa";

export const processData = [
  {
    id: 1,
    title: "Install Solar",
    desc: "We install a premium rooftop solar system on your property.",
    icon: <FaSolarPanel />,
  },
  {
    id: 2,
    title: "Connect Inverter",
    desc: "Smart inverters connect your system to the national grid.",
    icon: <FaBolt />,
  },
  {
    id: 3,
    title: "Generate Electricity",
    desc: "Sunlight is converted into clean, usable electricity.",
    icon: <FaChartLine />,
  },
  {
    id: 4,
    title: "Earn Monthly Income",
    desc: "Receive regular payouts for the energy you supply to the grid.",
    icon: <FaMoneyBillWave />,
  },
];
