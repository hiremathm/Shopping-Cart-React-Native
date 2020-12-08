import React, {useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import ShopNavigator from './ShopNavigator'

const NavigationContainer = () => {
	const isAuth = useSelector(state => !!state.auth.token)
	const navRef = useRef()

	useEffect(() => {
   		 if (!isAuth) {
			console.log("CALLED IN NAVIGATION CONTAINER")
        	navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}))
    	}
  	}, [isAuth]);

	return <ShopNavigator ref = {navRef}/>
}

export default NavigationContainer;