import React from 'react';
import {Field, reduxForm} from "redux-form";
import {CreateField, Input} from "../common/formsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginAuth} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import s from '../common/formsControls/FormsControls.module.css';


const LoginForm = ({handleSubmit, error, captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
        {CreateField('Login', 'email', [required], Input)}
        {/*<Field validate={[required]} placeholder='login' name={'email'} component={Input}/>*/}

      {CreateField('Password', 'password', [required], Input, {type: 'password'})}
      {CreateField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
      {captchaUrl && <img src={captchaUrl}/>}
      {captchaUrl && CreateField('Symbols from image', 'captcha', [required], Input, {})}
      {/*<div><Field validate={[required]} type='password' placeholder='Password' name={'password'} component={Input}/></div>*/}
      {error && <div className={s.formSummatyError}>{error}</div>}
      {/*<div><Field component={Input} name={'rememberMe'} type={'checkbox'}/></div>*/}
      <div><button>Login</button></div>
    </form>
  )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    let {email, password, rememberMe, captcha} = formData
    props.loginAuth(email, password, rememberMe, captcha)
  }

  if(props.isAuth) {
    return <Navigate to='/profile'/>
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = state => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth
})


const LoginPage = connect(mapStateToProps, {loginAuth})(Login)

export default LoginPage;