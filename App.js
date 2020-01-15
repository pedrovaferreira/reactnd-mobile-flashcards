import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import HomeView from './components/HomeView'
import QuizView from './components/QuizView'
import DeckDetailsView from './components/DeckDetailsView'
import AddCardView from './components/AddCardView'
import AddDeckView from './components/AddDeckView'
import * as Font from 'expo-font';
import { mainColor } from './utils/colors';
import Constants from 'expo-constants';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/notification'

const Tabs = createBottomTabNavigator({
  Home: {
    screen: HomeView,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeckView,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome  name='plus-square' size={30} color={tintColor} />
    }
  },
},{
  navigationOptions: {
    headerShown: false
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ?  mainColor : "#FFF",
    style: {
      height: 60,
      paddingTop: 8,
      backgroundColor: Platform.OS === 'ios' ? "#fff" : mainColor,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});


const stackNavOptions = {
  headerStyle: {
      backgroundColor: mainColor
  },
  headerTintColor: "white",
  headerTitleStyle: {
      fontSize: 20,
      fontFamily: 'Nunito'
  }
}


const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
      screen: Tabs,
      navigationOptions: {
        headerShown: false
      }
  },
  DeckDetails: {
      screen: DeckDetailsView,
      navigationOptions: stackNavOptions
  },  
  AddCard: {
      screen: AddCardView,
      navigationOptions: stackNavOptions
  },
  Quiz: {
      screen: QuizView,
      navigationOptions: stackNavOptions
  },
}))

const store = createStore(reducer, middleware)

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={mainColor} {...props} />
    </View>
  )
}

export default class App extends Component {

  state = {
    already: false
  }

  componentDidMount() {
    setLocalNotification();

    Font.loadAsync({
      "Nunito": require('./assets/fonts/Nunito-Regular.ttf'),
      "Nunito-Bold": require('./assets/fonts/Nunito-Bold.ttf')
    }).then(_ => this.setState({ already: true }))
  }

  render() {

    if (!this.state.already)
      return <View></View>
    return (
      <Provider store={store}>
        <CustomStatusBar backgroundColor={mainColor} />
        <MainNavigator />
      </Provider>
    );
  }
}

