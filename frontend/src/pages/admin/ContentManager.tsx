import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Save, Plus } from 'lucide-react';
import { API_URL } from '../../config';

const categories: Record<string, string[]> = {
  "Home / Hero": ['hero_title', 'hero_subtitle', 'hero_btn_text', 'hero_review_text', 'hero_main_img', 'hero_split_img_1', 'hero_split_img_2'],
  "About Page": ['about_heading', 'about_desc', 'about_badge', 'about_cta_title', 'about_hero_img', 'about_stats_img', 'about_stats', 'about_values'],
  "Pricing Page": ['pricing_plans', 'pricing_features', 'pricing_compare_title'],
  "Programs Page": ['programs_badge', 'programs_title', 'programs_desc', 'programs_cta_title', 'programs_cta_desc', 'programs_list'],
  "Coaching Page": ['coaching_hero_img', 'coaching_badge', 'coaching_title', 'coaching_desc', 'coaching_exp_years', 'coaching_exp_label', 'coaching_support_badge', 'coaching_support_title', 'coaching_steps', 'coaching_cta_title', 'coaching_cta_features']
};

const knownKeys = Object.values(categories).flat();

const jsonKeys = [
  'about_stats', 'about_values', 'pricing_plans', 'pricing_features', 'programs_list', 'coaching_steps', 'coaching_cta_features'
];

const ContentField = ({ item, images, onSave }: { item: any, images: any[], onSave: (k: string, v: string) => void }) => {
  const isImage = item.section_key.endsWith('_img');
  const isJson = jsonKeys.includes(item.section_key);
  
  const [val, setVal] = useState(item.content_value);
  const [error, setError] = useState('');

  // Format JSON properly initially
  useEffect(() => {
    if (isJson && item.content_value) {
      try {
        setVal(JSON.stringify(JSON.parse(item.content_value), null, 2));
      } catch (e) {
        setVal(item.content_value);
      }
    } else {
      setVal(item.content_value);
    }
  }, [item.content_value, isJson]);

  const handleSave = () => {
    if (isJson) {
      try {
        const parsed = JSON.parse(val);
        // Save minified version to DB to save space if wanted, or formatted. We'll save minified.
        onSave(item.section_key, JSON.stringify(parsed));
        setError('');
      } catch (e: any) {
        setError('Invalid JSON: ' + e.message);
        return;
      }
    } else {
      onSave(item.section_key, val);
    }
  };

  return (
    <div className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ color: 'var(--color-medium-grey)', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {item.section_key}
      </label>
      
      {isImage ? (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
            {val && <img src={val} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <select 
              className="admin-input" 
              style={{ marginBottom: 0 }}
              value={val}
              onChange={(e) => { setVal(e.target.value); onSave(item.section_key, e.target.value); }}
            >
              <option value="">-- Select an Image from S3 --</option>
              {images.map((img, i) => (
                <option key={i} value={img.url}>{img.filename}</option>
              ))}
            </select>
            <input 
              type="text" 
              className="admin-input" 
              style={{ marginBottom: 0, fontSize: '0.75rem' }} 
              value={val} 
              onChange={e => setVal(e.target.value)} 
              placeholder="Or paste external image URL"
            />
          </div>
        </div>
      ) : (
        <>
          <textarea 
            className="admin-input" 
            style={{ 
              minHeight: isJson ? '200px' : '100px', 
              resize: 'vertical',
              fontFamily: isJson ? 'monospace' : 'inherit',
              borderColor: error ? 'red' : 'var(--color-border)'
            }}
            value={val}
            onChange={e => { setVal(e.target.value); setError(''); }}
            onBlur={handleSave}
            placeholder={isJson ? "[\n  // Valid JSON array or object\n]" : "Enter text content"}
          />
          {error && <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>{error}</div>}
        </>
      )}

      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
        <button className="admin-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={handleSave}>
          <Save size={16} /> Save
        </button>
      </div>
    </div>
  );
};

const ContentManager = () => {
  const [contents, setContents] = useState<{section_key: string, content_value: string}[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [activeCategory, setActiveCategory] = useState("Home / Hero");

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await axios.get(`${API_URL}/images/list`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setImages(res.data);
    } catch (e) {
      console.error("Failed to fetch images", e);
    }
  };

  const fetchContent = async () => {
    try {
      const res = await axios.get(`${API_URL}/content/`);
      
      // Merge DB contents with knownKeys (show empty string for keys not in DB)
      const dbKeys = res.data.map((item: any) => item.section_key);
      const merged = [...res.data];
      
      knownKeys.forEach(key => {
        if (!dbKeys.includes(key)) {
          merged.push({ section_key: key, content_value: '' });
        }
      });
      
      setContents(merged);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchContent();
    fetchImages();
  }, []);

  const handleSave = async (section_key: string, content_value: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.post(`${API_URL}/content/`, 
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
        <h3>Add New Content Block</h3>
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

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
        {Object.keys(categories).map(cat => (
          <button 
            key={cat} 
            className={`admin-btn ${activeCategory === cat ? '' : 'admin-btn-secondary'}`} 
            style={activeCategory === cat ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-dark)', fontWeight: 'bold' } : {}}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
        <button 
          className={`admin-btn ${activeCategory === 'Others' ? '' : 'admin-btn-secondary'}`} 
          style={activeCategory === 'Others' ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-dark)', fontWeight: 'bold' } : {}}
          onClick={() => setActiveCategory('Others')}
        >
          Others
        </button>
      </div>

      <div className="admin-grid">
        {contents.filter(item => {
          if (activeCategory === 'Others') {
            return !knownKeys.includes(item.section_key);
          }
          return categories[activeCategory].includes(item.section_key);
        }).map((item, idx) => (
          <ContentField key={`${item.section_key}-${idx}`} item={item} images={images} onSave={handleSave} />
        ))}
      </div>
    </motion.div>
  );
};

export default ContentManager;
