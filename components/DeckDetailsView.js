import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import Deck from './Deck'
import Card from './Card'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { handleDeleteDeck } from '../actions/deck'
import { startQuiz } from '../actions/quiz'
import { deckCreatedRedirected } from '../actions/handleDeckCreated'

class DeckDetails extends Component {

    componentDidMount(){
        this.props.dispatch(deckCreatedRedirected())
    }

    handleDeleteBtn() {
        Alert.alert(
            'Alert',
            'Are you sure you want to delete this deck?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        this.props.navigation.navigate('Home')
                        this.props.dispatch(handleDeleteDeck(this.props.navigation.state.params.id))
                    }
              },
            ],
            { cancelable: true },
        );
    }

    handleQuizStart(){
        this.props.dispatch(startQuiz(this.props.deck))
        this.props.navigation.navigate('Quiz')
    }

    render() {

        const { id } = this.props.navigation.state.params;

        if(!this.props.deck)
            return <View />

        return (
            <View style={styles.container}>
                <Deck style={{ flex: 1 }} id={id} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCard', { id })}>
                    <Card >
                        <Text style={styles.btnTxt}>Add card</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.handleQuizStart()} disabled={this.props.deck.cards.length == 0}>
                    <Card backgroundColor={"black"} >
                        <Text style={[styles.btnTxt, { color: "white" }]}>Start a quiz</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteDeck} onPress={() => this.handleDeleteBtn()} >
                    <Text style={styles.deleteDeckText}>Delete deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnTxt: {
        fontSize: 18
    },
    deleteDeck: {
        alignItems: "center",
        marginTop: 24,
    },
    deleteDeckText: {
        fontFamily: "Nunito-Bold",
        color: "red",
        fontSize: 18
    }
})

function mapStateToProps({ decks }, props){
    return {
         deck : decks[props.navigation.state.params.id]
    }
}

export default withNavigation(connect(mapStateToProps)(DeckDetails))