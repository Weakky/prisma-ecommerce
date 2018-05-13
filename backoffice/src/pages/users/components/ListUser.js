import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import ReactTable from 'react-table';
import { ListAllUsersQuery } from '../../../graphql/queries/index';
import { MdRefresh } from 'react-icons/lib/md';
import Buttons from '../../common/components/Buttons';

import '../styles/Listuser.css';
import '../../common/styles/Reactable.css';

class ListUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  async handleRefresh() {
    this.setState({ loading: true });
    await this.props.data.refetch();
    this.setState({ loading: false });
  }

  render() {
    const columns = [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: props => (
          <p className="Reactable-cell" style={{ fontWeight: 'bold' }}>
            {props.value}
          </p>
        ),
        filterable: true,
      },
      {
        Header: 'Name',
        Cell: props => <p className="Reactable-cell">{`${props.original.firstName} ${props.original.lastName.toUpperCase()}`}</p>,
      },
      {
        Header: 'Email',
        accessor: 'email',
        Cell: props => <p className="Reactable-cell">{props.value}</p>,
      },
    ];
    const buttons = [
      {
        color: 'transparent',
        callback: this.handleRefresh,
        icon: <MdRefresh size={18} />,
        label: 'Rafraichir les clients',
      },
    ];
    return (
      <div>
        <Buttons buttons={buttons} />
        <ReactTable
          loadingText="Rafraichissement des données.."
          loading={this.state.loading}
          noDataText="Aucune données"
          data={this.props.data.allCustomers}
          className="animated Reactable-table -highlight"
          columns={columns}
        />
      </div>
    );
  }
}

export default graphql(ListAllUsersQuery)(ListUser);
