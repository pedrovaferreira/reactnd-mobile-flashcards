import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import Card from './Card'
import { connect } from 'react-redux'

function Deck(props) {
    if(!props.deck)
        return <ActivityIndicator />
    return (
        <TouchableOpacity disabled={!props.onPress} onPress={props.onPress}>
            <Card>
                <View style={{ height: 20 }} />
                <Text style={styles.deckName}>{props.deck.name}</Text>
                <Text style={styles.cardsNumber}>
                    {props.deck.cards ? props.deck.cards.length : 0 } cards
                    </Text>
                <View style={styles.statusContatainer}>
                    <View style={styles.item}>
                        <Text style={styles.itemTitle}>Cards answered</Text>
                        <Text>{props.deck.answered ? props.deck.answered : 0}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemTitle}>%</Text>
                        <Text>{props.deck.percent ? props.deck.percent: 0}</Text>
                    </View>
                </View>
                <View style={{ height: 20 }} />
            </Card>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    deckName: {
        fontFamily: "Nunito-Bold",
        fontSize: 24
    },
    cardsNumber: {
        fontFamily: "Nunito",
        fontSize: 20
    },
    statusContatainer: {
        flexDirection: "row"
    },
    item: {
        flex: 1,
        alignItems: "center",
        marginTop: 24
    },
    itemTitle: {
        fontFamily: "Nunito-Bold",
        fontSize: 16
    }
})

function mapStateToProps({decks}, props) {
    return {
        deck: decks[props.id]
    }
}

export default connect(mapStateToProps)(Deck)