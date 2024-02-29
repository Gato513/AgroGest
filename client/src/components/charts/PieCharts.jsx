import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const size = {
	width: 470,
	height: 250,
};

const PieCharts = ({ data }) => {
	const getArcLabel = (params) => {
		const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
		const percent = params.value / TOTAL;
		return `${(percent * 100).toFixed(0)}%`;
	};

	return (
		<PieChart
			series={[
				{
					arcLabel: getArcLabel,
					innerRadius: 10,
					outerRadius: 100,
					paddingAngle: 0,
					cornerRadius: 10,
					startAngle: -180,
					endAngle: 180,
					/* cx: 151,
					cy: 150, */
					data,
					highlightScope: { faded: "global", highlighted: "item" },
					faded: {
						innerRadius: 30,
						additionalRadius: -30,
						color: "gray",
					},
				},
			]}
			sx={{
				[`& .${pieArcLabelClasses.root}`]: {
					fill: "white",
					fontWeight: "bold",
					fontSize: 13,
				},
			}}
			{...size}
		/>
	);
};

export default PieCharts;
