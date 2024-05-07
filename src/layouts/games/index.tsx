import React from "react";

import DashboardLayout from "layouts/system-layouts/DashboardLayout";
import ListGames from "features/list-games";

function Games() {
	return (
		<DashboardLayout>
			<ListGames />
		</DashboardLayout>
	);
}

export default Games;