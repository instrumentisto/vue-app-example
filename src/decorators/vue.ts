import { createDecorator } from 'vue-class-component';

export const NoCache = createDecorator((options, key) => {
    options.computed[key].cache = false;
});
