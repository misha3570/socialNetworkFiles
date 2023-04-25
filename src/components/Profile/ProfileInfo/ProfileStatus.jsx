import React, {Component} from 'react';

class ProfileStatus extends Component {
  state = {
    editMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  }
  deactivateEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateStatus(this.state.status)
  }
  changeStatus = e => {
    this.setState({status: e.target.value})
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.status !== this.props.status) {
      this.setState({                                                            // это сделано что бы после обновления страницы при нажатие на статус он точно был в инпуте иногда бывает профиль уже пришел и страница начинает отображаться а статус еще не пришел и страница начинает отображаться с тем статусом который был при загрузке страницы а потом она не обновляется когда запрос уже отработал
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <div>
        {!this.state.editMode &&
          <div>
            <span onClick={this.activateEditMode}>{this.props.status || 'no status'}</span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input onChange={this.changeStatus} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
          </div>
        }
      </div>
    );
  }
}

export default ProfileStatus;

