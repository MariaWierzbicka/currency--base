import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe ( 'Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox amount={100} from="PLN" to="USD" />);
  });
  it('should render proper info about conversion when PLN->USD', () => {
    
    const testCases = [
      { amount: '100.00', result: '28.57'},
      { amount: '20.00', result: '5.71'},
      { amount: '200.00', result: '57.14'},
      { amount: '345.00', result: '98.57'},
    ];

    for(let testObj of testCases){
      render(<ResultBox amount={parseInt(testObj.amount)} from="PLN" to="USD" />);

      const output = screen.getByTestId('result-box');

      expect(output).toHaveTextContent(`PLN ${testObj.amount} = $${testObj.result}`);
      cleanup();
    }
  });
  it('should render proper info about conversion when USD->PLN', () => {

    const testCases = [
      { amount: '100.00', result: '350.00'},
      { amount: '24.00', result: '84.00'},
      { amount: '231.00', result: '808.50'},
      { amount: '345.00', result: '1,207.50'},
    ];

    for(let testObj of testCases){
      render(<ResultBox amount={parseInt(testObj.amount)} from="USD" to="PLN" />);

      const output = screen.getByTestId('result-box');

      expect(output).toHaveTextContent(`$${testObj.amount} = PLN ${testObj.result}`);
      cleanup();
    }
  });
  it('should render proper info about conversion when same currency', () => {

    const testCases = [
      { amount: '100.00', result: '100.00'},
      { amount: '24.00', result: '24.00'},
      { amount: '231.00', result: '231.00'},
      { amount: '345.00', result: '345.00'},
    ];

    for(let testObj of testCases){
      render(<ResultBox amount={parseInt(testObj.amount)} from="PLN" to="PLN" />);

      const output = screen.getByTestId('result-box');

      expect(output).toHaveTextContent(`PLN ${testObj.amount} = PLN ${testObj.result}`);
      cleanup();
    };
    for(let testObj of testCases){
      render(<ResultBox amount={parseInt(testObj.amount)} from="USD" to="USD" />);

      const output = screen.getByTestId('result-box');

      expect(output).toHaveTextContent(`$${testObj.amount} = $${testObj.result}`);
      cleanup();
    };
  });
  it('should return "Wrong value..." when input < 0', () => {

    const testCases = [
      { amount: '-100.00'},
      { amount: '-24.00'},
      { amount: '-231.00'},
      { amount: '-345.00'},
    ];

    for(let testObj of testCases){
      render(<ResultBox amount={parseInt(testObj.amount)} from="USD" to="USD" />);

      const output = screen.getByTestId('result-box');
      expect(output).toHaveTextContent('Wrong value...');
      cleanup();
    };
  });
});