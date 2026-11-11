import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {Button,InputField} from './ui';
import {AIMotion,motionKinds} from './motion';
import {themeVariables} from './tokens';
describe('component contracts',()=>{
 it('prevents submitting forms and repeated actions while loading',()=>{const html=renderToStaticMarkup(<Button loading>Save</Button>);expect(html).toContain('type="button"');expect(html).toContain('disabled=""');expect(html).toContain('aria-busy="true"');});
 it('associates field errors with the input',()=>{const html=renderToStaticMarkup(<InputField id="name" label="Name" error="Enter a name"/>);expect(html).toContain('for="name"');expect(html).toContain('aria-describedby="name-help"');expect(html).toContain('aria-invalid="true"');expect(html).toContain('id="name-help"');});
 it('renders every illustration with unique accessible titles',()=>{const html=renderToStaticMarkup(<>{motionKinds.map(kind=><AIMotion key={kind} kind={kind}/>)}</>);const ids=[...html.matchAll(/<title id="([^"]+)"/g)].map(m=>m[1]);expect(ids).toHaveLength(7);expect(new Set(ids).size).toBe(7);});
 it('maps project overrides into namespaced CSS variables',()=>{expect(themeVariables({azure:'#123456',teal:'#987654'})).toEqual({'--pa-azure':'#123456','--pa-teal':'#987654'});});
});
