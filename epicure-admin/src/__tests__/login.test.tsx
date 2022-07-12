import {render,screen,cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer'
import Navbar from '../Components/Navbar/Navbar';

afterEach(()=>{
    cleanup();
})

test('should be a title',()=>{
    render(<Navbar />);
    const element=screen.getByTestId('test-1');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Epicure-Admin")
})

test('should be a array of dishes',()=>{
    render(<Navbar />);
    const element=screen.getByTestId('test-1');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Epicure-Admin")
})

test('matched snapshot',()=>{
    const tree=renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
})
