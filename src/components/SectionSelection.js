import React from 'react';
import './SectionSelection.css';

const SectionSelection = ({ sections, onSelectSection }) => {
  return (
    <div className="section-selection">
      <h2>Choose a Section</h2>
      <div className="section-list">
        {sections.map((section, index) => (
          <button
            key={index}
            className="section-btn"
            onClick={() => onSelectSection(section)}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionSelection;