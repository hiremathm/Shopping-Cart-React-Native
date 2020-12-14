import React from 'react'
import {Platform} from 'react-native'

import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';

import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'

import HomeStackScreen from '../user/HomeScreen'
import CategoryScreen from '../shop/CategoryScreen'
import Colors from '../../constants/Colors'

import HeaderButton from '../../components/UI/HeaderButton'

const TabScreen = createMaterialTopTabNavigator({
		Electronics: HomeStackScreen,
		"Home & Furniture": CategoryScreen,
		"TV's and Appliences": CategoryScreen,		
		Men: CategoryScreen,
		Women: CategoryScreen,
		"Baby & Kids": CategoryScreen
	},
	{
		tabBarOptions: {
			'scrollEnabled': true,
			pressColor: 5.0,
			pressOpacity: 4.0,
			'tabStyle': {
				width: 100
			},
			indicatorStyle: {
            	backgroundColor: Colors.primary
          	},
			labelStyle: {
				fontSize: 12,
				color: '#000000',
				fontFamily: 'nunito-bold',
				width: 100,
			}, 
			style: {  
				backgroundColor: '#F0F3F4',
			},
		},
	}
)

TabScreen.navigationOptions = (navData) =>{
	return {
		headerTitle: 'ShopNow',
		headerLeft: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
			<Item title = "Menu" iconName = {Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}  onPress = {() => navData.navigation.openDrawer()}/>		
		</HeaderButtons>
	}
}
export default TabScreen;