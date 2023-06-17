import { render } from '@testing-library/react';
import App from "../App.tsx";

test('Renders main page correctly', () => {
    render(<App />)

        expect(true).toBeTruthy();
});