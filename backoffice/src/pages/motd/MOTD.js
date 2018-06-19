import React from 'react';
import { FormattedMessage } from 'react-intl';
import { graphql, compose } from 'react-apollo';

import { MotdQuery } from '../../graphql/queries'
import {
  UpdateMotdMutation,
  UpdateMotdMutationOptions
} from '../../graphql/mutations';

import Button from '../common/components/Button';
import { MdSave } from 'react-icons/lib/md/index';

import './MOTD.css';

class MOTD extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      MOTD: ''
    };

    this.updateMOTD = this.updateMOTD.bind(this);
  }

  componentWillReceiveProps({ data }) {
    if (!data.loading) {
      this.setState({
        MOTD: data.me.selectedShop.MOTD || ''
      });
    }
  }

  updateMOTD() {
    this.props.updateMOTD({ MOTD: this.state.MOTD });
  }

  render() {
    return (
      <div className="MOTD-container">
        <label className="MOTD-semi-label">
          <FormattedMessage id="motd" />
          <textarea
            className="MOTD-input"
            value={this.state.MOTD}
            placeholder=""
            onChange={e => this.setState({ MOTD: e.target.value })}>
          </textarea>
        </label>
        <Button
          color="#1abc9c"
          callback={this.updateMOTD}
          icon={<MdSave size={18} />}
          label={<FormattedMessage id="save" />}
        />
      </div>
    );
  }
}

export default compose(
  graphql(MotdQuery),
  graphql(UpdateMotdMutation, UpdateMotdMutationOptions),
)(MOTD)
