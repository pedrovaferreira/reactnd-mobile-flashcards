import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import Deck from './Deck'
import { mainColor } from '../utils/colors'
import { connect } from 'react-redux'
import { handleInitData } from '../actions/shared'
import { withNavigation } from 'react-navigation'

class Home extends Component{
    
    componentDidMount(){
        
        this.props.dispatch(handleInitData())
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                {Object.keys(this.props.decks).map(key => (
                    <Deck key={key} id={key} onPress={() => this.props.navigation.navigate('DeckDetails', { id: key} )} />
                ))}
                {Object.keys(this.props.decks).length == 0 &&
                <Text style={styles.noDeck}>No decks</Text>
                 }
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor,
    },
    noDeck:{
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginTop: 80
    }
})

function mapStateToProps({decks}){
    return {
        decks
    }
}

export default withNavigation(connect(mapStateToProps)(Home))