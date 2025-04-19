import React from "react";
import { Line } from "react-chartjs-2";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./dashboard.css";
import weeShareLogo from "../assets/WSR.png";
import dotMap from "../assets/WSM.png";
import { FiLogOut } from "react-icons/fi";


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Dashboard = () => {
  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Revenue 27.8k$",
        data: [0, 2, 7, 15, 15.9, 16, 18, 21, 23, 25, 27, 27.8],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.5,
        pointBackgroundColor: "#06d6a0",
        pointBorderColor: "#1e293b",
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        borderWidth: 3,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y}K`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#d1d5db",
        },
      },
      x: {
        ticks: {
          color: "#d1d5db",
        },
      },
    },
  };

  const markers = [
    { name: "New York", coordinates: [-74, 40.7] },
    { name: "London", coordinates: [-0.1, 51.5] },
    { name: "Tokyo", coordinates: [139.7, 35.7] },
    { name: "Sydney", coordinates: [151.2, -33.8] },
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="gradient-bg gradient-bg-top"></div>
      <div className="gradient-bg gradient-bg-bottom"></div>

      <aside className="sidebar">
        <div className="logo-section">
          <img src={weeShareLogo} alt="WeeShare Logo" className="logo-img" />
          <input className="search-bar" type="text" placeholder="Search..." />
        </div>
        <div className="nav-menu">
          <button className="nav-item active">Dashboard</button>
          <button className="nav-item">Notifications</button>
          <button className="nav-item">Users</button>
          <button className="nav-item">Flagged Posts</button>
          <button className="nav-item">Advertisements</button>
          <button className="nav-item">Blogs</button>
        </div>
        <div className="sidebar-button logout-button">
          <FiLogOut className="icon" />
          Logout
        </div>
      </aside>

      <main className="main-content">
        <div className="top-header">
          <div>
            <h2>Welcome back, Nouman 👋</h2>
            <p>This is the Admin Dashboard. Track the Analytics here.</p>
          </div>
          <div className="header-actions">
            <button className="export-btn">Export data ⬇</button>
            <button className="create-report">Create report</button>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-label">Live Visits</div>
            <div className="stat-value">500</div>
            <div className="stat-change positive">+12.6%</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Monthly Users</div>
            <div className="stat-value">3.6K</div>
            <div className="stat-change negative">-16.2%</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">New Sign Ups</div>
            <div className="stat-value">456</div>
            <div className="stat-change positive">+13.1%</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Subscriptions</div>
            <div className="stat-value">2.3K</div>
            <div className="stat-change positive">+35.3%</div>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h4>Total revenue - 27.8k$</h4>
            <span>Jan 2025 - Dec 2025</span>
          </div>
          <Line data={lineData} options={lineOptions} />
        </div>

        <div className="reports-overview">
          <div className="header-row">
            <h2>Reports overview</h2>
            <div className="report-actions">
              <button className="select-date">📅 Select date</button>
              <button className="export-data">⬇ Export data</button>
              <button className="create-report">Create report</button>
            </div>
          </div>

          <div className="overview-section">
            <div className="donut-card">
              <div className="semi-arc">
                <svg width="220" height="110" viewBox="0 0 220 110">
                  <path
                    d="M20,100 A90,90 0 0,1 90,20"
                    stroke="#CB3CFF"
                    strokeWidth="10"
                    fill="none"
                  />
                  <path
                    d="M90,20 A90,90 0 0,1 130,20"
                    stroke="#0038FF"
                    strokeWidth="10"
                    fill="none"
                  />
                  <path
                    d="M130,20 A90,90 0 0,1 200,100"
                    stroke="#00C2FF"
                    strokeWidth="10"
                    fill="none"
                  />
                </svg>
                <div className="semi-arc-value">
                  <br></br>
                  <br></br>
                  <h2>5,643</h2>
                  <p>Users by device</p>
                  <br></br>
                  <br></br>
                </div>
              </div>

              <ul className="device-list">
                <br></br>
                <br></br>
                <li>
                  <span className="dot purple"></span>Desktop users{" "}
                  <span className="count">4,100</span>
                </li>
                <br></br>
                <li>
                  <span className="dot blue"></span>Phone app users{" "}
                  <span className="count">643</span>
                </li>
                <br></br>
                <li>
                  <span className="dot green"></span>Laptop users{" "}
                  <span className="count">1,000</span>
                </li>
              </ul>
            </div>

            <div className="recent-table">
              <h4>Recent Subscribers</h4>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Package</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Parker</td>
                    <td>May 30, 9:38 AM</td>
                    <td>Premium</td>
                    <td>$499</td>
                  </tr>
                  <tr>
                    <td>Christiano</td>
                    <td>Dec 29, 4:38 AM</td>
                    <td>Startup</td>
                    <td>$89</td>
                  </tr>
                  <tr>
                    <td>Paul</td>
                    <td>Dec 28, 12:38 AM</td>
                    <td>Basic</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>Abdullah</td>
                    <td>Dec 28, 2:29 PM</td>
                    <td>Standard</td>
                    <td>$200</td>
                  </tr>
                  <tr>
                    <td>John Wick</td>
                    <td>Dec 26, 9:04 AM</td>
                    <td>Standard</td>
                    <td>$200</td>
                  </tr>

                  <tr>
                    <td>Emily Rose</td>
                    <td>Dec 25, 11:00 AM</td>
                    <td>Premium</td>
                    <td>$499</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="map-section">
          <div className="country-stats">
            <h4>Users by country</h4>
            <p className="total-users">
              12.4K <span className="positive">+26.9%</span>
            </p>
            <ul className="country-list">
              <li>
                <span className="bar us"></span> United States - 30%
              </li>
              <li>
                <span className="bar uk"></span> United Kingdom - 25%
              </li>
              <li>
                <span className="bar ca"></span> Canada - 25%
              </li>
              <li>
                <span className="bar au"></span> Australia - 10%
              </li>
              <li>
                <span className="bar es"></span> Spain - 10%
              </li>
            </ul>
          </div>

          <div className="dot-map-container">
            <img src={dotMap} alt="Dotted World Map" className="dot-map-img" />
            {/* Glowing active user points */}
            <div
              className="glow-dot"
              style={{ top: "28%", left: "26%", backgroundColor: "#CB3CFF" }}
            ></div>{" "}
            {/* US */}
            <div
              className="glow-dot"
              style={{ top: "24%", left: "42%", backgroundColor: "#A3B1FF" }}
            ></div>{" "}
            {/* UK */}
            <div
              className="glow-dot"
              style={{ top: "30%", left: "46%", backgroundColor: "#FFFFFF" }}
            ></div>{" "}
            {/* Europe */}
            <div
              className="glow-dot"
              style={{ top: "42%", left: "55%", backgroundColor: "#A3B1FF" }}
            ></div>{" "}
            {/* India */}
            <div
              className="glow-dot"
              style={{ top: "66%", left: "77%", backgroundColor: "#00C2FF" }}
            ></div>{" "}
            {/* Australia */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
