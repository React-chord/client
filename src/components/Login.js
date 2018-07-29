import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  AsyncStorage,
} from 'react-native';
import {
  Text, Button, FormInput, FormValidationMessage,
} from 'react-native-elements';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import styles from '../styles/styles';
import { userLogin, userRegister } from '../store/actions';

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22262d',
    flexDirection: 'column',
  },
  formContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 200,
    padding: 20,
  },
  button: {
    flex: 1,
  },
});

const placeholderTextColor = 'rgba(255, 255, 255, 1)';
const initialFormState = {
  password: '',
  email: '',
  fullname: '',
  confirmPass: '',
};
class Login extends Component {
  constructor() {
    super();
    this.state = {
      ...initialFormState,
      userAction: 'login',
      formValidation: {
        fullname: {
          status: false,
          message: '',
        },
        email: {
          status: false,
          message: '',
        },
        password: {
          status: false,
          message: '',
        },
        confirmPass: {
          status: false,
          message: '',
        },
      },
      formRules: {
        email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        password: [
          { re: /(?=.*[a-z])/, message: 'password must contain lowercase' },
          { re: /(?=.*[A-Z])/, message: 'password must contain uppercase' },
          { re: /(?=.*[0-9])/, message: 'password must contain numeric' },
          { re: /(?=.{6,})/, message: 'password must be at least 6 characters' },
        ],
      },
      warnForm: false,
    };
  }

  componentWillUpdate() {
    clearTimeout(this._timeout);
  }

  handleChange = name => (val) => {
    switch (name) {
      case 'fullname':
        this.checkFullname(val);
        break;
      case 'email':
        this.checkEmail(val);
        break;
      case 'password':
        this.checkPassword(val);
        break;
      case 'confirmPass':
        this.checkConfirmPass(val);
        break;
      default:
        break;
    }

    this.setState({
      [name]: val,
    });
  };

  checkFullname = (val) => {
    const { formValidation } = this.state;
    const validation = {
      status: !!val,
      message: val ? '' : "Fullname can't be empty",
    };
    if (!val) validation.message = '';
    const newFormValidation = { ...formValidation };
    newFormValidation.fullname = validation;
    this.setState({
      formValidation: newFormValidation,
    });
  };

  checkConfirmPass = (val) => {
    const { password, formValidation } = this.state;
    const status = val === password;
    const validation = {
      status,
      message: status ? '' : 'Password do not match',
    };
    if (!val) validation.message = '';
    const newFormValidation = { ...formValidation };
    newFormValidation.confirmPass = validation;
    this.setState({
      formValidation: newFormValidation,
    });
  };

  checkEmail = (val) => {
    const { formRules, formValidation } = this.state;
    const status = formRules.email.test(val);
    const validation = {
      status,
      message: status ? '' : 'This is not a valid email address',
    };
    if (!val) validation.message = '';
    const newFormValidation = { ...formValidation };
    newFormValidation.email = validation;
    this.setState({
      formValidation: newFormValidation,
    });
  };

  checkPassword = (val) => {
    const { formRules, formValidation } = this.state;
    const validation = {};
    const rules = formRules.password;
    for (let i = 0; i < rules.length; i++) {
      if (!rules[i].re.test(val)) {
        const { message } = rules[i];
        validation.message = message;
        validation.status = false;
        break;
      }
    }
    if (!val) validation.message = '';
    const newFormValidation = { ...formValidation };
    newFormValidation.password = validation;
    this.setState({
      formValidation: newFormValidation,
    });
  };

  changeUserAction = action => () => {
    this.setState({
      userAction: action,
    });
  };

  loginByGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure();
      const user = await GoogleSignin.signIn();
      console.log('====================================');
      console.log('login');
      console.log(user);
      console.log('====================================');
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };

  login = async () => {
    const { email, password, formValidation } = this.state;
    const { login, navigation } = this.props;

    try {
      if (formValidation.email && formValidation.password) {
        const result = await login({ email, password });
        console.log('login result', result);
        await AsyncStorage.setItem('token', result.token);
        navigation.navigate('Profile');
      } else {
        await this.setState({
          ...initialFormState, warnForm: true,
        });
        this._timeout = setTimeout(() => {
          this.setState({ warnForm: false });
        }, 2000);
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  register = async () => {
    const {
      email, password, fullname, formValidation,
    } = this.state;
    const { register } = this.props;

    const isValid = !!Object.keys(formValidation)
      .filter(key => formValidation[key].status === true)[0];

    try {
      if (isValid) {
        await register({ email, password, fullname });
        await this.setState({ userAction: 'login', ...initialFormState });
      } else {
        await this.setState({ ...initialFormState, warnForm: true });
        this._timeout = setTimeout(() => {
          this.setState({ warnForm: false });
        }, 2000);
      }
    } catch (error) {
      console.log('di catch', error);
    }
  }

  submit = () => {
    const { userAction } = this.state;
    if (userAction === 'login') {
      this.login();
    } else {
      this.register();
    }
  };

  renderLoginProperties = () => {
    const { password, email, formValidation } = this.state;
    return (
      <View>
        <FormInput
          containerStyle={styles.formTextContainer}
          inputStyle={styles.formTextInput}
          onChangeText={this.handleChange('email')}
          value={email}
          placeholder="E-mail"
          placeholderTextColor={placeholderTextColor}
          keyboardType="email-address"
          returnKeyType="next"
          autoCorrect={false}
        />
        {formValidation.email.message ? (
          <FormValidationMessage>
            {formValidation.email.message}
          </FormValidationMessage>
        ) : null}
        <FormInput
          containerStyle={styles.formTextContainer}
          inputStyle={styles.formTextInput}
          onChangeText={this.handleChange('password')}
          value={password}
          placeholder="Password"
          placeholderTextColor={placeholderTextColor}
          secureTextEntry
        />
        {formValidation.password.message ? (
          <FormValidationMessage>
            {formValidation.password.message}
          </FormValidationMessage>
        ) : null}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <GoogleSigninButton
            style={{ width: 48, height: 48, marginLeft: 10 }}
            size={GoogleSigninButton.Size.Icon}
            color={GoogleSigninButton.Color.Dark}
          />
          <TouchableNativeFeedback onPress={this.loginByGoogle}>
            <View
              style={{
                flex: 1,
                marginLeft: 0,
                height: 40,
                backgroundColor: 'blue',
                marginTop: 4,
                marginRight: 15,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  lineHeight: 40,
                  color: 'white',
                  fontSize: 16,
                }}
              >
                Sign in by Google
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  };

  renderRegisterProperties = () => {
    const {
      fullname, password, confirmPass, email, formValidation,
    } = this.state;

    return (
      <View>
        <FormInput
          containerStyle={styles.formTextContainer}
          inputStyle={styles.formTextInput}
          onChangeText={this.handleChange('fullname')}
          value={fullname}
          placeholder="Fullname"
          placeholderTextColor={placeholderTextColor}
        />
        {formValidation.fullname.message ? (
          <FormValidationMessage>
            {formValidation.fullname.message}
          </FormValidationMessage>
        ) : null}
        <FormInput
          containerStyle={styles.formTextContainer}
          inputStyle={styles.formTextInput}
          onChangeText={this.handleChange('email')}
          value={email}
          placeholder="E-mail"
          placeholderTextColor={placeholderTextColor}
          keyboardType="email-address"
        />
        {formValidation.email.message ? (
          <FormValidationMessage>
            {formValidation.email.message}
          </FormValidationMessage>
        ) : null}
        <FormInput
          containerStyle={styles.formTextContainer}
          inputStyle={styles.formTextInput}
          onChangeText={this.handleChange('password')}
          value={password}
          placeholder="Password"
          placeholderTextColor={placeholderTextColor}
          secureTextEntry
        />
        {formValidation.password.message ? (
          <FormValidationMessage>
            {formValidation.password.message}
          </FormValidationMessage>
        ) : null}
        <FormInput
          containerStyle={styles.formTextContainer}
          inputStyle={styles.formTextInput}
          onChangeText={this.handleChange('confirmPass')}
          value={confirmPass}
          placeholder="Confirm Password"
          placeholderTextColor={placeholderTextColor}
          secureTextEntry
        />
        {formValidation.confirmPass.message ? (
          <FormValidationMessage>
            {formValidation.confirmPass.message}
          </FormValidationMessage>
        ) : null}
      </View>
    );
  };

  render() {
    const { userAction, warnForm } = this.state;

    return (
      <View style={localStyles.container}>
        {/* <StatusBar barStyle="light-content" /> */}
        <KeyboardAvoidingView behavior="padding" style={localStyles.container}>
          <TouchableWithoutFeedback style={localStyles.container} onPress={Keyboard.dismiss}>
            <View style={localStyles.formContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  containerViewStyle={localStyles.button}
                  title="LOGIN"
                  backgroundColor={userAction !== 'login' ? 'black' : ''}
                  onPress={this.changeUserAction('login')}
                />
                <Button
                  containerViewStyle={localStyles.button}
                  title="REGISTER"
                  backgroundColor={userAction === 'login' ? 'black' : ''}
                  onPress={this.changeUserAction('register')}
                />
              </View>
              <View className="form">
                {userAction === 'login'
                  ? this.renderLoginProperties()
                  : this.renderRegisterProperties()
                }
                {warnForm
                  ? (
                    <FormValidationMessage>
                      Please check your input
                    </FormValidationMessage>
                  )
                  : null
                }
                <Button title="SUBMIT" backgroundColor="orange" onPress={this.submit} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(userLogin(user)),
  register: user => dispatch(userRegister(user)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
