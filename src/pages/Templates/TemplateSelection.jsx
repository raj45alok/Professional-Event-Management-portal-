import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/TemplateSelection.css"; // <-- we’ll create this next

const TemplateSelection = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("modern");

  const handleContinue = () => {
    localStorage.setItem("selectedTemplate", selected);
    navigate("/create-event");
  };

  return (
    <div className="template-page">
      <header className="template-header">
        <div className="title">Event Management Portal</div>
        <nav className="nav">
          <button className="nav-btn">👥 Events</button>
          <button className="nav-btn primary">+ Create Event</button>
        </nav>
      </header>

      <main className="template-content">
        <button className="back-btn" onClick={() => navigate("/manage-events")}>
          ← Back to Events
        </button>
        <h1 className="heading">Create New Event</h1>
        <p className="subheading">Choose a template to get started</p>

        <div className="template-cards">
          {/* Modern Template */}
          <div
            className={`template-card ${selected === "modern" ? "selected" : ""}`}
            onClick={() => setSelected("modern")}
          >
            <div className="template-top">
              <div className="template-name">Modern</div>
              {selected === "modern" && <span className="recommended">Recommended</span>}
            </div>
            <p className="template-desc">
              Clean, contemporary design with bold typography and vibrant colors
            </p>
            <div className="template-preview modern-preview">Event Title<br />Modern Layout Preview</div>
            <ul className="template-features">
              <li>Gradient backgrounds</li>
              <li>Card-based layout</li>
              <li>Interactive elements</li>
              <li>Mobile-first design</li>
            </ul>
          </div>

          {/* Classic Template */}
          <div
            className={`template-card ${selected === "classic" ? "selected" : ""}`}
            onClick={() => setSelected("classic")}
          >
            <div className="template-top">
              <div className="template-name">Classic</div>
            </div>
            <p className="template-desc">
              Traditional, professional design with elegant typography
            </p>
            <div className="template-preview classic-preview">Event Title<br />Classic Layout Preview</div>
            <ul className="template-features">
              <li>Elegant serif fonts</li>
              <li>Structured layout</li>
              <li>Professional styling</li>
              <li>Timeless design</li>
            </ul>
          </div>
        </div>

        <div className="btn-container">
          <button className="continue-btn" onClick={handleContinue}>
            Continue with Selected Template
          </button>
        </div>
      </main>
    </div>
  );
};

export default TemplateSelection;
