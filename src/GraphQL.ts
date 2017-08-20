import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client';
import Vue from 'vue';
import VueApollo from 'vue-apollo';


/**
 * TODO docs
 * Describes vee-validate plugin configuration.
 */
export default class GraphQL {

    /**
     * TODO docs
     * Initialize vee-validate plugin with predefined configuration.
     */
    public static init(): VueApollo {
        const apolloClient = new ApolloClient(this.clientConfig);

        Vue.use(VueApollo);

        return new VueApollo({
            defaultClient: apolloClient,
        });
    }

    /**
     * TODO docs
     * Configuration options of vee-validate plugins.
     *
     * More info: http://vee-validate.logaretm.com/index.html#configuration
     */
    private static readonly clientConfig = {
        connectToDevTools: true,
        dataIdFromObject: (r) => r.id,
        networkInterface: createBatchingNetworkInterface({
            uri: 'http://localhost:3020/graphql',
        }),
    };
}
