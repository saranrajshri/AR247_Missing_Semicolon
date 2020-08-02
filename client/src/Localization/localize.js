import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./lang/en"
import hindi from "./lang/hin"
import odia from "./lang/odia"
import gujarati from "./lang/gujarati"
import kannada from "./lang/kannada"
import tamil from "./lang/tamil"
import telugu from "./lang/telugu"
import punjabi from "./lang/punjabi"
import marathi from "./lang/marathi"
import bengali from "./lang/bengali"



// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: english,
  hin: hindi,
  odia: odia,
  gujarati: gujarati,
  kannada:kannada,
  tamil:tamil,
  telugu:telugu,
  punjabi:punjabi,
  marathi:marathi,
  bengali:bengali,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;