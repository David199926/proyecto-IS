import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CrearActividad from '../CrearActividad';

import { createShallow } from '@material-ui/core/test-utils';

Enzyme.configure({ adapter: new Adapter});

describe("estoy puto", () => {

    const shallow = createShallow()

    const container = shallow(<CrearActividad/>);
    const progress = container.find('[id="progress"]')
    const finalPeriod = container.find('[id="finalPeriod"]')

    it("Progreso inicial en 0", () => {
        expect(progress.props().progress).toBe(0);
    })
    it("periodo final inhabilitado cuando progreso es 0", () => {
        expect(finalPeriod.props().disabled).toBe(true);
    })
    it("periodo final habilitado cuando progreso es 100", () => {
        const input = progress.shallow();
        input.setProgress(100)
        console.log(finalPeriod.props().value)
    })

})