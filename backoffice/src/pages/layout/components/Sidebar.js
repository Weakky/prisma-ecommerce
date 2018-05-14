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
  </div>
);

export default Sidebar;
