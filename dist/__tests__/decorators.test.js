"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const src_1 = require("../src");
const models_1 = require("./fixtures/models");
describe('decorators', () => {
    let routes;
    beforeEach(() => {
        (0, routing_controllers_1.getMetadataArgsStorage)().reset();
        let UsersController = 
        // @ts-ignore: not referenced
        class UsersController {
            listUsers() {
                return;
            }
            getUser(_userId) {
                return;
            }
            multipleOpenAPIsWithObjectParam() {
                return;
            }
            multipleOpenAPIsWithFunctionParam() {
                return;
            }
            multipleOpenAPIsWithMixedParam() {
                return;
            }
            responseSchemaDefaults() {
                return;
            }
            responseSchemaOptions() {
                return;
            }
            responseSchemaDecorators() {
                return;
            }
            responseSchemaArray() {
                return;
            }
            responseSchemaDecoratorAndSchema() {
                return;
            }
            responseSchemaModelAsString() {
                return;
            }
            responseSchemaNotOverwritingInnerOpenApiDecorator() {
                return;
            }
            responseSchemaNotOverwritingOuterOpenApiDecorator() {
                return;
            }
            responseSchemaNoNoModel() {
                return;
            }
            multipleResponseSchemas() {
                return;
            }
            twoResponseSchemasSameStatusCode() {
                return;
            }
            threeResponseSchemasSameStatusCode() {
                return;
            }
            twoResponseSchemaSameStatusCodeWithOneArraySchema() {
                return;
            }
            fourResponseSchemasMixedStatusCodeWithTwoArraySchemas() {
                return;
            }
        };
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/'),
            (0, src_1.OpenAPI)({
                description: 'List all users',
            }),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "listUsers", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/:userId'),
            (0, src_1.OpenAPI)((source, route) => ({
                ...source,
                tags: [...(0, src_1.getTags)(route), 'custom-tag'],
            })),
            tslib_1.__param(0, (0, routing_controllers_1.Param)('userId')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Number]),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "getUser", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/multipleOpenAPIsWithObjectParam'),
            (0, src_1.OpenAPI)({
                summary: 'Some summary',
                ['x-custom-key']: 'This will be overwritten',
            }),
            (0, src_1.OpenAPI)({
                description: 'Some description',
                ['x-custom-key']: 'Custom value',
            }),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "multipleOpenAPIsWithObjectParam", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/multipleOpenAPIsWithFunctionParam'),
            (0, src_1.OpenAPI)((source, _route) => ({
                ...source,
                summary: 'Some summary',
                'x-custom-key': 10,
            })),
            (0, src_1.OpenAPI)((source, _route) => ({
                ...source,
                description: 'Some description',
                'x-custom-key': source['x-custom-key'] * 2,
            })),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "multipleOpenAPIsWithFunctionParam", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/multipleOpenAPIsWithMixedParam'),
            (0, src_1.OpenAPI)({
                summary: 'Some summary',
                'x-custom-key': 10,
            }),
            (0, src_1.OpenAPI)((source, _route) => ({
                ...source,
                description: 'Some description',
                'x-custom-key': source['x-custom-key'] * 2,
            })),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "multipleOpenAPIsWithMixedParam", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/responseSchemaDefaults'),
            (0, src_1.ResponseSchema)(models_1.ModelDto),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "responseSchemaDefaults", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/responseSchemaOptions'),
            (0, src_1.ResponseSchema)(models_1.ModelDto, {
                contentType: 'text/csv',
                description: 'Bad request',
                statusCode: 400,
            }),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "responseSchemaOptions", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/responseSchemaDecorators'),
            (0, routing_controllers_1.HttpCode)(201),
            (0, routing_controllers_1.ContentType)('application/pdf'),
            (0, src_1.ResponseSchema)(models_1.ModelDto),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "responseSchemaDecorators", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/responseSchemaArray'),
            (0, src_1.ResponseSchema)(models_1.ModelDto, { isArray: true }),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "responseSchemaArray", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/responseSchemaDecoratorAndOptions'),
            (0, routing_controllers_1.HttpCode)(201),
            (0, routing_controllers_1.ContentType)('application/pdf'),
            (0, src_1.ResponseSchema)(models_1.ModelDto, { statusCode: 400, contentType: 'text/csv' }),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "responseSchemaDecoratorAndSchema", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/responseSchemaModelAsString'),
            (0, src_1.ResponseSchema)('MyModelName', {
                contentType: 'text/csv',
                statusCode: 400,
            }),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "responseSchemaModelAsString", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/responseSchemaNotOverwritingInnerOpenApiDecorator'),
            (0, src_1.ResponseSchema)('MyModelName', {
                contentType: 'text/csv',
                statusCode: 400,
            }),
            (0, src_1.OpenAPI)({ description: 'somedescription' }),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "responseSchemaNotOverwritingInnerOpenApiDecorator", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/responseSchemaNotOverwritingOuterOpenApiDecorator'),
            (0, src_1.OpenAPI)({ description: 'somedescription' }),
            (0, src_1.ResponseSchema)('MyModelName', {
                contentType: 'text/csv',
                statusCode: 400,
            }),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "responseSchemaNotOverwritingOuterOpenApiDecorator", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/responseSchemaNoNoModel'),
            (0, src_1.ResponseSchema)('', { statusCode: 400, contentType: 'text/csv' }),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "responseSchemaNoNoModel", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/multipleResponseSchemas'),
            (0, src_1.ResponseSchema)('MySuccessObject', {
                description: 'Some successful response object',
                statusCode: 200,
            }),
            (0, src_1.ResponseSchema)('BadRequestErrorObject', {
                contentType: 'text/html',
                statusCode: 400,
            }),
            (0, src_1.ResponseSchema)('NotFoundErrorObject', {
                contentType: 'text/csv',
                statusCode: 404,
            }),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "multipleResponseSchemas", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/twoResponseSchemaSameStatusCode'),
            (0, src_1.ResponseSchema)('SuccessObject1'),
            (0, src_1.ResponseSchema)('SuccessObject2'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "twoResponseSchemasSameStatusCode", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/threeResponseSchemaSameStatusCode'),
            (0, src_1.ResponseSchema)('SuccessObject1'),
            (0, src_1.ResponseSchema)('SuccessObject2'),
            (0, src_1.ResponseSchema)('SuccessObject3'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "threeResponseSchemasSameStatusCode", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/twoResponseSchemaSameStatusCodeWithOneArraySchema'),
            (0, src_1.ResponseSchema)('SuccessObjects1', { isArray: true }),
            (0, src_1.ResponseSchema)('SuccessObject2'),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "twoResponseSchemaSameStatusCodeWithOneArraySchema", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/fourResponseSchemasMixedStatusCodeWithTwoArraySchemas'),
            (0, src_1.ResponseSchema)('SuccessObjects1', { isArray: true }),
            (0, src_1.ResponseSchema)('CreatedObject2', { statusCode: 201 }),
            (0, src_1.ResponseSchema)('CreatedObjects3', { statusCode: 201, isArray: true }),
            (0, src_1.ResponseSchema)('BadRequestObject4', { statusCode: 400 }),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "fourResponseSchemasMixedStatusCodeWithTwoArraySchemas", null);
        UsersController = tslib_1.__decorate([
            (0, routing_controllers_1.JsonController)('/users')
            // @ts-ignore: not referenced
        ], UsersController);
        let UsersHtmlController = 
        // @ts-ignore: not referenced
        class UsersHtmlController {
            responseSchemaDefaultsHtml() {
                return;
            }
        };
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/responseSchemaDefaultsHtml'),
            (0, src_1.ResponseSchema)(models_1.ModelDto),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersHtmlController.prototype, "responseSchemaDefaultsHtml", null);
        UsersHtmlController = tslib_1.__decorate([
            (0, routing_controllers_1.Controller)('/usershtml')
            // @ts-ignore: not referenced
        ], UsersHtmlController);
        routes = (0, src_1.parseRoutes)((0, routing_controllers_1.getMetadataArgsStorage)()).reduce((acc, route) => {
            acc[route.action.method] = route;
            return acc;
        }, {});
    });
    it('merges keywords defined in @OpenAPI decorator into operation', () => {
        const operation = (0, src_1.getOperation)(routes.listUsers, {});
        expect(operation.description).toEqual('List all users');
    });
    it('applies @OpenAPI decorator function parameter to operation', () => {
        const operation = (0, src_1.getOperation)(routes.getUser, {});
        expect(operation.tags).toEqual(['Users', 'custom-tag']);
    });
    it('merges consecutive @OpenAPI object parameters top-down', () => {
        const operation = (0, src_1.getOperation)(routes.multipleOpenAPIsWithObjectParam, {});
        expect(operation.summary).toEqual('Some summary');
        expect(operation.description).toEqual('Some description');
        expect(operation['x-custom-key']).toEqual('Custom value');
    });
    it('applies consecutive @OpenAPI function parameters top-down', () => {
        const operation = (0, src_1.getOperation)(routes.multipleOpenAPIsWithFunctionParam, {});
        expect(operation.summary).toEqual('Some summary');
        expect(operation.description).toEqual('Some description');
        expect(operation['x-custom-key']).toEqual(20);
    });
    it('merges and applies consecutive @OpenAPI object and function parameters top-down', () => {
        const operation = (0, src_1.getOperation)(routes.multipleOpenAPIsWithMixedParam, {});
        expect(operation.summary).toEqual('Some summary');
        expect(operation.description).toEqual('Some description');
        expect(operation['x-custom-key']).toEqual(20);
    });
    it('applies @ResponseSchema merging in response schema into source metadata', () => {
        const operation = (0, src_1.getOperation)(routes.responseSchemaDefaults, {});
        // ensure other metadata doesnt get overwritten by decorator
        expect(operation.operationId).toEqual('UsersController.responseSchemaDefaults');
    });
    it('applies @ResponseSchema using default contentType and statusCode', () => {
        const operation = (0, src_1.getOperation)(routes.responseSchemaDefaults, {});
        expect(operation.responses).toEqual({
            '200': {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ModelDto',
                        },
                    },
                },
                description: '',
            },
        });
    });
    it('applies @ResponseSchema using contentType and statusCode from options object', () => {
        const operation = (0, src_1.getOperation)(routes.responseSchemaOptions, {});
        expect(operation.responses).toEqual({
            '200': {
                content: {
                    'application/json': {},
                },
                description: 'Successful response',
            },
            '400': {
                content: {
                    'text/csv': {
                        schema: {
                            $ref: '#/components/schemas/ModelDto',
                        },
                    },
                },
                description: 'Bad request',
            },
        });
    });
    it('applies @ResponseSchema using contentType and statusCode from decorators', () => {
        const operation = (0, src_1.getOperation)(routes.responseSchemaDecorators, {});
        expect(operation.responses['201'].content['application/pdf']).toEqual({
            schema: { $ref: '#/components/schemas/ModelDto' },
        });
    });
    it('applies @ResponseSchema using isArray flag set to true', () => {
        const operation = (0, src_1.getOperation)(routes.responseSchemaArray, {});
        expect(operation.responses['200'].content['application/json']).toEqual({
            schema: {
                items: {
                    $ref: '#/components/schemas/ModelDto',
                },
                type: 'array',
            },
        });
    });
    it('applies @ResponseSchema using contentType and statusCode from options object, overruling options from RC decorators', () => {
        const operation = (0, src_1.getOperation)(routes.responseSchemaDecoratorAndSchema, {});
        expect(operation.responses).toEqual({
            '201': {
                content: {
                    'application/pdf': {},
                },
                description: 'Successful response',
            },
            '400': {
                content: {
                    'text/csv': {
                        schema: { $ref: '#/components/schemas/ModelDto' },
                    },
                },
                description: '',
            },
        });
    });
    it('applies @ResponseSchema using a string as ModelName', () => {
        const operation = (0, src_1.getOperation)(routes.responseSchemaModelAsString, {});
        expect(operation.responses).toEqual({
            '200': {
                content: {
                    'application/json': {},
                },
                description: 'Successful response',
            },
            '400': {
                content: {
                    'text/csv': {
                        schema: { $ref: '#/components/schemas/MyModelName' },
                    },
                },
                description: '',
            },
        });
    });
    it('applies @ResponseSchema while retaining inner OpenAPI decorator', () => {
        const operation = (0, src_1.getOperation)(routes.responseSchemaNotOverwritingInnerOpenApiDecorator, {});
        expect(operation.description).toEqual('somedescription');
        expect(operation.responses).toEqual({
            '200': {
                content: {
                    'application/json': {},
                },
                description: 'Successful response',
            },
            '400': {
                content: {
                    'text/csv': {
                        schema: { $ref: '#/components/schemas/MyModelName' },
                    },
                },
                description: '',
            },
        });
    });
    it('applies @ResponseSchema while retaining outer OpenAPI decorator', () => {
        const operation = (0, src_1.getOperation)(routes.responseSchemaNotOverwritingOuterOpenApiDecorator, {});
        expect(operation.description).toEqual('somedescription');
        expect(operation.responses).toEqual({
            '200': {
                content: {
                    'application/json': {},
                },
                description: 'Successful response',
            },
            '400': {
                content: {
                    'text/csv': {
                        schema: { $ref: '#/components/schemas/MyModelName' },
                    },
                },
                description: '',
            },
        });
    });
    it('does not apply @ResponseSchema if empty ModelName is passed', () => {
        const operation = (0, src_1.getOperation)(routes.responseSchemaNoNoModel, {});
        expect(operation.responses).toEqual({
            '200': {
                content: {
                    'application/json': {},
                },
                description: 'Successful response',
            },
        });
    });
    it('applies @ResponseSchema using default contentType and statusCode from @Controller (non-json)', () => {
        const operation = (0, src_1.getOperation)(routes.responseSchemaDefaultsHtml, {});
        expect(operation.responses).toEqual({
            '200': {
                content: {
                    'text/html; charset=utf-8': {
                        schema: {
                            $ref: '#/components/schemas/ModelDto',
                        },
                    },
                },
                description: '',
            },
        });
    });
    it('applies multiple @ResponseSchema on a single handler', () => {
        const operation = (0, src_1.getOperation)(routes.multipleResponseSchemas, {});
        expect(operation.responses).toEqual({
            '200': {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/MySuccessObject',
                        },
                    },
                },
                description: 'Some successful response object',
            },
            '400': {
                content: {
                    'text/html': {
                        schema: {
                            $ref: '#/components/schemas/BadRequestErrorObject',
                        },
                    },
                },
                description: '',
            },
            '404': {
                content: {
                    'text/csv': {
                        schema: {
                            $ref: '#/components/schemas/NotFoundErrorObject',
                        },
                    },
                },
                description: '',
            },
        });
    });
    it('applies two @ResponseSchema with same status code', () => {
        const operation = (0, src_1.getOperation)(routes.twoResponseSchemasSameStatusCode, {});
        expect(operation.responses).toEqual({
            '200': {
                content: {
                    'application/json': {
                        schema: {
                            oneOf: [
                                { $ref: '#/components/schemas/SuccessObject1' },
                                { $ref: '#/components/schemas/SuccessObject2' },
                            ],
                        },
                    },
                },
                description: '',
            },
        });
    });
    it('applies three @ResponseSchema with same status code', () => {
        const operation = (0, src_1.getOperation)(routes.threeResponseSchemasSameStatusCode, {});
        expect(operation.responses).toEqual({
            '200': {
                content: {
                    'application/json': {
                        schema: {
                            oneOf: [
                                { $ref: '#/components/schemas/SuccessObject1' },
                                { $ref: '#/components/schemas/SuccessObject2' },
                                { $ref: '#/components/schemas/SuccessObject3' },
                            ],
                        },
                    },
                },
                description: '',
            },
        });
    });
    it('applies two @ResponseSchema with same status code, where one of them is an array', () => {
        const operation = (0, src_1.getOperation)(routes.twoResponseSchemaSameStatusCodeWithOneArraySchema, {});
        expect(operation.responses).toEqual({
            '200': {
                content: {
                    'application/json': {
                        schema: {
                            oneOf: [
                                {
                                    items: {
                                        $ref: '#/components/schemas/SuccessObjects1',
                                    },
                                    type: 'array',
                                },
                                { $ref: '#/components/schemas/SuccessObject2' },
                            ],
                        },
                    },
                },
                description: '',
            },
        });
    });
    it('applies four @ResponseSchema with mixed status code, where two of them are arrays', () => {
        const operation = (0, src_1.getOperation)(routes.fourResponseSchemasMixedStatusCodeWithTwoArraySchemas, {});
        expect(operation.responses).toEqual({
            '200': {
                content: {
                    'application/json': {
                        schema: {
                            items: {
                                $ref: '#/components/schemas/SuccessObjects1',
                            },
                            type: 'array',
                        },
                    },
                },
                description: '',
            },
            '201': {
                content: {
                    'application/json': {
                        schema: {
                            oneOf: [
                                { $ref: '#/components/schemas/CreatedObject2' },
                                {
                                    items: {
                                        $ref: '#/components/schemas/CreatedObjects3',
                                    },
                                    type: 'array',
                                },
                            ],
                        },
                    },
                },
                description: '',
            },
            '400': {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/BadRequestObject4',
                        },
                    },
                },
                description: '',
            },
        });
    });
});
describe('@OpenAPI-decorated class', () => {
    let routes;
    beforeEach(() => {
        (0, routing_controllers_1.getMetadataArgsStorage)().reset();
        let Item = 
        // @ts-ignore: not referenced
        class Item {
            listItems() {
                return;
            }
            getItem() {
                return;
            }
        };
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/'),
            (0, src_1.OpenAPI)({
                description: 'List all items',
                summary: 'Method-specific summary',
            }),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], Item.prototype, "listItems", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/'),
            (0, src_1.OpenAPI)((op) => ({ ...op, security: [] })),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], Item.prototype, "getItem", null);
        Item = tslib_1.__decorate([
            (0, src_1.OpenAPI)({
                externalDocs: { url: 'http:/docs.com' },
            }),
            (0, routing_controllers_1.Controller)('/items'),
            (0, src_1.OpenAPI)({
                description: 'Common description',
                security: [{ basicAuth: [] }],
            })
            // @ts-ignore: not referenced
        ], Item);
        routes = (0, src_1.parseRoutes)((0, routing_controllers_1.getMetadataArgsStorage)()).reduce((acc, route) => {
            acc[route.action.method] = route;
            return acc;
        }, {});
    });
    it('applies controller OpenAPI props to each method with method-specific props taking precedence', () => {
        expect((0, src_1.getOperation)(routes.listItems, {})).toEqual(expect.objectContaining({
            description: 'List all items',
            externalDocs: { url: 'http:/docs.com' },
            security: [{ basicAuth: [] }],
            summary: 'Method-specific summary',
        }));
        expect((0, src_1.getOperation)(routes.getItem, {})).toEqual(expect.objectContaining({
            description: 'Common description',
            externalDocs: { url: 'http:/docs.com' },
            security: [],
            summary: 'Get item',
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX190ZXN0c19fL2RlY29yYXRvcnMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2REFRNEI7QUFFNUIsZ0NBT2U7QUFDZiw4Q0FBNEM7QUFNNUMsUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7SUFDMUIsSUFBSSxNQUFxQixDQUFBO0lBRXpCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxJQUFBLDRDQUFzQixHQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7UUFJaEMsSUFBTSxlQUFlO1FBRHJCLDZCQUE2QjtRQUM3QixNQUFNLGVBQWU7WUFLbkIsU0FBUztnQkFDUCxPQUFNO1lBQ1IsQ0FBQztZQU9ELE9BQU8sQ0FBa0IsT0FBZTtnQkFDdEMsT0FBTTtZQUNSLENBQUM7WUFXRCwrQkFBK0I7Z0JBQzdCLE9BQU07WUFDUixDQUFDO1lBYUQsaUNBQWlDO2dCQUMvQixPQUFNO1lBQ1IsQ0FBQztZQVlELDhCQUE4QjtnQkFDNUIsT0FBTTtZQUNSLENBQUM7WUFJRCxzQkFBc0I7Z0JBQ3BCLE9BQU07WUFDUixDQUFDO1lBUUQscUJBQXFCO2dCQUNuQixPQUFNO1lBQ1IsQ0FBQztZQU1ELHdCQUF3QjtnQkFDdEIsT0FBTTtZQUNSLENBQUM7WUFJRCxtQkFBbUI7Z0JBQ2pCLE9BQU07WUFDUixDQUFDO1lBTUQsZ0NBQWdDO2dCQUM5QixPQUFNO1lBQ1IsQ0FBQztZQU9ELDJCQUEyQjtnQkFDekIsT0FBTTtZQUNSLENBQUM7WUFRRCxpREFBaUQ7Z0JBQy9DLE9BQU07WUFDUixDQUFDO1lBUUQsaURBQWlEO2dCQUMvQyxPQUFNO1lBQ1IsQ0FBQztZQUlELHVCQUF1QjtnQkFDckIsT0FBTTtZQUNSLENBQUM7WUFlRCx1QkFBdUI7Z0JBQ3JCLE9BQU07WUFDUixDQUFDO1lBS0QsZ0NBQWdDO2dCQUM5QixPQUFNO1lBQ1IsQ0FBQztZQU1ELGtDQUFr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