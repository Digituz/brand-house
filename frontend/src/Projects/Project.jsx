import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Card, Grid, InputLabel, NotificationManager} from '@digituz/react-components';
import RestFlexClient from  '@digituz/rest-flex-client';

class Project extends Component {
  constructor() {
    super();

    this.state = {
      id: null,
      project: {
        createdAt: new Date(),
        title: '',
        description: '',
      }
    };

    this.client = new RestFlexClient('http://localhost:3001/');
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (!id) return;
    const project = (await this.client.get(id));
    this.setState({
      id,
      project,
    });
  }

  updateField(field) {
    return (value) => {
      const project = {
        ...this.state.project,
        [field]: value,
      };

      this.setState({
        project,
      });
    };
  }

  save() {
    if (this.state.id) {
      return this.client.update(this.state.id, this.state.project)
        .then(() => {
          this.props.history.push('/projects');
          NotificationManager.success('Project updated successfully.');
        })
        .catch((err) => {
          if (err.message && typeof err.message === 'string') return NotificationManager.danger(err.message);
          NotificationManager.danger('Something went wrong.');
        });
    }

    this.client.insert(this.state.project)
      .then(() => {
        this.props.history.push('/project');
        NotificationManager.success('Project inserted successfully.');
      })
      .catch((err) => {
        if (err.message && typeof err.message === 'string') return NotificationManager.danger(err.message);
        NotificationManager.danger('Something went wrong.');
      });
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <Card
        title="Projects"
        className="sm-12 md-10 md-pad-1 lg-8 lg-pad-2">
        <Grid>
          <div className="sm-12 md-6">
            <InputLabel
              inputId="date"
              label="Date"
              placeholder="E.g. 25/03/2018"
              value={this.state.project.createdAt}
              onBlur={this.updateField('createdAt')}
              type="date"
            />
          </div>
          <div className="sm-12">
            <InputLabel
              inputId="description"
              label="Description"
              placeholder="E.g. Chilli Beans / Beatles"
              value={this.state.project.title}
              onBlur={this.updateField('title')}
            />
          </div>
          <div className="sm-12">
            <InputLabel
              inputId="description"
              label="Description"
              placeholder="E.g. Sunglasses, shorts, and shirts."
              value={this.state.project.description}
              onBlur={this.updateField('description')}
            />
          </div>
          <div className="sm-12">
            <Button className="margin-right" onClick={() => { this.save() }} text="Save" />
            <Button className="default" onClick={() => { this.goBack() }} text="Return" />
          </div>
        </Grid>
      </Card>
    );
  }
}

export default withRouter(Project);
