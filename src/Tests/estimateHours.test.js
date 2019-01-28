import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../components/App';
import * as enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { persistor as initialState} from "../store"
import configureStore from "redux-mock-store"
import { Provider } from 'react-redux';
import estimateHoursData from "./estimateHoursData"
import { getEngineerHours, getEngineerCategoryHours} from "../helper/scopeSummary"

enzyme.configure({ adapter: new ReactSixteenAdapter() });
describe('estimate hour summary', () => {
//   const mockStore = configureStore();
it('should get correct design hours', () => {
    // const component = shallow(<App store={mockStore(initialState)}/>).dive().instance()
    let designHours = 0

    estimateHoursData.map(d => {
        designHours += d["Include in Scope?"] ? Number(d['Design Estimate (Resource Hours)']) : 0;
    })
    let totalDesignHours = Math.round(designHours * 100) / 100
    expect(totalDesignHours).toBe( 977.9 );
  });
  it('should get correct engineer hours', () => {
    let engineerHours = 0;
    

    estimateHoursData.map(d => {
        engineerHours = getEngineerHours(engineerHours, d)
    })
    let totalEngineerHours = Math.round(engineerHours * 100) / 100;
    expect(totalEngineerHours).toBe( 2920.5);
  });
  it('should get correct backend hours', () => {
    let backend = 0;
    let engineerHours = 0;

    estimateHoursData.map(d => {
        backend = getEngineerCategoryHours(engineerHours, backend, d)
    })
    let testHours = Math.round(backend * 100) / 100;
    expect(testHours).toBe( 984.35);
  });
})