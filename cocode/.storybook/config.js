import { addDecorator, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeDecorator } from 'stories/decorators/ThemeDecorator';

addDecorator(withKnobs);
addDecorator(ThemeDecorator);
configure(require.context('../src', true, /\.stories\.js$/), module);
