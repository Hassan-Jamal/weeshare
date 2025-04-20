import React from "react";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // ✅ Make sure this is correct
import { jsPDF } from "jspdf";
import { getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


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

function ExportButton() {
  const handleExport = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const emails = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email) {
          emails.push(data.email);
        }
      });

      // Create PDF
      const doc = new jsPDF();
      doc.text("User Emails List", 10, 10);

      emails.forEach((email, index) => {
        doc.text(`${index + 1}. ${email}`, 10, 20 + index * 10);
      });

      doc.save("user_emails.pdf");
    } catch (error) {
      console.error("Error exporting emails:", error);
    }
  };

  return (
    <button className="export-btn" onClick={handleExport}>
      Export Data ⬇
    </button>
  );
}

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Dashboard = () => {
  const [recentSubscribers, setRecentSubscribers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "subscriptions"), (snapshot) => {
      const recentSubs = snapshot.docs.map(doc => doc.data());
      setRecentSubscribers(recentSubs); // Define this with useState
    });
    return () => unsub();
  }, []);
  
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

const [liveVisits, setLiveVisits] = useState(0);
const [monthlyUsers, setMonthlyUsers] = useState(0);
const [newSignUps, setNewSignUps] = useState(0);
const [subscriptions, setSubscriptions] = useState(0);
const [usersByCountry, setUsersByCountry] = useState({});

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [viewBlogs, setViewBlogs] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => doc.data());
  
      // Assuming usersData is an array of user documents, you can count and calculate your metrics here
      let liveVisitsCount = 0;
      let monthlyUsersCount = 0;
      let newSignUpsCount = 0;
      let subscriptionsCount = 0;
      let countryData = {};
  
      usersData.forEach((user) => {
        if (user.isOnline) liveVisitsCount++;
        if (user.subscription) subscriptionsCount++;
  
        // Assuming user.createdAt is a timestamp of when the user signed up
        const createdAt = user.createdAt?.seconds 
  ? new Date(user.createdAt.seconds * 1000) 
  : new Date(user.createdAt);

if (createdAt.getMonth() === new Date().getMonth()) {
  newSignUpsCount++;
}

  
        // Group users by country
        if (user.country) {
          countryData[user.country] = (countryData[user.country] || 0) + 1;
        }
      });
  
      setLiveVisits(liveVisitsCount);
      setMonthlyUsers(usersData.length);
      setNewSignUps(newSignUpsCount);
      setSubscriptions(subscriptionsCount);
      setUsersByCountry(countryData);
    });
  
    return () => unsub(); // Cleanup on unmount
  }, []);
  
  

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // 🔐 Firebase logout
      navigate("/login");  // ⛳ Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
    };

    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && user.email) {
          setUserEmail(user.email);
        } else {
          setUserEmail("");
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    const userName = userEmail ? userEmail.split("@")[0] : "User";
  

  return (
    <div className="dashboard-wrapper">
      <div className="gradient-bg gradient-bg-top"></div>
      <div className="gradient-bg gradient-bg-bottom"></div>

      <aside className="sidebar">
        <div className="logo-section">
          <img src={weeShareLogo} alt="WeeShare Logo" className="logo-img" />
          <input
            className="search-bar"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="nav-menu">
          <button className="nav-item active">Dashboard</button>
          <button className="nav-item">Notifications</button>
          <button className="nav-item">Users</button>
          <button className="nav-item">Flagged Posts</button>
          <button className="nav-item">Advertisements</button>
          <button
        className="nav-item"
        onClick={() => navigate('/blogs')}
      >
        Blogs
      </button>
        </div>
        <div className="sidebar-button logout-button" onClick={handleLogout}>
      <FiLogOut className="icon" />
      Logout
    </div>
      </aside>

      <main className="main-content">
        <div className="top-header">
        <div>
        <h2>Welcome back, {userName} 👋</h2>

      <p>This is the Admin Dashboard. Track the Analytics here.</p>

      <div style={{ marginTop: "20px" }}>
        <h3>Recent Users</h3>
        
      </div>
    </div>
          <div className="header-actions">
          <ExportButton />
            <button className="create-report">Create report</button>
          </div>
        </div>

        <div className="stats-section">
        <div className="stat-card">
  <div className="stat-label">Live Visits</div>
  <div className="stat-value">{liveVisits}</div>
  <div className="stat-change positive">+12.6%</div>
</div>

<div className="stat-card">
  <div className="stat-label">Monthly Users</div>
  <div className="stat-value">{monthlyUsers}</div>
  <div className="stat-change negative">-16.2%</div>
</div>

<div className="stat-card">
  <div className="stat-label">New Sign Ups</div>
  <div className="stat-value">{newSignUps}</div>
  <div className="stat-change positive">+13.1%</div>
</div>

<div className="stat-card">
  <div className="stat-label">Subscriptions</div>
  <div className="stat-value">{subscriptions}</div>
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
              <ExportButton />
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
                  <h2>12</h2>
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
                  <span className="count">5</span>
                </li>
                <br></br>
                <li>
                  <span className="dot blue"></span>Phone app users{" "}
                  <span className="count">0</span>
                </li>
                <br></br>
                <li>
                  <span className="dot green"></span>Laptop users{" "}
                  <span className="count">7</span>
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
  <h4>Users by Country</h4>
  <p className="total-users">
    {Object.values(usersByCountry).reduce((a, b) => a + b, 0)} users
  </p>
  <ul className="country-list">
  {Object.entries(usersByCountry).map(([country, count]) => {
    const totalUsers = Object.values(usersByCountry).reduce((a, b) => a + b, 0);
    const percentage = (count / totalUsers) * 100;

    // Generate random color for the bar using HSL
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

    return (
      <li key={country} className="country-bar-item">
        <div className="country-label">{country}</div>
        <div className="country-bar-wrapper">
          <div className="country-bar">
            <div
              className="country-bar-fill"
              style={{
                width: `${percentage}%`,
                backgroundColor: randomColor,
              }}
            ></div>
          </div>
          <span className="country-percentage">{Math.round(percentage)}%</span>
        </div>
      </li>
    );
  })}
</ul>


</div>


          <div className="dot-map-container">
            <img src={dotMap} alt="Dotted World Map" className="dot-map-img" />
            {/* Glowing active user points */}
            <div
              className="glow-dot"
              style={{ top: "28%", left: "26%", backgroundColor: "pink" }}
            ></div>{" "}
            {/* US */}
            <div
              className="glow-dot"
              style={{ top: "24%", left: "42%", backgroundColor: "green" }}
            ></div>{" "}
            {/* UK */}
            <div
              className="glow-dot"
              style={{ top: "30%", left: "46%", backgroundColor: "lightgreen" }}
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
