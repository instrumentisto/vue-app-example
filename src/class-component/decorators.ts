import Vue, {ComputedOptions} from 'vue';
import { createDecorator } from 'vue-class-component';


/**
 * Custom @NoCache decorator for Vue component properties.
 * It adds support of 'cache' parameter to the computed properties.
 *
 * More info about customer decorators:
 *   https://github.com/vuejs/vue-hot-reload-api
 *
 * More info about caching computed properties:
 *   https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods
 */
export const NoCache = createDecorator((options, key) => {
    (options.computed[key] as ComputedOptions<Vue>).cache = false;
});
