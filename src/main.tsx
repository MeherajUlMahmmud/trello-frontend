import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/modal.scss';
import { AuthProvider } from './context/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(<AuthProvider>
	<App />
</AuthProvider>
);
