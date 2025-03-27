import { dictionary as enDictionary } from "./en"
import { dictionary as esDictionary } from "./es"

const dictionaries = {
  en: enDictionary,
  es: esDictionary,
}

export type Dictionary = typeof enDictionary

export const getDictionary = (locale: string): Dictionary => {
  return dictionaries[locale as keyof typeof dictionaries] || dictionaries.en
}

