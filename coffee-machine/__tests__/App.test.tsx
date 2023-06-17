import { render } from "@testing-library/react";

import App from "../src/apps/App.tsx";

test("Renders main page correctly", () => {
	render(<App />);

	expect(true).toBeTruthy();
});
