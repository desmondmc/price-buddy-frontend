import en from './en';
import de from './de';

export default (key) => {
  if (navigator.language.startsWith('de')) {
    return de[key]
  }

  return en[key]
}