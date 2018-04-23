import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Card, Button, DropDown, NotificationManager, Table} from '@digituz/react-components';
import {maskDate} from 'mask-js';
import RestFlexClient from  '@digituz/rest-flex-client';

class Projects extends Component {
  constructor() {
    super();
    this.editProject = this.editProject.bind(this);
    this.state = {
      data: [],
    };

    this.client = new RestFlexClient('http://localhost:3001/');
  }

  editProject(project) {
    this.props.history.push(`/projects/${project._id}`);
  }

  newProject() {
    this.props.history.push('/project');
  }

  deleteProject(project) {
    this.client.remove(project._id)
      .then(() => {
        this.props.history.push('/projects');
        NotificationManager.success('Project removed successfully.');
        this.loadProjects();
      })
      .catch((err) => {
        if (err.message && typeof err.message === 'string') return NotificationManager.danger(err.message);
        NotificationManager.danger('Something went wrong.');
      });
  }

  componentDidMount() {
    this.loadProjects();
  }

  loadProjects() {
    const data = this.client.get();
    this.setState({
      data,
    });
  }

  render() {
    const dateRenderer = (project) => (<span>{maskDate(project.createdAt, 'pt-BR')}</span>);
    const actionRenderer = (project) => {
      const dropDownOptions = [
        { label: 'Edit', default: true, onClick: () => { this.editProject(project) }},
        { label: 'Delete', onClick: () => { this.deleteProject(project) }},
      ];
      return (
        <DropDown options={dropDownOptions} />
      );
    };

    const columns = [
      { title: 'Date', columnClass: 'center', render: dateRenderer },
      { title: 'Description', headerClass: 'hidden-sm', columnClass: 'hidden-sm full-width', property: 'description' },
      { title: 'Actions', columnClass: 'center', render: actionRenderer},
    ];
    return (
      <Card className="sm-12 md-10 md-pad-1 lg-8 lg-pad-2" title="Projects">
        <Button onClick={() => { this.newProject() }} text="New Project" />
        <Table data={this.state.data} columns={columns} />
      </Card>
    );
  }
}

export default withRouter(Projects);
