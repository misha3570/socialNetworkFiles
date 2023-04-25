import React from "react";
import {
  follow, requestUsers,
  setCurrentPage,
  toggleFollowingProgress,
  unFollow
} from "../../redux/usersReducer";
import {connect} from "react-redux";
import Users from "./Users";
import {Preloader} from "../common/preloader/Preloader";
import {compose} from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../redux/usersSelectors";


class UsersContainer extends React.Component {
  componentDidMount() {
    const {currentPage, pageSize} = this.props
    this.props.requestUsers(currentPage, pageSize)
  }


  onPageChanged = (pageNumber) => {
    const {pageSize} = this.props
    this.props.requestUsers(pageNumber, pageSize)
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader/> : null}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        users={this.props.users}
        onPageChanged={this.onPageChanged}
        follow={this.props.follow}
        unFollow={this.props.unFollow}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}


let mapStateTopProps = state => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
}

export default compose(
  connect(mapStateTopProps,
    {follow, unFollow, setCurrentPage,
      toggleFollowingProgress, requestUsers})
)(UsersContainer)
