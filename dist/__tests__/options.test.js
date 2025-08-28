"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const src_1 = require("../src");
describe('options', () => {
    let routes;
    beforeEach(() => {
        (0, routing_controllers_1.getMetadataArgsStorage)().reset();
        class CreateUserBody {
        }
        class ParamType {
        }
        let UsersController = 
        // @ts-ignore: not referenced
        class UsersController {
            createUser(_from, _to, _body) {
                return;
            }
            createManyUsers(_param, _body) {
                return;
            }
        };
        tslib_1.__decorate([
            (0, routing_controllers_1.Post)('/:userId'),
            tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('from')),
            tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('to', { required: false })),
            tslib_1.__param(2, (0, routing_controllers_1.Body)({ type: CreateUserBody })),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Number, Number, Array]),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "createUser", null);
        tslib_1.__decorate([
            (0, routing_controllers_1.Post)('/:userId'),
            tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('param', { type: ParamType })),
            tslib_1.__param(1, (0, routing_controllers_1.Body)()),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [String, Array]),
            tslib_1.__metadata("design:returntype", void 0)
        ], UsersController.prototype, "createManyUsers", null);
        UsersController = tslib_1.__decorate([
            (0, routing_controllers_1.JsonController)('/users')
            // @ts-ignore: not referenced
        ], UsersController);
        routes = (0, src_1.parseRoutes)((0, routing_controllers_1.getMetadataArgsStorage)());
    });
    it('sets path parameter always as required regardless of options', () => {
        const route = routes[0];
        expect((0, src_1.getPathParams)(route)[0].required).toEqual(true);
        route.options.defaults = { paramOptions: { required: false } };
        expect((0, src_1.getPathParams)(route)[0].required).toEqual(true);
    });
    it('sets query parameter optional by default', () => {
        const route = routes[0];
        expect((0, src_1.getQueryParams)(route, {})[0].required).toEqual(false);
    });
    it('sets query parameter required as per global options', () => {
        const route = routes[0];
        route.options.defaults = { paramOptions: { required: true } };
        expect((0, src_1.getQueryParams)(route, {})[0].required).toEqual(true);
    });
    it('uses local required option over the global one', () => {
        const route = routes[0];
        route.options.defaults = { paramOptions: { required: true } };
        expect((0, src_1.getQueryParams)(route, {})[1].required).toEqual(false);
    });
    it('uses the explicit `type` parameter to override request query type', () => {
        const route = routes[1];
        expect((0, src_1.getQueryParams)(route, {})[0]).toEqual({
            in: 'query',
            name: 'param',
            required: false,
            schema: {
                $ref: '#/components/schemas/ParamType',
            },
        });
    });
    it('uses the explicit `type` parameter to override array request body item type', () => {
        const route = routes[0];
        expect((0, src_1.getRequestBody)(route)).toEqual({
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
            required: false,
        });
    });
    it('set inner schema as {} if array request body item type is not explicitly defined', () => {
        const route = routes[1];
        expect((0, src_1.getRequestBody)(route)).toEqual({
            content: {
                'application/json': {
                    schema: {
                        items: {
                            type: 'object',
                        },
                        type: 'array',
                    },
                },
            },
            description: '',
            required: false,
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX190ZXN0c19fL29wdGlvbnMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2REFNNEI7QUFFNUIsZ0NBTWU7QUFFZixRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtJQUN2QixJQUFJLE1BQWdCLENBQUE7SUFFcEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLElBQUEsNENBQXNCLEdBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUVoQyxNQUFNLGNBQWM7U0FBSTtRQUN4QixNQUFNLFNBQVM7U0FBSTtRQUluQixJQUFNLGVBQWU7UUFEckIsNkJBQTZCO1FBQzdCLE1BQU0sZUFBZTtZQUVuQixVQUFVLENBQ1ksS0FBYSxFQUNNLEdBQVcsRUFDbEIsS0FBdUI7Z0JBRXZELE9BQU07WUFDUixDQUFDO1lBR0QsZUFBZSxDQUM2QixNQUFjLEVBQ2hELEtBQXVCO2dCQUUvQixPQUFNO1lBQ1IsQ0FBQztTQUNGLENBQUE7UUFoQkM7WUFBQyxJQUFBLDBCQUFJLEVBQUMsVUFBVSxDQUFDO1lBRWQsbUJBQUEsSUFBQSxnQ0FBVSxFQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2xCLG1CQUFBLElBQUEsZ0NBQVUsRUFBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNyQyxtQkFBQSxJQUFBLDBCQUFJLEVBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQTs7Ozt5REFHaEM7UUFFRDtZQUFDLElBQUEsMEJBQUksRUFBQyxVQUFVLENBQUM7WUFFZCxtQkFBQSxJQUFBLGdDQUFVLEVBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7WUFDeEMsbUJBQUEsSUFBQSwwQkFBSSxHQUFFLENBQUE7Ozs7OERBR1I7UUFoQkcsZUFBZTtZQUZwQixJQUFBLG9DQUFjLEVBQUMs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