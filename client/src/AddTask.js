import React, { Component } from "react";
import { connect } from "react-redux";
import { addTask } from "./actions";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    const { addTaskVisibleToggle } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      addTaskVisibleToggle();
    }
  };

  handleSubmit = () => {
    const { addTask, stage, addTaskVisibleToggle, cap, tasks } = this.props;
    const len = tasks.filter(t => t.stage === stage).length;
    if (cap === -1 || len <= cap - 1) {
      addTask(this.input.current.value, stage);
    } else {
      alert("Max capacity reached!");
    }
    addTaskVisibleToggle();
  };

  render() {
    const { addTaskVisibleToggle } = this.props;

    return (
      <div style={{ marginTop: "5px" }} ref={this.setWrapperRef}>
        <div>
          <input type="text" ref={this.input} />
        </div>
        <div style={{ marginBottom: "5px" }}>
          <span onClick={this.handleSubmit} className="confirm">
            <i className="fa fa-check" />
          </span>
          <span>&nbsp;</span>
          <span onClick={addTaskVisibleToggle} className="cancel">
            <i className="fa fa-close" />
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
  addTask: (task, stage) => dispatch(addTask(task, stage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTask);
