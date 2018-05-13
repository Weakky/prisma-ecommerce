import React from 'react';
import { TiBackspaceOutline } from 'react-icons/lib/ti';

import '../styles/sidebar.css';
import { FormattedMessage } from 'react-intl';

const Sidebar = props => (
  <div className="Sidebar-container">
    <div className="Sidebar-header">
      <span className="Sidebar-title">Your brand</span>
    </div>
    <div className="Sidebar-nav">{props.children}</div>
    <div onClick={() => props.onUserDisconnected()} className="Sidebar-user">
      <TiBackspaceOutline
        style={{ color: '#CC6155' }}
        size={19}
        className="Sidebar-thumbnail"
      />
      <span className="Sidebar-logout">
        <FormattedMessage id="logout" />
      </span>
    </div>
    <div className="Sidebar-status">
      <a rel="noopener noreferrer" target="_blank" href="https://status.graph.cool/">
        <img
          alt=""
          src={require('../../../assets/img/graphcool.png')}
          className="Sidebar-status-img"
        />
      </a>
      <span className="Sidebar-status-label">
        <FormattedMessage id="services_status" />
      </span>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://localhost:4000"
      >
        <img
          alt=""
          src={require('../../../assets/img/graphql.png')}
          className="Sidebar-status-img"
        />
      </a>
      <span className="Sidebar-status-label">Playground</span>
    </div>
  </div>
);

export default Sidebar;
