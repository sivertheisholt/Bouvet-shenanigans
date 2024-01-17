import React from "react"
import { useGetEmbedToken } from "../Hooks/Api"
import { PowerBIEmbed } from "powerbi-client-react"
import { models } from "powerbi-client"
import "./PowerTestPage.css"

export interface PowerTestPageProps {}

const PowerTestPageComponent = (props: PowerTestPageProps) => {
	let { isLoading, error, data } = useGetEmbedToken()

	if (isLoading) return <></>

	if (error) return <div>data fetch error: {error.message}</div>

	if (data) {
		return (
			<div style={{ height: "980px", width: "100%" }}>
				<PowerBIEmbed
					embedConfig={{
						type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
						id: data.EmbedReport[0].ReportId,
						embedUrl: data.EmbedReport[0].EmbedUrl,
						accessToken: data.EmbedToken.Token,
						tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
						settings: {
							panes: {
								filters: {
									expanded: false,
									visible: false,
								},
							},
							background: models.BackgroundType.Transparent,
						},
					}}
					eventHandlers={
						new Map([
							[
								"loaded",
								function () {
									console.log("Report loaded")
								},
							],
							[
								"rendered",
								function () {
									console.log("Report rendered")
								},
							],
							[
								"error",
								function (event: any) {
									console.log(event.detail)
								},
							],
							["visualClicked", () => console.log("visual clicked")],
							["pageChanged", (event) => console.log(event)],
						])
					}
					cssClassName={"report"}
				/>
			</div>
		)
	}

	return <></>
}

export const PowerTestPage = React.memo(PowerTestPageComponent)
