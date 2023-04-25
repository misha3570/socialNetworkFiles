import React, {Component} from 'react';
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {
  getStatus,
  getUserProfile,
  savePhoto,
  saveProfile,
  setUserProfile,
  updateStatus
} from "../../redux/profileReducer";
import {Navigate, useParams} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

export function withRouter(Children) {
  return (props) => {
    const match = {params: useParams()};
    console.log(match)
    return <Children {...props} match={match}/>
  }
}

class ProfileContainer extends Component {

  refreshProfile() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
      if(!userId) {
        return <Navigate to='/login'/>
      }
    }
    this.props.getStatus(userId)
    this.props.getUserProfile(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

let mapStateToProps = state => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default compose(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  // withAuthRedirect
)(ProfileContainer)

// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);