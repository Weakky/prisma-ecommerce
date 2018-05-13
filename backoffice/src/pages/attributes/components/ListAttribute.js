import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { MdRefresh, MdAdd } from 'react-icons/lib/md';
import { MdClose, MdEdit } from 'react-icons/lib/md/index';
import ReactTable from 'react-table';
import Modal from 'react-awesome-modal';

import CreateAttribute from './CreateAttribute';
import Buttons from '../../common/components/Buttons';

import '../styles/ListAttributes.css';
import '../../common/styles/Reactable.css';

import { ListAllAttributes } from '../../../graphql/queries/index';
import {
  DeleteAttributeMutation,
  DeleteAttributeMutationOptions,
} from '../../../graphql/mutations/index';
import { FormattedMessage } from 'react-intl';

class ListBrands extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
      editSingleBrand: null,
    };

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.renderCreateOrEditModal = this.renderCreateOrEditModal.bind(this);
  }

  renderModal() {
    return (
      <Modal
        visible={this.state.visible}
        width="300"
        height="230"
        effect="fadeInUp"
        onClickAway={() => this.closeCreateModal()}
      >
        {this.renderCreateOrEditModal()}
      </Modal>
    );
  }

  renderCreateOrEditModal() {
    const { editSingleBrand } = this.state;

    if (editSingleBrand) {
      return (
        <CreateAttribute
          closeModal={this.closeCreateModal}
          value={editSingleBrand.value}
          id={editSingleBrand.id}
          categoryId={editSingleBrand.categoryId}
          editing
        />
      );
    }

    return <CreateAttribute closeModal={this.closeCreateModal} />;
  }

  openCreateModal() {
    this.setState({ visible: true });
  }

  closeCreateModal() {
    this.setState({ visible: false, editSingleBrand: null });
    this.props.data.refetch();
  }

  async handleRefresh() {
    await this.props.data.refetch();
  }

  async handleDelete(id) {
    await this.props.deleteAttribute({ attributeId: id });
    await this.props.data.refetch();
  }

  render() {
    const columns = [
      {
        Header: <FormattedMessage id="value" />,
        accessor: 'value',
        Cell: props => <p className="Reactable-cell">{props.value}</p>,
        filterable: true,
      },
      {
        Header: <FormattedMessage id="category" />,
        accessor: 'category.name',
        Cell: props => <p className="Reactable-cell">{props.value}</p>,
        filterable: true,
      },
      {
        width: 78,
        Cell: props => (
          <p style={{ textAlign: 'center', margin: 0 }}>
            <span
              className="Reactable-edit"
              onClick={() =>
                this.setState({
                  editSingleBrand: {
                    id: props.original.id,
                    value: props.original.value,
                    categoryId: props.original.category && props.original.category.id,
                  },
                  visible: true,
                })
              }
            >
              <MdEdit />
            </span>
          </p>
        ),
      },
      {
        width: 78,
        Cell: props => (
          <p style={{ textAlign: 'center', margin: 0 }}>
            {
              <span
                className="Reactable-delete"
                onClick={() => this.handleDelete(props.original.id)}
              >
                <MdClose />
              </span>
            }
          </p>
        ),
      },
    ];
    const buttons = [
      {
        color: 'transparent',
        callback: this.handleRefresh,
        icon: <MdRefresh size={18} />,
        label: <FormattedMessage id="reload_attribute" />,
      },
      {
        color: 'transparent',
        callback: this.openCreateModal,
        icon: <MdAdd size={18} />,
        label: <FormattedMessage id="add_attribute" />,
      },
    ];
    return (
      <div>
        {this.renderModal()}
        <Buttons buttons={buttons} />
        <ReactTable
          loadingText={<FormattedMessage id="reloading_data" />}
          loading={this.state.loading}
          noDataText={<FormattedMessage id="no_data" />}
          data={this.props.data.allAttributes}
          columns={columns}
          className="animated Reactable-table"
        />
      </div>
    );
  }
}

export default compose(
  graphql(ListAllAttributes),
  graphql(DeleteAttributeMutation, DeleteAttributeMutationOptions),
)(ListBrands);
