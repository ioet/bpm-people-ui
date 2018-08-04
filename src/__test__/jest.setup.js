import Adapter from 'enzyme-adapter-react-16';
import {
  shallow, render, mount, configure,
} from 'enzyme';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

global.shallow = shallow;

global.render = render;

global.mount = mount;

global.toJson = toJson;
