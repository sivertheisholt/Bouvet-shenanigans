export const categories = {
	categories: [
		{
			id: 1,
			name: "funksjonelleFeil",
			displayName: "Funksjonelle Feil",
			description:
				"Omhandler feil eller feilfungerende funksjoner og integrasjonsproblemer.",
			subCategories: [
				{
					id: 1,
					name: "grensesnittFeil",
					displayName: "Grensesnittfeil",
					description: "Feil relatert til brukergrensesnitt og interaksjon.",
				},
				{
					id: 2,
					name: "logikkFeil",
					displayName: "Logikkfeil",
					description: "Feil i programmets logiske flyt eller algoritmer.",
				},
				{
					id: 3,
					name: "integreringsFeil",
					displayName: "Integreringsfeil",
					description: "Problemer med integrasjon mellom forskjellige systemkomponenter.",
				},
			],
		},
		{
			id: 2,
			name: "ytelsesFeil",
			displayName: "Ytelsesfeil",
			description: "Innebærer treg ytelse, lav gjennomstrømning og høyt ressursbruk.",
			subCategories: [
				{
					id: 1,
					name: "tregRespons",
					displayName: "Treg Respons",
					description: "Problemer med langsvarstid og treghet i systemet.",
				},
				{
					id: 2,
					name: "hoyRessursbruk",
					displayName: "Høy Ressursbruk",
					description: "Unormalt høy bruk av systemressurser som CPU eller minne.",
				},
				{
					id: 3,
					name: "gjennomstromningsProblemer",
					displayName: "Gjennomstrømningsproblemer",
					description: "Utfordinger med lav dataflyt gjennom et system.",
				},
			],
		},
		{
			id: 3,
			name: "brukbarhetsFeil",
			displayName: "Brukbarhetsfeil",
			description:
				"Fokuserer på problemer med brukergrensesnittet, dårlig brukeropplevelse og tilgjengelighetsproblemer.",
			subCategories: [
				{
					id: 1,
					name: "UIUoverensstemmelse",
					displayName: "UI Uoverensstemmelse",
					description: "Inkonsistens og problemer i brukergrensesnittet.",
				},
				{
					id: 2,
					name: "dårligNavigasjon",
					displayName: "Dårlig Navigasjon",
					description: "Vanskeligheter med å navigere i applikasjonen.",
				},
				{
					id: 2,
					name: "tilgjengelighetsMangler",
					displayName: "Tilgjengelighetsmangler",
					description: "Mangler i tilgjengelighet for ulike brukergrupper.",
				},
			],
		},
		{
			id: 4,
			name: "sikkerhetsFeil",
			displayName: "Sikkerhetsfeil",
			description:
				"Angår uautorisert tilgang, datasikkerhetsproblemer og manglende overholdelse av sikkerhetsstandarder.",
			subCategories: [
				{
					id: 1,
					name: "uautorisertTilgang",
					displayName: "Uautorisert Tilgang",
					description: "Tilfeller av uautorisert tilgang til systemet.",
				},
				{
					id: 2,
					name: "datatap",
					displayName: "Datatap",
					description: "Risiko eller forekomst av tap av sensitive data.",
				},
				{
					id: 2,
					name: "sikkerhetsstandardMangler",
					displayName: "Sikkerhetsstandard Mangler",
					description: "Mangler i overholdelse av etablerte sikkerhetsstandarder.",
				},
			],
		},
		{
			id: 5,
			name: "pålitelighetsFeil",
			displayName: "Pålitelighetsfeil",
			description:
				"Relatert til hyppige systemkrasjer, datatap eller -inkonsistens, og redundansproblemer.",
			subCategories: [
				{
					id: 1,
					name: "systemKrasj",
					displayName: "Systemkrasj",
					description: "Hyppige systemavbrudd eller krasj.",
				},
				{
					id: 2,
					name: "datatapEllerInkonsistens",
					displayName: "Datatap eller Inkonsistens",
					description: "Problemer med tap eller inkonsistens av data.",
				},
				{
					id: 3,
					name: "redundansMangler",
					displayName: "Redundansmangler",
					description: "Mangler i systemets redundansmekanismer.",
				},
			],
		},
		{
			id: 6,
			name: "nettverksFeil",
			displayName: "Nettverksfeil",
			description:
				"Dekker problemer med nettverkskommunikasjon, tilkoblingsfeil og treg dataoverføring.",
			subCategories: [
				{
					id: 1,
					name: "tilkoblingsfeil",
					displayName: "Tilkoblingsfeil",
					description:
						"Problemer med å etablere eller opprettholde en nettverkstilkobling.",
				},
				{
					id: 2,
					name: "tregDataoverforing",
					displayName: "Treg Dataoverføring",
					description: "Langsom dataoverføring over nettverket.",
				},
				{
					id: 3,
					name: "nettverksKonfigurasjonsfeil",
					displayName: "Nettverkskonfigurasjonsfeil",
					description: "Feil i konfigurasjonen av nettverksinnstillinger.",
				},
			],
		},
		{
			id: 7,
			name: "miljoFeil",
			displayName: "Miljøfeil",
			description:
				"Feil knyttet til operativsystemet, maskinvareinkompatibilitet eller eksterne biblioteker.",
			subCategories: [
				{
					id: 1,
					name: "OSInkompatibilitet",
					displayName: "OS Inkompatibilitet",
					description:
						"Problemer knyttet til inkompatibilitet med visse operativsystemer.",
				},
				{
					id: 2,
					name: "maskinvareProblemer",
					displayName: "Maskinvareproblemer",
					description: "Feil eller problemer knyttet til maskinvare.",
				},
				{
					id: 3,
					name: "eksterneBibliotekerFeil",
					displayName: "Eksterne Biblioteker Feil",
					description: "Problemer som oppstår fra eksterne biblioteker og avhengigheter.",
				},
			],
		},
		{
			id: 8,
			name: "dokumentasjonsFeil",
			displayName: "Dokumentasjonsfeil",
			description:
				"Omhandler manglende eller feilaktig dokumentasjon og bruksanvisninger.",
			subCategories: [
				{
					id: 1,
					name: "manglendeDokumentasjon",
					displayName: "Manglende Dokumentasjon",
					description: "Fravær av nødvendig dokumentasjon.",
				},
				{
					id: 2,
					name: "feilIManualer",
					displayName: "Feil i Manualer",
					description:
						"Feil eller unøyaktigheter i brukermanualer eller hjelpedokumenter.",
				},
				{
					id: 3,
					name: "misvisendeDokumentasjon",
					displayName: "Misvisende Dokumentasjon",
					description: "Dokumentasjon som er uklar eller misvisende.",
				},
			],
		},
		{
			id: 9,
			name: "installasjonsFeil",
			displayName: "Installasjonsfeil",
			description:
				"Problemer relatert til installasjon av software, oppdateringer eller konfigurasjonsendringer.",
			subCategories: [
				{
					id: 1,
					name: "installasjonsProblemer",
					displayName: "Installasjonsproblemer",
					description: "Problemer under installasjonsprosessen.",
				},
				{
					id: 2,
					name: "oppdateringsFeil",
					displayName: "Oppdateringsfeil",
					description: "Problemer med å installere oppdateringer.",
				},
				{
					id: 3,
					name: "konfigurasjonsEndringsFeil",
					displayName: "Konfigurasjonsendringsfeil",
					description: "Feil med konfigurering.",
				},
			],
		},
		{
			id: 10,
			name: "grensesnittFeil",
			displayName: "Grensesnittfeil",
			description:
				"Feil knyttet til brukergrensesnittet, inkludert designproblemer og brukervennlighetsproblemer.",
			subCategories: [
				{
					id: 1,
					name: "designFeil",
					displayName: "Designfeil",
					description: "Problemer relatert til designet av brukergrensesnittet.",
				},
				{
					id: 2,
					name: "brukervennlighetsProblemer",
					displayName: "Brukervennlighetsproblemer",
					description:
						"Problemer som gjør at brukergrensesnittet er vanskelig å bruke eller forstå.",
				},
				{
					id: 3,
					name: "interaksjonsfeil",
					displayName: "Interaksjonsfeil",
					description: "Problemer med hvordan brukeren interagerer med systemet.",
				},
			],
		},
	],
}
