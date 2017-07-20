import React from 'react';
import {
  View, StyleSheet, Text
} from 'react-native';

export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Dashboard'
    };
    
    render() {
        const { params } = this.props.navigation.state;
        return (
        <View style={styles.container}>
            <Text>
                Welcome User {params.Access_Token}
            </Text>
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
