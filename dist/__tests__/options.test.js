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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX190ZXN0c19fL29wdGlvbnMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2REFNNEI7QUFFNUIsZ0NBTWU7QUFFZixRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtJQUN2QixJQUFJLE1BQWdCLENBQUE7SUFFcEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLElBQUEsNENBQXNCLEdBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUVoQyxNQUFNLGNBQWM7U0FBSTtRQUN4QixNQUFNLFNBQVM7U0FBSTtRQUluQixJQUFNLGVBQWU7UUFEckIsNkJBQTZCO1FBQzdCLE1BQU0sZUFBZTtZQUVuQixVQUFVLENBQ1ksS0FBYSxFQUNNLEdBQVcsRUFDbEIsS0FBdUI7Z0JBRXZELE9BQU07WUFDUixDQUFDO1lBR0QsZUFBZSxDQUM2QixNQUFjLEVBQ2hELEtBQXVCO2dCQUUvQixPQUFNO1lBQ1IsQ0FBQztTQUNGLENBQUE7UUFmQztZQURDLElBQUEsMEJBQUksRUFBQyxVQUFVLENBQUM7WUFFZCxtQkFBQSxJQUFBLGdDQUFVLEVBQUMsTUFBTSxDQUFDLENBQUE7WUFDbEIsbUJBQUEsSUFBQSxnQ0FBVSxFQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLG1CQUFBLElBQUEsMEJBQUksRUFBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFBOzs7O3lEQUdoQztRQUdEO1lBREMsSUFBQSwwQkFBSSxFQUFDLFVBQVUsQ0FBQztZQUVkLG1CQUFBLElBQUEsZ0NBQVUsRUFBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtZQUN4QyxtQkFBQSxJQUFBLDBCQUFJLEdBQUUsQ0FBQTs7Ozs4REFHUjtRQWhCRyxlQUFlO1lBRnBCLElBQUEsb0NBQWMsRUFBQyxR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