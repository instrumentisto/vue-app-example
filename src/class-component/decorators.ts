import Vue, {ComputedOptions} from 'vue';
import { createDecorator } from 'vue-class-component';

export const NoCache = createDecorator((options, key) => {
    (options.computed[key] as ComputedOptions<Vue>).cache = false;
});
