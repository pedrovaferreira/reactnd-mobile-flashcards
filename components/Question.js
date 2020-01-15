import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Animated,
    TouchableOpacity
} from 'react-native'
import { mainColor } from '../utils/colors'
import Card from './Card'
import { render } from 'react-dom'
import CardFlip from 'react-native-card-flip';
import { connect } from 'react-redux'
import { handleAnswerQuiz } from '../actions/shared'
class Question extends Component {

    handleReponseBtn(answer){
        this.props.dispatch(handleAnswerQuiz(answer, this.props.deck))
    }

    render() {

        if(this.props.finished || !this.props.currentCard)
            return <View />
        return (
            <View style={styles.container}>
                <CardFlip style={styles.container} ref={(card) => this.card = card} >
                <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
                    <Card>
                        <View style={{ height: 50 }} />
                        <Text style={styles.question}>
                            {this.props.currentCard.question}
                        </Text>
                        <View style={{ height: 50 }} />
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
                    <Card>
                        <Text style={styles.question}>
                            {this.props.currentCard.answer}
                        </Text>
                        <TouchableOpacity onPress={() =>  this.handleReponseBtn(true)} style={[styles.btn, { backgroundColor: "#f2d052" }]}>
                            <Text style={{ fontSize: 20 }}> Correct </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>  this.handleReponseBtn(false)} style={[styles.btn, { backgroundColor: "#D4271B" }]}>
                            <Text style={{ fontSize: 20 }}> Incorrect </Text>
                        </TouchableOpacity>
                    </Card>
                </TouchableOpacity>
            </CardFlip>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flipCardBack: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    },

    card: {
        flex: 1,
        width: "100%",
        padding: 0,
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
    },

    question: {
        fontSize: 32,
        textAlign: "center"
    },
    btn: {
        padding: 16,
        borderRadius: 10,
        marginTop: 30,
        width: "80%",
        alignItems: "center"
    }
})

function mapStateToProps({ quiz }){
    return {
        currentCard: quiz.deck.cards[quiz.currentCard],
        deck: quiz.deck,
        finished: quiz.finished
    }
}

export default connect(mapStateToProps)(Question)