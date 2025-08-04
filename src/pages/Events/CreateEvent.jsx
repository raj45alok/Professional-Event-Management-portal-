import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CreateEvent.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const tabs = ['basic', 'agenda', 'speakers', 'partners', 'videos', 'contact'];
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [confirmed, setConfirmed] = useState({});

  const activeTab = tabs[activeTabIndex];
  const selectedTemplate = localStorage.getItem("selectedTemplate") || "modern";

  const [formData, setFormData] = useState({
  template: selectedTemplate || '',        
  title: '',
  date: '',
  description: '',
  purpose: '',
  bannerImage: '',                         
  agenda: [],
  newAgenda: { time: '', title: '', description: '', speaker: '' },
  speakers: [],
  newSpeaker: { name: '', title: '', image: '' }, 
  partners: [],
  newPartner: { name: '', logo: '' },             
  videos: [],
  newVideo: '',
  contact: {
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    message: ''
  }
});

  const handleConfirm = (tab) => setConfirmed({ ...confirmed, [tab]: true });

  const handleImageUpload = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (key === 'bannerImage') {
        setFormData({ ...formData, bannerImage: reader.result });
      } else if (key === 'newSpeaker') {
        setFormData({ ...formData, newSpeaker: { ...formData.newSpeaker, image: reader.result } });
      } else if (key === 'newPartner') {
        setFormData({ ...formData, newPartner: { ...formData.newPartner, logo: reader.result } });
      }
    };
    reader.readAsDataURL(file);
  };

  const updateContact = (field, value) => {
    setFormData({ ...formData, contact: { ...formData.contact, [field]: value } });
  };

  const addAgendaItem = () => {
    const { newAgenda } = formData;
    if (!newAgenda.time || !newAgenda.title) return;
    setFormData({
      ...formData,
      agenda: [...formData.agenda, newAgenda],
      newAgenda: { time: '', title: '', description: '', speaker: '' }
    });
  };

  const addSpeaker = () => {
    const { newSpeaker } = formData;
    if (!newSpeaker.name || !newSpeaker.title) return;
    setFormData({
      ...formData,
      speakers: [...formData.speakers, newSpeaker],
      newSpeaker: { name: '', title: '', image: null }
    });
  };

  const addPartner = () => {
    const { newPartner } = formData;
    if (!newPartner.name) return;
    setFormData({
      ...formData,
      partners: [...formData.partners, newPartner],
      newPartner: { name: '', logo: null }
    });
  };

  const addVideo = () => {
    if (!formData.newVideo.trim()) return;
    setFormData({
      ...formData,
      videos: [...formData.videos, formData.newVideo.trim()],
      newVideo: ''
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <>
            <h2>Basic Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Event Title</label>
                <input type="text" value={formData.title} disabled={confirmed.basic} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={formData.date} disabled={confirmed.basic} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>
            </div>
            <label>Description</label>
            <textarea value={formData.description} disabled={confirmed.basic} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <label>Purpose</label>
            <input value={formData.purpose} disabled={confirmed.basic} onChange={(e) => setFormData({ ...formData, purpose: e.target.value })} />
            <div className="upload-area">
              <input type="file" disabled={confirmed.basic} onChange={(e) => handleImageUpload(e, 'bannerImage')} />
              <p>Upload Banner</p>
              {formData.bannerImage && <img src={formData.bannerImage} className="preview-image" />}
            </div>
            {!confirmed.basic && <button className="confirm-btn" onClick={() => handleConfirm('basic')}>Confirm Basic Info</button>}
          </>
        );

      case 'agenda':
        return (
          <>
            <h2>Agenda</h2>
            {formData.agenda.map((item, i) => (
              <div key={i} className="form-row confirmed-item">
                <p><strong>{item.time}</strong> — {item.title} | {item.speaker}</p>
                <p>{item.description}</p>
              </div>
            ))}
            <label>Time</label>
            <input value={formData.newAgenda.time} onChange={(e) => setFormData({ ...formData, newAgenda: { ...formData.newAgenda, time: e.target.value } })} />
            <label>Title</label>
            <input value={formData.newAgenda.title} onChange={(e) => setFormData({ ...formData, newAgenda: { ...formData.newAgenda, title: e.target.value } })} />
            <label>Description</label>
            <input value={formData.newAgenda.description} onChange={(e) => setFormData({ ...formData, newAgenda: { ...formData.newAgenda, description: e.target.value } })} />
            <label>Speaker</label>
            <input value={formData.newAgenda.speaker} onChange={(e) => setFormData({ ...formData, newAgenda: { ...formData.newAgenda, speaker: e.target.value } })} />
            <button className="add-btn" onClick={addAgendaItem}>+ Add Agenda</button>
            {!confirmed.agenda && <button className="confirm-btn" onClick={() => handleConfirm('agenda')}>Confirm Agenda</button>}
          </>
        );

      case 'speakers':
        return (
          <>
            <h2>Speakers</h2>
            {formData.speakers.map((sp, i) => (
              <div key={i} className="form-row confirmed-item">
                <p><strong>Speaker {i + 1}:</strong> {sp.name} — {sp.title}</p>
                {sp.image && <img src={sp.image} className="preview-image-small" />}
              </div>
            ))}
            <label>Name</label>
            <input value={formData.newSpeaker.name} onChange={(e) => setFormData({ ...formData, newSpeaker: { ...formData.newSpeaker, name: e.target.value } })} />
            <label>Title</label>
            <input value={formData.newSpeaker.title} onChange={(e) => setFormData({ ...formData, newSpeaker: { ...formData.newSpeaker, title: e.target.value } })} />
            <label>Image</label>
            <input type="file" onChange={(e) => handleImageUpload(e, 'newSpeaker')} />
            <button className="add-btn" onClick={addSpeaker}>+ Add Speaker</button>
            {!confirmed.speakers && <button className="confirm-btn" onClick={() => handleConfirm('speakers')}>Confirm Speakers</button>}
          </>
        );

      case 'partners':
        return (
          <>
            <h2>Partners</h2>
            {formData.partners.map((p, i) => (
              <div key={i} className="form-row confirmed-item">
                <p><strong>Partner {i + 1}:</strong> {p.name}</p>
                {p.logo && <img src={p.logo} className="preview-image-small" />}
              </div>
            ))}
            <label>Partner Name</label>
            <input value={formData.newPartner.name} onChange={(e) => setFormData({ ...formData, newPartner: { ...formData.newPartner, name: e.target.value } })} />
            <label>Logo</label>
            <input type="file" onChange={(e) => handleImageUpload(e, 'newPartner')} />
            <button className="add-btn" onClick={addPartner}>+ Add Partner</button>
            {!confirmed.partners && <button className="confirm-btn" onClick={() => handleConfirm('partners')}>Confirm Partners</button>}
          </>
        );

      case 'videos':
        return (
          <>
            <h2>Event Videos</h2>
            <div className="video-form">
              {formData.videos.map((url, i) => (
                <div key={i} className="video-preview">
                  <iframe width="320" height="180" src={url.replace("watch?v=", "embed/")} allowFullScreen></iframe>
                </div>
              ))}
              <label>Add YouTube Video URL</label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.newVideo}
                onChange={(e) => setFormData({ ...formData, newVideo: e.target.value })}
              />
              <button className="add-btn" onClick={addVideo}>+ Add Video</button>
              {!confirmed.videos && <button className="confirm-btn" onClick={() => handleConfirm('videos')}>Confirm Videos</button>}
            </div>
          </>
        );

      case 'contact':
        return (
          <>
            <h2>Contact Info</h2>
            {Object.keys(formData.contact).map(field => (
              <div key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                {field === 'message' ? (
                  <textarea value={formData.contact[field]} onChange={(e) => updateContact(field, e.target.value)} />
                ) : (
                  <input value={formData.contact[field]} onChange={(e) => updateContact(field, e.target.value)} />
                )}
              </div>
            ))}
            {!confirmed.contact && <button className="confirm-btn" onClick={() => handleConfirm('contact')}>Confirm Contact Info</button>}
          </>
        );

      default:
        return null;
    }
  };
  const submitEvent = async () => {
  try {
    const res = await fetch("https://ur6pe8weml.execute-api.ap-south-1.amazonaws.com/dev/createEvent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await res.json();

    if (res.ok) {
      alert("✅ Event submitted successfully!");
      navigate(`/event/${result.eventId || result.id || 'some-id'}`);
    } else {
      alert("❌ Submission failed. Check your input.");
      console.error(result);
    }
  } catch (err) {
    alert("❌ Network or server error.");
    console.error(err);
  }
};


  return (
    <div className="event-page">
      <div className="event-header">
        <h1>Start Your Event Journey Here</h1>
        <h2>Fill in the details</h2>

        <div className="tab-buttons">
          {tabs.map((tab, i) => (
            <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTabIndex(i)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
          {/* Template and Progress now styled as inline buttons */}
          <button className="tab-meta-btn" disabled>
            Template: <strong>{selectedTemplate}</strong>
          </button>
          <button className="tab-meta-btn" disabled>
            Progress: <strong>{Math.floor((Object.keys(confirmed).length / tabs.length) * 100)}%</strong>
          </button>
        </div>
      </div>

      <div className="event-form">
        {renderTabContent()}

        <div className="navigation-buttons">
          <button className="nav-btn" disabled={activeTabIndex === 0} onClick={() => setActiveTabIndex((prev) => Math.max(prev - 1, 0))}>← Previous</button>
          <button className="nav-btn" disabled={activeTabIndex === tabs.length - 1} onClick={() => setActiveTabIndex((prev) => Math.min(prev + 1, tabs.length - 1))}>Next →</button>
        </div>
{tabs.every(tab => confirmed[tab]) && (
  <div className="form-actions">
    <button className="submit-btn" onClick={submitEvent}>Submit Event</button>
  </div>
)}

        
      </div>
    </div>
  );
};

export default CreateEvent;
