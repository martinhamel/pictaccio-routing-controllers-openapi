"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable:no-implicit-dependencies no-submodule-imports
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const lodash_merge_1 = tslib_1.__importDefault(require("lodash.merge"));
const routing_controllers_1 = require("routing-controllers");
const src_1 = require("../src");
const generateSpec_1 = require("../src/generateSpec");
const controllers_1 = require("./fixtures/controllers");
// Construct OpenAPI spec:
const storage = (0, routing_controllers_1.getMetadataArgsStorage)();
const options = {
    controllers: [controllers_1.UsersController, controllers_1.UserPostsController],
    routePrefix: '/api',
};
const routes = (0, src_1.parseRoutes)(storage, options);
describe('index', () => {
    it('generates an OpenAPI spec from routing-controllers metadata', () => {
        // Include component schemas parsed with class-validator-jsonschema:
        const schemas = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)({
            classTransformerMetadataStorage: defaultMetadataStorage,
            refPointerPrefix: '#/components/schemas/',
        });
        const spec = (0, src_1.routingControllersToSpec)(storage, options, {
            components: {
                schemas,
                securitySchemes: {
                    basicAuth: {
                        scheme: 'basic',
                        type: 'http',
                    },
                    bearerAuth: {
                        scheme: 'bearer',
                        type: 'http',
                    },
                },
            },
            info: { title: 'My app', version: '1.2.0' },
        });
        expect(spec).toEqual(require('./fixtures/spec.json'));
    });
    it('parses actions in declared order from controller metadata', () => {
        const actions = routes.map((d) => d.action);
        expect(actions).toEqual([
            {
                method: 'listUsers',
                route: '/',
                target: controllers_1.UsersController,
                type: 'get',
            },
            {
                method: 'listUsersInRange',
                route: '/:from-:to',
                target: controllers_1.UsersController,
                type: 'get',
            },
            {
                method: 'getUser',
                route: '/:userId?',
                target: controllers_1.UsersController,
                type: 'get',
            },
            {
                method: 'createUser',
                route: '/',
                target: controllers_1.UsersController,
                type: 'post',
            },
            {
                method: 'createUserWithType',
                route: '/withType',
                target: controllers_1.UsersController,
                type: 'post',
            },
            {
                method: 'createManyUsers',
                route: '/',
                target: controllers_1.UsersController,
                type: 'put',
            },
            {
                method: 'createNestedUsers',
                route: '/nested',
                target: controllers_1.UsersController,
                type: 'post',
            },
            {
                method: 'createUserPost',
                route: '/:userId/posts',
                target: controllers_1.UsersController,
                type: 'post',
            },
            {
                method: 'deleteUsersByVersion',
                route: '/:version(v?\\d{1}|all)',
                target: controllers_1.UsersController,
                type: 'delete',
            },
            {
                method: 'putUserDefault',
                route: undefined,
                target: controllers_1.UsersController,
                type: 'put',
            },
            {
                method: 'getUserPost',
                route: '/:postId',
                target: controllers_1.UserPostsController,
                type: 'get',
            },
            {
                method: 'patchUserPost',
                route: '/:postId',
                target: controllers_1.UserPostsController,
                type: 'patch',
            },
            {
                method: 'getDefaultPath',
                route: undefined,
                target: controllers_1.RootController,
                type: 'get',
            },
            {
                method: 'getStringPath',
                route: '/stringPath',
                target: controllers_1.RootController,
                type: 'get',
            },
        ]);
    });
    it('gets full OpenAPI-formatted paths', () => {
        const route = (0, lodash_merge_1.default)({}, routes[0]);
        expect((0, src_1.getFullPath)(route)).toEqual('/api/users/');
        route.options.routePrefix = undefined;
        expect((0, src_1.getFullPath)(route)).toEqual('/users/');
        route.controller.route = '';
        expect((0, src_1.getFullPath)(route)).toEqual('/');
        route.action.route = '/all';
        expect((0, src_1.getFullPath)(route)).toEqual('/all');
    });
    it('converts Express paths into OpenAPI paths', () => {
        expect((0, src_1.expressToOpenAPIPath)('')).toEqual('');
        expect((0, src_1.expressToOpenAPIPath)('/')).toEqual('/');
        expect((0, src_1.expressToOpenAPIPath)('123')).toEqual('123');
        expect((0, src_1.expressToOpenAPIPath)('/users')).toEqual('/users');
        expect((0, src_1.expressToOpenAPIPath)('/users/:userId')).toEqual('/users/{userId}');
        expect((0, src_1.expressToOpenAPIPath)('/users/:userId/:from-:to')).toEqual('/users/{userId}/{from}-{to}');
        expect((0, src_1.expressToOpenAPIPath)('/users/:userId/:limit?')).toEqual('/users/{userId}/{limit}');
        expect((0, src_1.expressToOpenAPIPath)('/users/:userId(\\d+)')).toEqual('/users/{userId}');
        expect((0, src_1.expressToOpenAPIPath)('/users/:type(user|admin)')).toEqual('/users/{type}');
    });
    it('gets OpenAPI Operation IDs', () => {
        const route = (0, lodash_merge_1.default)({}, routes[0]);
        expect((0, src_1.getOperationId)(route)).toEqual('UsersController.listUsers');
        route.action.target = class AnotherController {
        };
        route.action.method = 'anotherMethod';
        expect((0, src_1.getOperationId)(route)).toEqual('AnotherController.anotherMethod');
    });
});
describe('getRequestBody', () => {
    it('parse a single `body` metadata item into a single `object` schema', () => {
        const route = routes.find((d) => d.action.method === 'createUser');
        expect(route).toBeDefined();
        expect((0, generateSpec_1.getRequestBody)(route)).toEqual({
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/CreateUserBody',
                    },
                },
            },
            description: 'CreateUserBody',
            required: false,
        });
    });
    it('parse a single `body` metadata item of array type into a single `object` schema', () => {
        const route = routes.find((d) => d.action.method === 'createManyUsers');
        expect(route).toBeDefined();
        expect((0, generateSpec_1.getRequestBody)(route)).toEqual({
            content: {
                'application/json': {
                    schema: {
                        items: {
                            $ref: '#/components/schemas/CreateUserBody',
                        },
                        type: 'array',
                    },
                },
            },
            description: 'CreateUserBody',
            required: true,
        });
    });
    it('parse a single `body-param` metadata item into a single `object` schema', () => {
        const route = routes.find((d) => d.action.method === 'patchUserPost');
        expect(route).toBeDefined();
        expect((0, generateSpec_1.getRequestBody)(route)).toEqual({
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            token: {
                                type: 'string',
                            },
                        },
                        required: [],
                        type: 'object',
                    },
                },
            },
        });
    });
    it('combine multiple `body-param` metadata items into a single `object` schema', () => {
        const route = routes.find((d) => d.action.method === 'putUserDefault');
        expect(route).toBeDefined();
        expect((0, generateSpec_1.getRequestBody)(route)).toEqual({
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            limit: {
                                type: 'number',
                            },
                            query: {
                                $ref: '#/components/schemas/UserQuery',
                            },
                            token: {
                                type: 'string',
                            },
                        },
                        required: ['token'],
                        type: 'object',
                    },
                },
            },
        });
    });
    it('wrap `body` and `body-param` metadata items under a single `allOf` schema', () => {
        const route = routes.find((d) => d.action.method === 'createUserPost');
        expect(route).toBeDefined();
        expect((0, generateSpec_1.getRequestBody)(route)).toEqual({
            content: {
                'application/json': {
                    schema: {
                        allOf: [
                            {
                                $ref: '#/components/schemas/CreatePostBody',
                            },
                            {
                                properties: {
                                    token: {
                                        type: 'string',
                                    },
                                },
                                required: [],
                                type: 'object',
                            },
                        ],
                    },
                },
            },
            description: 'CreatePostBody',
            required: true,
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19fdGVzdHNfXy9pbmRleC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtEQUErRDtBQUMvRCxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQTtBQUMzRSwyRUFBeUU7QUFDekUsd0VBQWlDO0FBQ2pDLDZEQUE0RDtBQUU1RCxnQ0FNZTtBQUNmLHNEQUFvRDtBQUNwRCx3REFJK0I7QUFFL0IsMEJBQTBCO0FBQzFCLE1BQU0sT0FBTyxHQUFHLElBQUEsNENBQXNCLEdBQUUsQ0FBQTtBQUN4QyxNQUFNLE9BQU8sR0FBRztJQUNkLFdBQVcsRUFBRSxDQUFDLDZCQUFlLEVBQUUsaUNBQW1CLENBQUM7SUFDbkQsV0FBVyxFQUFFLE1BQU07Q0FDcEIsQ0FBQTtBQUNELE1BQU0sTUFBTSxHQUFHLElBQUEsaUJBQVcsRUFBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFFNUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDckIsRUFBRSxDQUFDLDZEQUE2RCxFQUFFLEdBQUcsRUFBRTtRQUNyRSxvRUFBb0U7UUFDcEUsTUFBTSxPQUFPLEdBQUcsSUFBQSx5REFBNEIsRUFBQztZQUMzQywrQkFBK0IsRUFBRSxzQkFBc0I7WUFDdkQsZ0JBQWdCLEVBQUUsdUJBQXVCO1NBQzFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sSUFBSSxHQUFHLElBQUEsOEJBQXdCLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRTtZQUN0RCxVQUFVLEVBQUU7Z0JBQ1YsT0FBTztnQkFDUCxlQUFlLEVBQUU7b0JBQ2YsU0FBUyxFQUFFO3dCQUNULE1BQU0sRUFBRSxPQUFPO3dCQUNmLElBQUksRUFBRSxNQUFNO3FCQUNiO29CQUNELFVBQVUsRUFBRTt3QkFDVixNQUFNLEVBQUUsUUFBUTt3QkFDaEIsSUFBSSxFQUFFLE1BQU07cUJB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