import React from 'react';
import {
  View, StyleSheet, Button
} from 'react-native';

export default class App extends React.Component {
    
    render() {
        const { navigate } = this.props.navigation;
        //console.log(navigate);
        return (
        <View style={styles.container}>
            <Button
                title="Login Form"
                onPress={() =>
                navigate('LoginForm')
                }
            />
            <Button
                title="Register Form"
                onPress={() =>
                navigate('RegisterForm')
                }
            />
            <Button
                title="Goto Home"
                onPress={() =>
                navigate('DashBoard')
                }
            />
        </View> 
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC'
    }
});
