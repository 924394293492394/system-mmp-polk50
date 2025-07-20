import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/System.css';

export default function System() {
  const { role, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('');
  const [activeSubtab, setActiveSubtab] = useState('');

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const allTabs = [
    { label: 'полк50', subtabs: ['поле', 'поле', 'поле'] },
    { label: 'полк57', subtabs: ['поле', 'поле', 'поле'] },
    { label: 'общее', subtabs: ['поле', 'поле'] },
    { label: 'база', subtabs: ['поле', 'поле', 'поле'] },
  ];

  if (['бригадир', 'начальник', 'администратор'].includes(role)) {
    allTabs.push({ label: 'табель', subtabs: ['История', 'Текущий месяц'] });
  }

  const currentTab = allTabs.find((t) => t.label === activeTab);

  return (
    <div className="system-wrapper">
      <header className="system-header">
        <div className="logo">(лого) ММП.БЕЛ</div>

        <nav className="main-tabs">
          {allTabs.map((tab) => (
            <button
              key={tab.label}
              className={`tab-btn ${activeTab === tab.label ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.label);
                setActiveSubtab('');
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>Выход</button>
      </header>

      {currentTab && (
        <nav className="sub-tabs">
          {currentTab.subtabs.map((sub) => (
            <button
              key={sub}
              className={`subtab-btn ${activeSubtab === sub ? 'active' : ''}`}
              onClick={() => setActiveSubtab(sub)}
            >
              {sub}
            </button>
          ))}
        </nav>
      )}

      <main className="content-area">
        {activeSubtab ? (
          <h2>Контент: {activeTab} / {activeSubtab}</h2>
        ) : (
          <p>Выберите подраздел для просмотра информации.</p>
        )}
      </main>
    </div>
  );
}