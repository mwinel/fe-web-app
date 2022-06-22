import { render } from '@testing-library/react';
import Home from '../pages/index';

jest.mock('axios');

describe('Home', () => {
    it('renders Home component', () => {
        render(<Home />);
    });
});
