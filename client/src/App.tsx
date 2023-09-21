import './App.css';
import { Router } from './router/RouterPaths.routes';
import './styles/font.css'
import { UserProvider } from './context';
import { GenresProvider } from './context/GenresContext';
import { UserMusicProvider } from './context/UserMusicContext';
import { QueuePlayerProvider } from './context/QueuePlayerContext';

function App() {

	return (
		<>
				<UserMusicProvider>
			<UserProvider>
					<GenresProvider>
							<QueuePlayerProvider>
								<Router />
							</QueuePlayerProvider>
					</GenresProvider>
			</UserProvider>
				</UserMusicProvider>

		</>
	);
}

export default App;
