export type GenerateToken = {
	Type: string
	EmbedReport: [
		{
			ReportId: string
			ReportName: string
			EmbedUrl: string
		}
	]
	EmbedToken: {
		Token: string
		TokenId: string
		Expiration: string
	}
}
