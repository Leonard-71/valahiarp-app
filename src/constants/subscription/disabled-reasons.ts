import { Reason } from "@/types";

export const SUBSCRIPTION_DISABLED_REASONS: Record<Reason, string> = {
  [Reason.REQUIRES_CODE]: "Necesită cod de acces special",
  [Reason.ONE_PER_CATEGORY]:
    "Ai deja o subscripție activă în această categorie",
  [Reason.ONE_PER_MONTH]: "Poți cumpăra doar o subscripție pe lună",
  [Reason.EXCLUSIVE_TO_OWNER]: "Subscripție exclusivă pentru proprietar",
  [Reason.DEPENDS_ON_PARENT]: "Necesită o subscripție prealabilă",
  [Reason.NOT_AUTHENTICATED]: "Trebuie să te autentifici",
  [Reason.NO_USER_DETAILS]: "Completează datele profilului",
  [Reason.DATABASE_ERROR]: "Eroare temporară. Încearcă din nou",
  [Reason.VALIDATION_ERROR]: "Date invalide",
  [Reason.EXTERNAL_API_ERROR]: "Serviciul este temporar indisponibil",
  [Reason.UNAUTHORIZED_ERROR]: "Nu ai permisiunea necesară",
  [Reason.NOT_FOUND_ERROR]: "Subscripția nu există",
  [Reason.TOO_MANY_REQUESTS_ERROR]: "Prea multe încercări. Încearcă mai târziu",
  [Reason.BUCKET_ERROR]: "Eroare la încărcarea fișierelor",
  [Reason.EMAIL_CONFIG_ERROR]: "Eroare de configurare",
  [Reason.EMAIL_SEND_ERROR]: "Eroare la trimiterea email-ului",
  [Reason.STRIPE_ERROR]: "Eroare la procesarea plății",
  [Reason.CURRENCY_CONVERSION_FAILED]: "Eroare la conversia valutară",
};

export function getSubscriptionDisabledReason(reason?: string | null): string {
  if (!reason) {
    return "Indisponibil pentru cumpărare";
  }

  if (reason in SUBSCRIPTION_DISABLED_REASONS) {
    return SUBSCRIPTION_DISABLED_REASONS[reason as Reason];
  }

  return reason;
}
