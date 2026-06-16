import {
  FaSolarPanel,
  FaBolt,
  FaChartLine,
  FaMoneyBillWave,
  FaMobileAlt,
} from "react-icons/fa";

export const processData = [
  {
    id: 1,
    title: "Choose Your Solarxen Package",
    desc: "We install a premium rooftop solar system on your property.",
    icon: <FaMoneyBillWave />,
  },
  {
    id: 2,
    title: "Professional Installation",
    desc: "Our certified team installs your solar system and connects it safely to your property.",
    icon: <FaSolarPanel />,
  },
  {
    id: 3,
    title: "Smart Power Management",
    desc: "Solarxen automatically prioritizes your own electricity consumption before sending excess energy to the grid.",
    icon: <FaBolt />,
  },
  {
    id: 4,
    title: "Export Excess Energy",
    desc: "Unused electricity is exported through net metering, helping you earn credits or additional value.",
    icon: <FaChartLine />,
  },
  {
    id: 5,
    title: "Monitor Everything",
    desc: "Track generation, consumption, savings, exports, and system performance in real time through the Solarxen app.",
    icon: <FaMobileAlt />,
  },
];
