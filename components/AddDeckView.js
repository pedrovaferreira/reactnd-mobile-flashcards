import React, { Component } from 'react'
import { 
    Text, 
    TextInput, 
    StyleSheet, 
    KeyboardAvoidingView, 
    TouchableOpacity,
    ActivityIndicator } from 'react-native'
import { mainColor } from '../utils/colors'
import { connect } from 'react-redux'
import { handleCreateDeck } from '../actions/deck'
import { withNavigation } from 'react-navigation'
class AddDeck extends Component {

    state = {
        deckName: '',
    }

    componentDidUpdate(){
        const { handleDeckCreated } = this.props

        if(handleDeckCreated.redirect){
            console.log( handleDeckCreated.redirect)
            this.props.navigation.navigate('DeckDetails', { id: handleDeckCreated.redirect} )
        }
    }

    handleInputChange(text){
        this.setState({deckName: text})
    }

    handleAddBtn(){
        this.props.dispatch(handleCreateDeck(this.state.deckName))
        // this.props.navigation.navigate('Home')
        this.setState({deckName: ''})
    }
    

    render(){
        const { deckName } = this.state
        const disabled = deckName.length == 0


        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Text style={styles.itemTitle}>What is the title of your new deck?
                </Text>
                <TextInput value={deckName} onChangeText={(e) => this.handleInputChange(e)} style={styles.input} />
                <TouchableOpacity 
                        onPress={() => this.handleAddBtn()}
                        style={disabled ? styles.disabledBtn : styles.btn} 
                        disabled={disabled}>
                     <Text>Create deck</Text>
                   
                </ TouchableOpacity>
            </ KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor,
        justifyContent: "center",
        alignItems: "center"
    },
    itemTitle: {
        fontFamily: "Nunito-Bold",
        fontSize: 24,
        width: "80%",
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        backgroundColor: "#fff",
        width: "80%",
        borderRadius: 15,
        padding: 16,
        fontSize: 26,
    },
    btn: {
        padding: 16,
        borderRadius: 10,
        marginTop: 30,
        width: "80%",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    disabledBtn:{
        padding: 16,
        borderRadius: 10,
        marginTop: 30,
        width: "80%",
        alignItems: "center",
        backgroundColor: "#fff",
        opacity: .75
    },
})


function mapStateToProps({handleDeckCreated}){
    return{
        handleDeckCreated
    }
}

export default withNavigation(connect(mapStateToProps)(AddDeck))