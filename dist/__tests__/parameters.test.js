"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const src_1 = require("../src");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const class_validator_1 = require("class-validator");
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
describe('parameters', () => {
    let route;
    let schemas;
    beforeAll(() => {
        class ListUsersHeaderParams {
        }
        class ListUsersQueryParams {
        }
        tslib_1.__decorate([
            (0, class_validator_1.IsNumber)(),
            tslib_1.__metadata("design:type", Number)
        ], ListUsersQueryParams.prototype, "genderId", void 0);
        tslib_1.__decorate([
            (0, class_validator_1.IsBoolean)(),
            (0, class_validator_1.IsOptional)(),
            tslib_1.__metadata("design:type", Boolean)
        ], ListUsersQueryParams.prototype, "isPretty", void 0);
        tslib_1.__decorate([
            (0, class_validator_1.IsString)({ each: true }),
            tslib_1.__metadata("design:type", Array)
        ], ListUsersQueryParams.prototype, "types", void 0);
        let UsersController = 
        // @ts-ignore: not referenced
        class UsersController {
            getPost(_numberParam, _invalidParam, _booleanParam, _anyParam, _limit, _authorization, _queryRef, _headerParams) {
                return;
            }
        };
        tslib_1.__decorate([
            (0, routing_controllers_1.Get)('/:string/:regex(\\d{6})/:optional?/:number/:boolean/:any'),
            tslib_1.__param(0, (0, routing_controllers_1.Param)('number')),
            tslib_1.__param(1, (0, routing_controllers_1.Param)('invalid')),
            tslib_1.__param(2, (0, routing_controllers_1.Param)('boolean')),
            tslib_1.__param(3, (0, routing_controllers_1.Param)('any')),
            tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('limit')),
            tslib_1.__param(5, (0, routing_controllers_1.HeaderParam)('Authorization', { required: true })),
            tslib_1.__param(6, (0, routing_controllers_1.QueryParams)()),
            tslib_1.__param(7, (0, routing_controllers_1.HeaderParams)()),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Number, String, Boolean, Object, Number, String, ListUsersQueryParams,
                ListUsersHeaderParams]),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "getPost", null);
        UsersController = tslib_1.__decorate([
            (0, routing_controllers_1.JsonController)('/users')
            // @ts-ignore: not referenced
        ], UsersController);
        route = (0, src_1.parseRoutes)((0, routing_controllers_1.getMetadataArgsStorage)())[0];
        schemas = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)({
            classTransformerMetadataStorage: defaultMetadataStorage,
            refPointerPrefix: '#/components/schemas/',
        });
    });
    it('parses path parameter from path strings', () => {
        expect((0, src_1.getPathParams)({ ...route, params: [] })).toEqual([
            {
                in: 'path',
                name: 'string',
                required: true,
                schema: { pattern: '[^\\/#\\?]+?', type: 'string' },
            },
            {
                in: 'path',
                name: 'regex',
                required: true,
                schema: { pattern: '\\d{6}', type: 'string' },
            },
            {
                in: 'path',
                name: 'optional',
                required: false,
                schema: { pattern: '[^\\/#\\?]+?', type: 'string' },
            },
            {
                in: 'path',
                name: 'number',
                required: true,
                schema: { pattern: '[^\\/#\\?]+?', type: 'string' },
            },
            {
                in: 'path',
                name: 'boolean',
                required: true,
                schema: { pattern: '[^\\/#\\?]+?', type: 'string' },
            },
            {
                in: 'path',
                name: 'any',
                required: true,
                schema: { pattern: '[^\\/#\\?]+?', type: 'string' },
            },
        ]);
    });
    it('supplements path parameter with @Param decorator', () => {
        expect((0, src_1.getPathParams)(route)).toEqual([
            {
                in: 'path',
                name: 'string',
                required: true,
                schema: { pattern: '[^\\/#\\?]+?', type: 'string' },
            },
            {
                in: 'path',
                name: 'regex',
                required: true,
                schema: { pattern: '\\d{6}', type: 'string' },
            },
            {
                in: 'path',
                name: 'optional',
                required: false,
                schema: { pattern: '[^\\/#\\?]+?', type: 'string' },
            },
            {
                in: 'path',
                name: 'number',
                required: true,
                schema: { pattern: '[^\\/#\\?]+?', type: 'number' },
            },
            {
                in: 'path',
                name: 'boolean',
                required: true,
                schema: { pattern: '[^\\/#\\?]+?', type: 'boolean' },
            },
            {
                in: 'path',
                name: 'any',
                required: true,
                schema: {},
            },
        ]);
    });
    it('ignores @Param if corresponding name is not found in path string', () => {
        expect((0, src_1.getPathParams)(route).filter((r) => r.name === 'invalid')).toEqual([]);
    });
    it('parses query param from @QueryParam decorator', () => {
        expect((0, src_1.getQueryParams)(route, schemas)[0]).toEqual({
            in: 'query',
            name: 'limit',
            required: false,
            schema: { type: 'number' },
        });
    });
    it('parses query param ref from @QueryParams decorator', () => {
        expect((0, src_1.getQueryParams)(route, schemas)).toEqual([
            // limit comes from @QueryParam
            {
                in: 'query',
                name: 'limit',
                required: false,
                schema: { type: 'number' },
            },
            {
                in: 'query',
                name: 'genderId',
                required: true,
                schema: { type: 'number' },
            },
            {
                in: 'query',
                name: 'isPretty',
                required: false,
                schema: {
                    type: 'boolean',
                },
            },
            {
                in: 'query',
                name: 'types',
                required: true,
                schema: {
                    items: {
                        type: 'string',
                    },
                    type: 'array',
                },
            },
        ]);
    });
    it('parses header param from @HeaderParam decorator', () => {
        expect((0, src_1.getHeaderParams)(route)[0]).toEqual({
            in: 'header',
            name: 'Authorization',
            required: true,
            schema: { type: 'string' },
        });
    });
    it('parses header param ref from @HeaderParams decorator', () => {
        expect((0, src_1.getHeaderParams)(route)[1]).toEqual({
            in: 'header',
            name: 'ListUsersHeaderParams',
            required: false,
            schema: { $ref: '#/components/schemas/ListUsersHeaderParams' },
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW1ldGVycy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX190ZXN0c19fL3BhcmFtZXRlcnMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2REFTNEI7QUFFNUIsZ0NBTWU7QUFFZiwyRUFBeUU7QUFDekUscURBQTJFO0FBQzNFLE1BQU0sRUFBRSxzQkFBc0IsRUFBRSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO0FBRTNFLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzFCLElBQUksS0FBYSxDQUFBO0lBQ2pCLElBQUksT0FBc0MsQ0FBQTtJQUUxQyxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2IsTUFBTSxxQkFBcUI7U0FBSTtRQUUvQixNQUFNLG9CQUFvQjtTQVV6QjtRQVJDO1lBREMsSUFBQSwwQkFBUSxHQUFFOzs4REFDSztRQUloQjtZQUZDLElBQUEsMkJBQVMsR0FBRTtZQUNYLElBQUEsNEJBQVUsR0FBRTs7OERBQ0k7UUFHakI7WUFEQyxJQUFBLDBCQUFRLEVBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7OzJEQUNWO1FBS2pCLElBQU0sZUFBZTtRQURyQiw2QkFBNkI7UUFDN0IsTUFBTSxlQUFlO1lBRW5CLE9BQU8sQ0FDWSxZQUFvQixFQUNuQixhQUFxQixFQUNyQixhQUFzQixFQUMxQixTQUFjLEVBQ1AsTUFBYyxFQUVuQyxjQUFzQixFQUNQLFNBQWdDLEVBQy9CLGFBQXFDO2dCQUVyRCxPQUFNO1lBQ1IsQ0FBQztTQUNGLENBQUE7UUFiQztZQURDLElBQUEseUJBQUcsRUFBQywwREFBMEQsQ0FBQztZQUU3RCxtQkFBQSxJQUFBLDJCQUFLLEVBQUMsUUFBUSxDQUFDLENBQUE7WUFDZixtQkFBQSxJQUFBLDJCQUFLLEVBQUMsU0FBUyxDQUFDLENBQUE7WUFDaEIsbUJBQUEsSUFBQSwyQkFBSyxFQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ2hCLG1CQUFB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