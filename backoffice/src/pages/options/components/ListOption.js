import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { ListAllOptionsQuery } from '../../../graphql/queries/index';
import {
  DeleteOptionMutation,
  DeleteOptionMutationOptions,
} from '../../../graphql/mutations/index';
import CreateOption from '../components/CreateOption';
import Buttons from '../../common/components/Buttons';
import ReactTable from 'react-table';
import { MdRefresh, MdAdd } from 'react-icons/lib/md';
import { MdEdit, MdClose } from 'react-icons/lib/md';
import Modal from 'react-awesome-modal';

import '../styles/ListOption.css';
import '../../common/styles/Reactable.css';
import { FormattedMessage } from 'react-intl';

class ListOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
      optionToEdit: null,
    };

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.renderCreateOrEditModal = this.renderCreateOrEditModal.bind(this);
  }

  renderCreateOrEditModal() {
    const { optionToEdit } = this.state;

    if (optionToEdit) {
      return (
        <CreateOption
          closeModal={this.closeCreateModal}
          name={optionToEdit.name}
          id={optionToEdit.id}
          categoryId={optionToEdit.categoryId}
          values={optionToEdit.values}
          editing
        />
      );
    }

    return <CreateOption closeModal={this.closeCreateModal} />;
  }

  renderModal() {
    return (
      <Modal
        visible={this.state.visible}
        width="300"
        height="300"
        effect="fadeInUp"
        onClickAway={() => this.closeCreateModal()}
      >
        {this.renderCreateOrEditModal()}
      </Modal>
    );
  }

  closeCreateModal() {
    this.setState({ visible: false, optionToEdit: null });
    this.props.data.refetch();
  }

  openCreateModal() {
    this.setState({ visible: true });
  }

  async handleRefresh() {
    await this.props.data.refetch();
  }

  async handleDelete(id) {
    await this.props.deleteOption({ optionId: id });
    await this.props.data.refetch();
  }

  render() {
    const columns = [
      {
        Header: <FormattedMessage id="name" />,
        accessor: 'name',
        Cell: props => <p className="Reactable-cell">{props.value}</p>,
        filterable: true,
      },
      {
        Header: <FormattedMessage id="option_values" />,
        accessor: 'values',
        Cell: props => (
          <p className="Reactable-cell" style={{ fontWeight: 'bold' }}>
            {props.value.map(optionValue => (
              <span key={optionValue.id} className="Reactable-vignette">
                {optionValue.name}
              </span>
            ))}
          </p>
        ),
        filterable: true,
      },
      {
        Header: <FormattedMessage id="category" />,
        accessor: 'category.name',
        Cell: props => (
          <p className="Reactable-cell" style={{ fontWeight: 'bold' }}>
            {props.value}
          </p>
        ),
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
                  optionToEdit: {
                    id: props.original.id,
                    name: props.original.name,
                    categoryId: props.original.category && props.original.category.id,
                    values: props.original.values,
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
        label: <FormattedMessage id="reload_option" />,
      },
      {
        color: 'transparent',
        callback: this.openCreateModal,
        icon: <MdAdd size={18} />,
        label: <FormattedMessage id="add_option" />,
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
          data={this.props.data.allOptions}
          columns={columns}
          className="animated Reactable-table"
        />
      </div>
    );
  }
}

export default compose(
  graphql(ListAllOptionsQuery),
  graphql(DeleteOptionMutation, DeleteOptionMutationOptions),
)(ListOption);
