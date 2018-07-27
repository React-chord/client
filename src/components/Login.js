import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  Text,
  Button,
  FormInput,
  FormLabel,
  FormValidationMessage,
  ButtonGroup,
} from 'react-native-elements';
import firebase from 'react-native-firebase'

// import { firebase } from '../helpers/firebase';
import styles from '../styles/styles';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
      fullname: '',
      confirmPass: '',
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
    };
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
    let provider = new firebase.auth.GoogleAuthProvider()
    let result = firebase.auth().
  }

  submit = () => {};

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
          secureTextEntry
        />
        {formValidation.password.message ? (
          <FormValidationMessage>
            {formValidation.password.message}
          </FormValidationMessage>
        ) : null}
        <Button
          title="Login by Google"
          leftIcon={{ type: 'material-community', name: 'google-plus' }}
          containerViewStyle={{ marginBottom: 5 }}
          backgroundColor="#03dac6"
          onPress={this.loginByGoogle}
        />
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
    const { userAction } = this.state;
    const localStyles = StyleSheet.create({
      button: {
        flex: 1,
      },
    });
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View
          style={{
            padding: 10,
            backgroundColor: '#000',
            flexWrap: 'wrap',
          }}
        >
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
          <View>
            {userAction === 'login'
              ? this.renderLoginProperties()
              : this.renderRegisterProperties()}
            <Button title="SUBMIT" backgroundColor="orange" onPress={this.submit} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  null,
  null,
)(Login);
