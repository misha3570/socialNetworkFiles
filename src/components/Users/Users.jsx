import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, followingInProgress, follow, unFollow}) => {
  return (
    <div>
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                 totalItemsCount={totalUsersCount} pageSize={pageSize}/>
      {users.map(u => <User
        user={u}
        unFollow={unFollow}
        follow={follow}
        followingInProgress={followingInProgress}
        key={u.id} />
      )}
    </div>
  );
};

export default Users;