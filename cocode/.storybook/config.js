import { addDecorator, configure } from '@storybook/react';
import { ThemeDecorator } from '../src/stories/decorators/ThemeDecorator';

addDecorator(ThemeDecorator);
configure(require.context('../src', true, /\.stories\.js$/), module);
