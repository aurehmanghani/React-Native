import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableHighlight, 
    AsyncStorage
} from 'react-native';

const ACCESS_TOKEN = 'access_token';
export default class LoginForm extends React.Component {

    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            errors: '',
            showProgress: false,
            
        };
    }
    
    /*function redirect(props){
        return this.props.navigation('DashBoard');
    }*/

    async onLoginPressed() {    
        this.setState({ showProgress: true });
        try {
            let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    session: {
                        email: this.state.email,
                        password: this.state.password,
                    }
                })
            });
            let res = await response.text();
            if (response.status >= 200 && response.status < 300) {
                this.setState({ error: '' });
                let accessToken = res;
                console.log(accessToken);
                this.storeToken(accessToken);
            } else {
                let error = res;
                throw error;
            }
        } catch (error){
            this.removeToken();
            this.setState({error: error});
            console.log("error: " + error);
            this.setState({ showProgress: false });
        }
    }

    async storeToken(accessToken) {
        try{
            await AsyncStorage.setItem(ACCESS_TOKEN,accessToken);
            this.getToken();
        }catch(error){
            console.log('Something wrong');
        }
    }

    async getToken(accessToken) {
        try{
            let token = await AsyncStorage.getItem(ACCESS_TOKEN,accessToken);
            console.log('token : '+ token);
        }catch(error){
            console.log('Something wrong');
        }
    }
    
    async removeToken(){
        try{
            await AsyncStorage.removeItem(ACCESS_TOKEN,accessToken);
            this.getToken();
        }catch(error){
            console.log('Something wrong');
        }
    }

    /*storeToken(responseData) {
        AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err) => {
        try(err) {
            console.log('an error');
            throw err;
        }
        console.log('success');
        }).catch((err) => {
            console.log("error is :" + err);
        });
    }*/

    render() {
        return (
            <View >
                <Text style={styles.heading}>Login</Text>
                <TextInput 
                style={styles.inputField} 
                onChangeText={(val) => this.setState({ email: val })}
                placeholder="Email"
                />
                <TextInput 
                style={styles.inputField} 
                onChangeText={(val) => this.setState({ password: val })}
                placeholder="Email"
                secureTextEntry
                />
                <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
                <Text style={styles.buttonText}>
                    Login
                </Text>
                </TouchableHighlight>
                <Text style={styles.error}>
                 {this.state.error}
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    heading: {
        color: '#03A9F4',
        fontSize: 20,
    },
});

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});*/