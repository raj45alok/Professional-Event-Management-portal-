
import { useState } from 'react';
import { uploadToS3 } from '../../services/aws';

export default function EventForm() {
  const [activeSection, setActiveSection] = useState('basic');
  const [formData, setFormData] = useState({
    template: 'modern', // Default to modern template
    hero: { 
      title: '', 
      date: '', 
      time: '',
      location: '',
      banner: null 
    },
    about: { 
      description: '' 
    },
    speakers: [],
    agenda: [],
    partners: [],
    videos: [],
    contact: { 
      organizer: '', 
      email: '', 
      whatsapp: '' 
    }
  });

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const addSpeaker = () => {
    if (formData.speakers.length >= 4) return;
    setFormData(prev => ({
      ...prev,
      speakers: [...prev.speakers, { 
        name: '', 
        designation: '', 
        photo: null 
      }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bannerUrl = formData.hero.banner 
        ? await uploadToS3(formData.hero.banner) 
        : null;

      const speakerPhotos = await Promise.all(
        formData.speakers.map(speaker => 
          speaker.photo ? uploadToS3(speaker.photo) : null
        )
      );

      console.log('Event created:', {
        ...formData,
        hero: { 
          ...formData.hero, 
          banner: bannerUrl 
        },
        speakers: formData.speakers.map((speaker, i) => ({
          ...speaker,
          photo: speakerPhotos[i]
        }))
      });
      
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event');
    }
  };

  return (
    <div className="event-form-container">
      <h1>Event Details</h1>
      <p className="subtitle">Fill in the information for your event</p>

      <div className="form-layout">
        {/* Left Navigation */}
        <div className="form-navigation">
          <h2>Basic</h2>
          <ul>
            {['basic', 'speakers', 'agenda', 'partners', 'videos', 'contact'].map((section) => (
              <li 
                key={section}
                className={activeSection === section ? 'active' : ''}
                onClick={() => setActiveSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="form-content">
          {/* Basic Section */}
          {activeSection === 'basic' && (
            <>
              <div className="form-group">
                <label>Event Title *</label>
                <input
                  type="text"
                  value={formData.hero.title}
                  onChange={(e) => handleChange('hero', 'title', e.target.value)}
                  placeholder="Enter event title"
                />
                <p className="helper-text">Event organizer</p>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.about.description}
                  onChange={(e) => handleChange('about', 'description', e.target.value)}
                  placeholder="Describe your event"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={formData.hero.date}
                    onChange={(e) => handleChange('hero', 'date', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={formData.hero.time}
                    onChange={(e) => handleChange('hero', 'time', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={formData.hero.location}
                    onChange={(e) => handleChange('hero', 'location', e.target.value)}
                    placeholder="Event location"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Hero Image</label>
                <div className="image-upload">
                  <p>Upload event hero image</p>
                  <p className="small">Drag and drop or click to select</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChange('hero', 'banner', e.target.files[0])}
                  />
                </div>
              </div>
            </>
          )}

          {/* Speakers Section */}
          {activeSection === 'speakers' && (
            <div className="speakers-section">
              <h3>Speakers</h3>
              {formData.speakers.map((speaker, index) => (
                <div key={index} className="speaker-card">
                  <div className="form-group">
                    <label>Speaker Name</label>
                    <input
                      type="text"
                      value={speaker.name}
                      onChange={(e) => {
                        const newSpeakers = [...formData.speakers];
                        newSpeakers[index].name = e.target.value;
                        setFormData(prev => ({ ...prev, speakers: newSpeakers }));
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Speaker Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const newSpeakers = [...formData.speakers];
                        newSpeakers[index].photo = e.target.files[0];
                        setFormData(prev => ({ ...prev, speakers: newSpeakers }));
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addSpeaker}
                disabled={formData.speakers.length >= 4}
                className="add-speaker-btn"
              >
                + Add Speaker
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
