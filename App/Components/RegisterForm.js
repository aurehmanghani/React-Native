import React from 'react';
import {
    Text,
    TextInput,
    TouchableHighlight,
    View,
    StyleSheet, NavigationActions
} from 'react-native';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: []
        };
    }
    async onRegisterPressed() {
        const { navigate } = this.props.navigation;
        try {
            //let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/users',{
            let response = await fetch('http://10.0.10.233:9090/api-react/public/api/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        email: this.state.email,
                        name: this.state.name,
                        password: this.state.password,
                        password_confirmation: this.state.password_confirmation,
                    }
                })
            });
            let accessToken = await response.text();
            console.log(accessToken);
            if (response.status >= 200 && response.status < 300) {
                navigate('DashBoard', { Access_Token: accessToken });
            } else {
                throw errors;
            }
        } catch (errors) {
            let formErrors = JSON.parse(errors);
            let errorsArray = [];

            for (var key in formErrors) {
                if (formErrors[key].length > 1){
                    formErrors[ke].map(error => errorsArray.push(`${key} ${error}`))
                } else {
                    errorsArray.push(`${key} ${formErrors[key]}`);
                }
            }
        }
    }
    /*_navigate() {
        this.props.navigator.push({
            name: 'DashBoard',
        });
    }
    navigateTo = (routeName) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        });
        this.props.navigation.dispatch(resetAction);
    }*/
    render() {
        return (
            <View style={styles.container}>
                <Text>Register</Text>
                <TextInput 
                style={styles.inputField} 
                onChangeText={(val) => this.setState({ email: val })}
                placeholder="Email"
                />
                <TextInput 
                style={styles.inputField}
                onChangeText={(val) => this.setState({ name: val })}
                placeholder="Name"
                />
                <TextInput 
                style={ styles.inputField }
                onChangeText={ (val) => this.setState({ password: val })}
                placeholder="Password" secureTextEntry
                />
                <TextInput 
                style={ styles.inputField }
                onChangeText={ (val) => this.setState({ password_confirmation: val })}
                placeholder="Password Confirmation" secureTextEntry
                />
                <TouchableHighlight style={styles.button} onPress={this.onRegisterPressed.bind(this)}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableHighlight>
                <Errors errors={this.state.errors} />

            </View>        
        );
    }
}

const Errors = (props) => {
    return (
        <View>
            {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        paddingTop: 80,
        backgroundColor: '#F5FCFF'
    },
    inputField: {
        width: 80,
    },
});