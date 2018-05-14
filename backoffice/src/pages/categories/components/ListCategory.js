import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { ListAllCategoriesQuery } from '../../../graphql/queries/index';
import {
  DeleteCategoryMutation,
  DeleteCategoryMutationOptions,
} from '../../../graphql/mutations/index';
import CreateCategory from '../components/CreateCategory';
import Buttons from '../../common/components/Buttons';
import ReactTable from 'react-table';
import { MdRefresh, MdAdd } from 'react-icons/lib/md';
import { MdEdit, MdClose } from 'react-icons/lib/md';
import Modal from 'react-awesome-modal';

import '../styles/ListCategory.css';
import '../../common/styles/Reactable.css';
import { FormattedMessage } from 'react-intl';

class ListCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
      categoryToEdit: null,
    };

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.renderCreateOrEditModal = this.renderCreateOrEditModal.bind(this);
  }

  renderCreateOrEditModal() {
    const { categoryToEdit } = this.state;

    if (categoryToEdit) {
      return (
        <CreateCategory
          closeModal={this.closeCreateModal}
          name={categoryToEdit.name}
          id={categoryToEdit.id}
          editing
        />
      );
    }

    return <CreateCategory closeModal={this.closeCreateModal} />;
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

  closeCreateModal() {
    this.setState({ visible: false, categoryToEdit: null });
    this.props.data.refetch();
  }

  openCreateModal() {
    this.setState({ visible: true });
  }

  async handleRefresh() {
    this.setState({ loading: true });
    await this.props.data.refetch();
    this.setState({ loading: false });
  }

  async handleDelete(id) {
    await this.props.deleteCategory({ categoryId: id });
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
        width: 78,
        Cell: props => (
          <p style={{ textAlign: 'center', margin: 0 }}>
            <span
              className="Reactable-edit"
              onClick={() =>
                this.setState({
                  categoryToEdit: {
                    id: props.original.id,
                    name: props.original.name,
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
        label: <FormattedMessage id="reload_category" />,
      },
      {
        color: 'transparent',
        callback: this.openCreateModal,
        icon: <MdAdd size={18} />,
        label: <FormattedMessage id="add_category" />,
      },
    ];
    return (
      <div>
        {this.renderModal()}
        <Buttons buttons={buttons} />
        <ReactTable
          loadingText={<FormattedMessage id="reloading_data" />}
          loading={this.state.loading || this.props.data.loading}
          noDataText={<FormattedMessage id="no_data" />}
          data={this.props.data.allCategories}
          columns={columns}
          className="animated Reactable-table"
        />
      </div>
    );
  }
}

export default compose(
  graphql(ListAllCategoriesQuery),
  graphql(DeleteCategoryMutation, DeleteCategoryMutationOptions),
)(ListCategory);
