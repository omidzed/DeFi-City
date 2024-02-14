import { AppContextValues, AppContext } from '../Components/AppContext';
import { useContext } from 'react';

export function useCoins(): AppContextValues {
	const appContext = useContext(AppContext);
	if (!appContext) {
		throw new Error('useCoins must be used within a CoinProvider');
	}
	return appContext;
}
