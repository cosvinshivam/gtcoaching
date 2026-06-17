import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface SiteContentContextType {
  content: Record<string, string>;
  getContent: (key: string, defaultValue: string) => string;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:8000/api/content/');
      const contentMap: Record<string, string> = {};
      res.data.forEach((item: { section_key: string; content_value: string }) => {
        contentMap[item.section_key] = item.content_value;
      });
      setContent(contentMap);
    } catch (error) {
      console.error('Failed to fetch site content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const getContent = (key: string, defaultValue: string) => {
    return content[key] !== undefined ? content[key] : defaultValue;
  };

  return (
    <SiteContentContext.Provider value={{ content, getContent, isLoading, refreshContent: fetchContent }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (context === undefined) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
