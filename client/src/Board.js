import React, { Component } from "react";
import { connect } from "react-redux";
import Column from "./Column";
import { init, updateServer } from "./actions";

class Board extends Component {
  state = {
    isLoading: true,
    draggedOverCol: 0
  };

  componentDidMount() {
    const { init } = this.props;
    this.setState({ isLoading: false });
    init();
  }

  // card dragged over a column called by column
  handleOnDragEnter = (e, stageValue) => {
    this.setState({ draggedOverCol: stageValue });
  };

  // card dropped over a column called by card
  handleOnDragEnd = (e, task) => {
    const { draggedOverCol } = this.state;
    const { updateServer, columns, tasks } = this.props;
    const len = tasks.filter(t => t.stage === draggedOverCol).length;
    const cap = columns.filter(
      col => col.stage === this.state.draggedOverCol
    )[0].cap;
    if (!(cap === -1 || len <= cap - 1)) {
      return alert("Max capacity reached!");
    }
    updateServer(task, draggedOverCol);
  };

  render() {
    const { isLoading } = this.state;
    const { columns, tasks } = this.props;

    return isLoading ? (
      <h3>Loading...</h3>
    ) : (
      <div>
        {columns.map(column => (
          <Column
            name={column.name}
            stage={column.stage}
            cap={column.cap}
            tasks={tasks.filter(
              task => parseInt(task.stage, 10) === column.stage
            )}
            onDragEnter={this.handleOnDragEnter}
            onDragEnd={this.handleOnDragEnd}
            key={column.stage}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  columns: state.columns
});

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(init()),
  updateServer: (task, stage) => dispatch(updateServer(task, stage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
