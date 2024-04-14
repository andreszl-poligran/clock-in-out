import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './languages/es.json'
const instance = i18n.createInstance();

instance
    .use(initReactI18next)
    .init({
        debug: import.meta.env.VITE_FRONTEND_URL === 'http://localhost:5173' ? true : false,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            es
        }
    });

export default instance;