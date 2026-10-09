import { Reason } from "@/types";

const ERROR_MESSAGES: Record<Reason, string> = {
  [Reason.DATABASE_ERROR]:
    "Eroare de bază de date. Încercați din nou mai târziu.",
  [Reason.VALIDATION_ERROR]: "Datele introduse nu sunt valide.",
  [Reason.EXTERNAL_API_ERROR]:
    "Eroare de serviciu extern. Încercați din nou mai târziu.",
  [Reason.UNAUTHORIZED_ERROR]:
    "Nu aveți permisiunea necesară pentru această acțiune.",
  [Reason.NOT_FOUND_ERROR]: "Resursa solicitată nu a fost găsită.",
  [Reason.TOO_MANY_REQUESTS_ERROR]:
    "Prea multe cereri. Încercați din nou mai târziu.",
  [Reason.BUCKET_ERROR]: "Eroare la încărcarea fișierelor.",
  [Reason.EMAIL_CONFIG_ERROR]: "Eroare de configurare email.",
  [Reason.EMAIL_SEND_ERROR]: "Eroare la trimiterea email-ului.",
  [Reason.STRIPE_ERROR]: "Eroare de procesare a plății.",
  [Reason.ONE_PER_MONTH]: "Se poate efectua doar o acțiune pe lună.",
  [Reason.ONE_PER_CATEGORY]: "Se poate efectua doar o acțiune pe categorie.",
  [Reason.EXCLUSIVE_TO_OWNER]:
    "Această acțiune este disponibilă doar pentru proprietar.",
  [Reason.REQUIRES_CODE]: "Este necesar un cod pentru această acțiune.",
  [Reason.DEPENDS_ON_PARENT]: "Această acțiune depinde de un element părinte.",
  [Reason.NOT_AUTHENTICATED]: "Trebuie să vă autentificați pentru a continua.",
  [Reason.NO_USER_DETAILS]: "Nu aveți detalii completate",
  [Reason.CURRENCY_CONVERSION_FAILED]:
    "Eroare la conversia valutară. Vă rugăm să încercați din nou.",
};

const ERROR_TITLES: Record<Reason, string> = {
  [Reason.DATABASE_ERROR]: "Eroare de sistem",
  [Reason.VALIDATION_ERROR]: "Date invalide",
  [Reason.EXTERNAL_API_ERROR]: "Eroare de serviciu",
  [Reason.UNAUTHORIZED_ERROR]: "Acces neautorizat",
  [Reason.NOT_FOUND_ERROR]: "Nu a fost găsit",
  [Reason.TOO_MANY_REQUESTS_ERROR]: "Prea multe cereri",
  [Reason.BUCKET_ERROR]: "Eroare fișiere",
  [Reason.EMAIL_CONFIG_ERROR]: "Eroare email",
  [Reason.EMAIL_SEND_ERROR]: "Eroare email",
  [Reason.STRIPE_ERROR]: "Eroare de plată",
  [Reason.ONE_PER_MONTH]: "Limită atinsă",
  [Reason.ONE_PER_CATEGORY]: "Limită atinsă",
  [Reason.EXCLUSIVE_TO_OWNER]: "Acces restricționat",
  [Reason.REQUIRES_CODE]: "Cod necesar",
  [Reason.DEPENDS_ON_PARENT]: "Dependență lipsă",
  [Reason.NOT_AUTHENTICATED]: "Autentificare necesară",
  [Reason.NO_USER_DETAILS]: "Detalii lipsă",
  [Reason.CURRENCY_CONVERSION_FAILED]: "Eroare conversie",
};

export { ERROR_MESSAGES, ERROR_TITLES };
