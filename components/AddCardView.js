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
import { handleAddCardToDeck } from '../actions/deck'

class AddCardView extends Component {

    state = {
        cardQuestion: '',
        answer: ''
    }

    handleInputChange(text, item){
        this.setState({[item]: text})
    }

    handleAddBtn(){
        const card = {
            question: this.state.cardQuestion,
            answer: this.state.answer
        }
        const { id } = this.props.navigation.state.params;
        this.props.dispatch(handleAddCardToDeck(id, card))
        this.setState({ cardQuestion: '', answer: '' })
        
        this.props.navigation.goBack()
    }
    

    render(){
        const { cardQuestion, answer } = this.state
        const disabled = cardQuestion.length == 0 || answer.length == 0

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Text style={styles.itemTitle}>Add new card</Text>
                <TextInput placeholder="Question" value={cardQuestion} onChangeText={(e) => this.handleInputChange(e, "cardQuestion")} style={styles.input} />
                <TextInput placeholder="Answer" value={answer} onChangeText={(e) => this.handleInputChange(e, "answer")} style={styles.input} />
                <TouchableOpacity 
                        onPress={() => this.handleAddBtn()}
                        style={disabled ? styles.disabledBtn : styles.btn} 
                        disabled={disabled}>
                     <Text>Add</Text>
                   
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
        color: "white",
        width: "80%",
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        backgroundColor: "#fff",
        width: "80%",
        borderRadius: 15,
        padding: 16,
        marginBottom: 24,
        fontSize: 16,
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


export default connect()(AddCardView);