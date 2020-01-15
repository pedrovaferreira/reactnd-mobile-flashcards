import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Alert
} from 'react-native'
import { mainColor } from '../utils/colors'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import Question from './Question'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { startQuiz } from '../actions/quiz'

class QuizView extends Component {


    render(){
        const { currentDeck, currentCard,finished, percent} = this.props;
        if(finished){
            return (
                <View style={styles.container}>
                <Text style={styles.itemTitle}>Congratulations</Text>
                <Text style={styles.itemTitle}>You got {percent}% of the questions right</Text>
                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.goBack()}>
                    <Text>Back to Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => this.props.dispatch(startQuiz(currentDeck)) }>
                    <Text>Restart Quiz</Text>
                </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.itemTitle}>{currentDeck.name}</Text>
                <Text style={styles.itemTitle2}>{currentCard}/{currentDeck.cards.length}</Text>
                { currentCard % 2 == 0 &&
                    <Question />
                 }
                 { currentCard % 2 != 0 &&
                     <Question />
                  }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor,
    },
    itemTitleResult: {
        fontFamily: "Nunito-Bold",
        fontSize: 20,
        color: "white",
        width: "80%",
        padding: 16,
        flex: 1
    },
    itemTitle: {
        fontFamily: "Nunito-Bold",
        fontSize: 18,
        color: "white",
        width: "80%",
        padding: 16
    },
    itemTitle2: {
        fontFamily: "Nunito-Bold",
        fontSize: 18,
        color: "white",
        position: "absolute",
        right:0,
        top: 16
    },
    btn: {
        padding: 16,
        borderRadius: 10,
        marginTop: 30,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#fff",
    },
})

function mapStateToProps({ quiz }){
    return {
        hasCurrentQuiz: quiz.deck != undefined,
        currentDeck: quiz.deck,
        currentCard: quiz.currentCard,
        percent: Math.floor((quiz.correct/quiz.deck.cards.length ) * 100),
        finished: quiz.finished
    }
}

export default withNavigation(connect(mapStateToProps)(QuizView))