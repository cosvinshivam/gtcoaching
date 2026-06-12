import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Save, Plus } from 'lucide-react';

const ContentManager = () => {
  const [contents, setContents] = useState<{section_key: string, content_value: string}[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const fetchContent = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/content/');
      setContents(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (section_key: string, content_value: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.post('http://localhost:8000/api/content/', 
        { section_key, content_value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Saved successfully');
      fetchContent();
    } catch (e) {
      console.error(e);
      alert('Error saving content');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="admin-page-title">Content Manager</h1>
      
      <div className="admin-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#cbd5e1' }}>Add New Content Block</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Key (e.g. hero_title)" 
            className="admin-input" 
            style={{ marginBottom: 0, flex: 1 }}
            value={newKey}
            onChange={e => setNewKey(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Value" 
            className="admin-input" 
            style={{ marginBottom: 0, flex: 2 }}
            value={newValue}
            onChange={e => setNewValue(e.target.value)}
          />
          <button className="admin-btn" onClick={() => handleSave(newKey, newValue)}>
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      <div className="admin-grid">
        {contents.map((item, idx) => (
          <div key={idx} className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{item.section_key}</label>
            <textarea 
              className="admin-input" 
              style={{ minHeight: '100px', resize: 'vertical' }}
              defaultValue={item.content_value}
              onBlur={(e) => handleSave(item.section_key, e.target.value)}
            />
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="admin-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={(e) => {
                const ta = e.currentTarget.previousElementSibling as HTMLTextAreaElement;
                handleSave(item.section_key, ta.value);
              }}>
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContentManager;
