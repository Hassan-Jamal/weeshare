import React from "react";
import {
  Line
} from "react-chartjs-2";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import "./dashboard.css";
import weeShareLogo from "../assets/WSR.png";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Dashboard = () => {
    const lineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Total Revenue",
          data: [0, 2, 7, 15, 15.9, 16, 18, 21, 23, 25, 27, 27.8],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#14b8a6",
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBorderColor: "#fff"
        }]
      };

  const lineOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y}K`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#d1d5db"
        }
      },
      x: {
        ticks: {
          color: "#d1d5db"
        }
      }
    }
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
        <div className="logout-button">Logout</div>
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
            <h4>Total revenue</h4>
            <span>Jan 2025 - Dec 2025</span>
          </div>
          <Line data={lineData} options={lineOptions} />
        </div>

        <div className="overview-section">
          <div className="donut-card">
            <h4>Users by device</h4>
            <div className="donut-circle">
              <span className="donut-value">5,643</span>
            </div>
            <ul className="device-list">
              <li><span className="dot desktop"></span>Desktop users - 4,100</li>
              <li><span className="dot phone"></span>Phone users - 643</li>
              <li><span className="dot laptop"></span>Laptop users - 1,000</li>
            </ul>
          </div>

          <div className="recent-table">
            <h4>Recent Subscribers</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Date</th><th>Package</th><th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>John Parker</td><td>May 30</td><td>Premium</td><td>$499</td></tr>
                <tr><td>Christiano</td><td>Dec 29</td><td>Startup</td><td>$89</td></tr>
                <tr><td>Paul</td><td>Dec 28</td><td>Basic</td><td>$100</td></tr>
                <tr><td>Abdullah</td><td>Dec 28</td><td>Standard</td><td>$200</td></tr>
                <tr><td>Boris</td><td>Dec 27</td><td>Standard</td><td>$200</td></tr>
                <tr><td>John Wick</td><td>Dec 26</td><td>Standard</td><td>$200</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="map-section">
          <div className="country-stats">
            <h4>Users by country</h4>
            <p className="total-users">12.4K <span className="positive">+26.9%</span></p>
            <ul>
              <li>United States - 30%</li>
              <li>United Kingdom - 25%</li>
              <li>Canada - 25%</li>
              <li>Australia - 10%</li>
              <li>Spain - 10%</li>
            </ul>
          </div>
          <div className="map">
          <ComposableMap projectionConfig={{ scale: 130 }} style={{ width: "100%", height: "auto" }}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} style={{
                      default: { fill: "#1f1f22", stroke: "#2c2c2e" },
                      hover: { fill: "#3b82f6" }
                    }} />
                  ))
                }
              </Geographies>
              {markers.map(({ name, coordinates }, i) => (
                <Marker key={i} coordinates={coordinates}>
                  <circle r={5} fill="#8b5cf6" stroke="#3b82f6" strokeWidth={2}>
                    <animate attributeName="r" from="4" to="10" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="1" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </Marker>
              ))}
            </ComposableMap>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
