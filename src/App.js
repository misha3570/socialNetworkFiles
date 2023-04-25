import React, {Suspense} from "react";
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {
  Routes, Route, HashRouter, BrowserRouter, Navigate
  // withRouter
} from "react-router-dom";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer, {withRouter} from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import {Preloader} from "./components/common/preloader/Preloader";
import store from "./redux/reduxStore";
// import {withRouter} from "./components/Profile/ProfileContainer";
// const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"))

class App extends React.Component {

  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    console.log(promiseRejectionEvent)
  }
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>

    }
    console.log('render 1')


    return (
      <div className='app-wrapper'>
        <HeaderContainer/>
        <Navbar/>
        <div className='app-wrapper-content'>
          <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path='/dialogs/*' element={<DialogsContainer/>}/>
            {/*<Route path='/profile/*' element={<ProfileContainer />} />*/}
            <Route path="/profile" element={<ProfileContainer/>}>
              <Route path=":userId" element={<ProfileContainer/>}/>
            </Route>
            <Route path='/users' element={<UsersContainer/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path='*' element={<div>404 not fount</div>} />
          </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(
  withRouter,
  // возможно эта строчка очень понадобиться так что нужно сохранить и понять для
  // чего она вообще нужна работает без нее норм
  //withRouter удалил из реакт роутер дом и по этому не работает хотя в димыча в проекте она от туда экспортируется
  // у меня в проекте она сделана лично и экспортируется из профиля контейнера
  connect(mapStateToProps, {initializeApp}),
)(App)

const SamuraiJSApp = props => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  )
}

export default SamuraiJSApp





