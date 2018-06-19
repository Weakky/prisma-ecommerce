import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import ReactTable from 'react-table';
import { ListAllOrdersQuery } from '../../../graphql/queries';
import { SetOrderAsPreparedMutation, SetOrderAsPreparedMutationOptions } from '../../../graphql/mutations';
import { MdRefresh } from 'react-icons/lib/md';
import Buttons from '../../common/components/Buttons';

import '../styles/Listorder.css';
import '../../common/styles/Reactable.css';

class ListOrder extends Component {
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
        Header: 'Etat',
        accessor: 'orderStatus',
        Cell: props => (
          <p className="Reactable-cell">
            {
              {
                SUBMITTED: 'Nouvelle commande',
                PREPARED: 'Préparée',
                PAID: 'Payée',
              }[props.value]
            }
          </p>
        ),
        filterable: true,
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}
          >
            <option value="">Toutes les commandes</option>
            <option value="SUBMITTED">En cours de paiement</option>
            <option value="PAID">Payée</option>
            <option value="PREPARED">Préparée</option>
          </select>
        ),
      },
      {
        Header: 'Client',
        accessor: 'owner',
        Cell: props => (
          <p className="Reactable-cell">
            {props.value.firstName} {props.value.lastName.toUpperCase()}
          </p>
        ),
        filterable: true,
        filterMethod: (filter, row) => {
          const id = filter.pivotId || filter.id;

          return row[id]
            ? row[id].firstName.toLowerCase().includes(filter.value.toLowerCase()) ||
                row[id].lastName.toLowerCase().includes(filter.value.toLowerCase())
            : true;
        },
      },
      {
        Header: 'Date de creation',
        accessor: 'createdAt',
        Cell: props => <p className="Reactable-cell">{props.value.substring(0, 10)}</p>,
      },
      {
        Header: 'Actions',
        Cell: props => (
          <p style={{ textAlign: 'center', margin: 0 }}>
            {
              props.original.orderStatus === 'PAID' && (
                <span
                  onClick={() => this.props.setOrderAsPrepared({ orderId: props.original.id })}
                  className="Reactable-edit"
                >
                  Set order as prepared
                </span>
              )
            }
          </p>
        )
      }
    ];
    const buttons = [
      {
        color: 'transparent',
        callback: this.handleRefresh,
        icon: <MdRefresh size={18} />,
        label: 'Rafraichir les commandes',
      },
    ];
    return (
      <div>
        <Buttons buttons={buttons} />
        <ReactTable
          loadingText="Rafraichissement des données.."
          loading={this.state.loading}
          noDataText="Aucune données"
          data={this.props.data.allOrders}
          className="animated Reactable-table -highlight"
          columns={columns}
          SubComponent={row => {
            const columns = [
              {
                accessor: 'variant.product.imageUrl',
                Cell: props => (
                  <img
                    className="Reactable-img"
                    alt="product"
                    style={{ height: 60, width: 60 }}
                    src={props.value}
                  />
                ),
              },
              {
                Header: 'Nom',
                accessor: 'variant.product.name',
                Cell: props => <p className="Reactable-cell">{props.value}</p>,
              },
              {
                Header: 'Taxon',
                accessor: 'variant.selectedOptions',
                Cell: props => (
                  <div>
                    { props.value.map((selectedOption) => (
                      <p key={selectedOption.id} className="Reactable-cell">
                        {`${selectedOption.option.name.toUpperCase()}: ${selectedOption.value.name.toUpperCase()}`}
                      </p>
                    ))}
                  </div>
                ),
              },
              {
                Header: 'Quantité',
                accessor: 'quantity',
                Cell: props => <p className="Reactable-cell">{props.value}</p>,
              },
            ];

            return (
              <div className="Reactable-container-subTable">
                <ReactTable
                  className="Reactable-subTable"
                  noDataText="Aucune données"
                  data={row.original.lineItems}
                  columns={columns}
                  defaultPageSize={row.original.lineItems ? row.original.lineItems.length : 0}
                  showPagination={false}
                  sortable={false}
                />
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default compose(
  graphql(ListAllOrdersQuery),
  graphql(SetOrderAsPreparedMutation, SetOrderAsPreparedMutationOptions)
)(ListOrder);
