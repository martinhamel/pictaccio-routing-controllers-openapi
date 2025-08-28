"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootController = exports.UserPostsController = exports.UsersController = exports.UserQuery = exports.ListUsersHeaderParams = exports.ListUsersQueryParams = exports.CreatePostBody = exports.CreateNestedBody = exports.CreateUserBody = void 0;
const tslib_1 = require("tslib");
// tslint:disable:no-implicit-dependencies
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const routing_controllers_1 = require("routing-controllers");
const src_1 = require("../../src");
const models_1 = require("./models");
class CreateUserBody {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], CreateUserBody.prototype, "email", void 0);
exports.CreateUserBody = CreateUserBody;
class CreateNestedBody {
}
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateUserBody),
    tslib_1.__metadata("design:type", Array)
], CreateNestedBody.prototype, "users", void 0);
exports.CreateNestedBody = CreateNestedBody;
class CreatePostBody {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreatePostBody.prototype, "content", void 0);
exports.CreatePostBody = CreatePostBody;
class ListUsersQueryParams {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], ListUsersQueryParams.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], ListUsersQueryParams.prototype, "types", void 0);
exports.ListUsersQueryParams = ListUsersQueryParams;
class ListUsersHeaderParams {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ListUsersHeaderParams.prototype, "Authorization", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ListUsersHeaderParams.prototype, "X-Correlation-ID", void 0);
exports.ListUsersHeaderParams = ListUsersHeaderParams;
class UserQuery {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserQuery.prototype, "name", void 0);
exports.UserQuery = UserQuery;
let UsersController = class UsersController {
    listUsers(_query, _header) {
        return;
    }
    listUsersInRange(_to, _emptyQuery, _userId) {
        return;
    }
    getUser(_userId, _emptyHeader, _xRequestedWith) {
        return;
    }
    createUser(_body) {
        return;
    }
    createUserWithType(_user) {
        return;
    }
    createManyUsers(_body) {
        return;
    }
    createNestedUsers(_body) {
        return;
    }
    createUserPost(_body, _token) {
        return;
    }
    deleteUsersByVersion() {
        return;
    }
    putUserDefault(_limit, _query, _token) {
        return;
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/'),
    (0, routing_controllers_1.ContentType)('text/cvs'),
    (0, src_1.OpenAPI)({ description: 'List all users' }),
    (0, src_1.ResponseSchema)(models_1.ModelDto, { isArray: true }),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParams)()),
    tslib_1.__param(1, (0, routing_controllers_1.HeaderParams)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ListUsersQueryParams,
        ListUsersHeaderParams]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "listUsers", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:from-:to'),
    (0, src_1.OpenAPI)({ responses: { '400': { description: 'Bad request' } } }),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('to')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('userId', { required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "listUsersInRange", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:userId?'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('userId')),
    tslib_1.__param(1, (0, routing_controllers_1.HeaderParam)('')),
    tslib_1.__param(2, (0, routing_controllers_1.HeaderParam)('X-Requested-With')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(201),
    (0, routing_controllers_1.Post)('/'),
    (0, src_1.ResponseSchema)(models_1.ModelDto, {
        description: 'Created user object',
        statusCode: 201,
    }),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateUserBody]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(201),
    (0, routing_controllers_1.Post)('/withType'),
    (0, src_1.ResponseSchema)(models_1.ModelDto, {
        description: 'Created user object',
        statusCode: 201,
    }),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('user', { type: CreateUserBody })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "createUserWithType", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ required: true, type: CreateUserBody })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "createManyUsers", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/nested'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateNestedBody]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "createNestedUsers", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/:userId/posts'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ required: true })),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('token')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreatePostBody, String]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "createUserPost", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:version(v?\\d{1}|all)'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUsersByVersion", null);
tslib_1.__decorate([
    (0, src_1.OpenAPI)({
        deprecated: true,
        description: 'Insert or update a user object - DEPRECATED in v1.0.1',
        summary: '',
    }),
    (0, routing_controllers_1.Put)(),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('query')),
    tslib_1.__param(2, (0, routing_controllers_1.BodyParam)('token', { required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UserQuery, String]),
    tslib_1.__metadata("design:returntype", void 0)
], UsersController.prototype, "putUserDefault", null);
UsersController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/users')
], UsersController);
exports.UsersController = UsersController;
let UserPostsController = class UserPostsController {
    getUserPost(_userId, _postId) {
        return;
    }
    patchUserPost(_token) {
        return;
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:postId'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('userId')),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('postId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String]),
    tslib_1.__metadata("design:returntype", void 0)
], UserPostsController.prototype, "getUserPost", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Patch)('/:postId'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('token')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], UserPostsController.prototype, "patchUserPost", null);
UserPostsController = tslib_1.__decorate([
    (0, routing_controllers_1.Controller)('/users/:userId/posts')
], UserPostsController);
exports.UserPostsController = UserPostsController;
let RootController = class RootController {
    getDefaultPath() {
        return;
    }
    getStringPath() {
        return;
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], RootController.prototype, "getDefaultPath", null);
tslib_1.__decorate([
    (0, src_1.OpenAPI)((spec) => ({ ...spec, security: [] })),
    (0, routing_controllers_1.Get)('/stringPath'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], RootController.prototype, "getStringPath", null);
RootController = tslib_1.__decorate([
    (0, routing_controllers_1.Controller)(),
    (0, src_1.OpenAPI)({
        description: 'Common description for all RootController operations',
        security: [{ basicAuth: [] }],
    })
], RootController);
exports.RootController = RootController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fX3Rlc3RzX18vZml4dHVyZXMvY29udHJvbGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBDQUEwQztBQUMxQyx5REFBd0M7QUFDeEMscURBQStFO0FBQy9FLDZEQWlCNEI7QUFFNUIsbUNBQW1EO0FBQ25ELHFDQUFtQztBQUVuQyxNQUFhLGNBQWM7Q0FHMUI7QUFGQztJQUFDLElBQUEseUJBQU8sR0FBRTs7NkNBQ0c7QUFGZix3Q0FHQztBQUVELE1BQWEsZ0JBQWdCO0NBSTVCO0FBSEM7SUFBQyxJQUFBLGdDQUFjLEVBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDOUIsSUFBQSx3QkFBSSxFQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQzs7K0NBQ0o7QUFIekIsNENBSUM7QUFFRCxNQUFhLGNBQWM7Q0FHMUI7QUFGQztJQUFDLElBQUEsMEJBQVEsRUFBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzs7K0NBQ1I7QUFGbkIsd0NBR0M7QUFFRCxNQUFhLG9CQUFvQjtDQU9oQztBQU5DO0lBQUMsSUFBQSw0QkFBVSxHQUFFO0lBQ1osSUFBQSx5QkFBTyxHQUFFOzttREFDSTtBQUVkO0lBQUMsSUFBQSwwQkFBUSxFQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDVjtBQU5qQixvREFPQztBQUVELE1BQWEscUJBQXFCO0NBT2pDO0FBTkM7SUFBQyxJQUFBLDBCQUFRLEdBQUU7OzREQUNVO0FBRXJCO0lBQUMsSUFBQSw0QkFBVSxHQUFFO0lBQ1osSUFBQSwwQkFBUSxHQUFFOzsrREFDZTtBQU41QixzREFPQztBQUVELE1BQWEsU0FBUztDQUdyQjtBQUZDO0lBQUMsSUFBQSwwQkFBUSxHQUFFOzt1Q0FDQztBQUZkLDhCQUdDO0FBR00sSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtJQUsxQixTQUFTLENBQ1EsTUFBNkIsRUFDNUIsT0FBK0I7UUFFL0MsT0FBTTtJQUNSLENBQUM7SUFJRCxnQkFBZ0IsQ0FDRCxHQUFXLEVBQ1IsV0FBbUIsRUFDTyxPQUFlO1FBRXpELE9BQU07SUFDUixDQUFDO0lBR0QsT0FBTyxDQUNZLE9BQWUsRUFDZixZQUFvQixFQUNKLGVBQXVCO1FBRXhELE9BQU07SUFDUixDQUFDO0lBUUQsVUFBVSxDQUFTLEtBQXFCO1FBQ3RDLE9BQU07SUFDUixDQUFDO0lBUUQsa0JBQWtCLENBQzhCLEtBQWE7UUFFM0QsT0FBTTtJQUNSLENBQUM7SUFHRCxlQUFlLENBQ21DLEtBQXVCO1FBRXZFLE9BQU07SUFDUixDQUFDO0lBR0QsaUJBQWlCLENBQTJCLEtBQXVCO1FBQ2pFLE9BQU07SUFDUixDQUFDO0lBR0QsY0FBYyxDQUNjLEtBQXFCLEVBQzNCLE1BQWM7UUFFbEMsT0FBTTtJQUNSLENBQUM7SUFHRCxvQkFBb0I7UUFDbEIsT0FBTTtJQUNSLENBQUM7SUFRRCxjQUFjLENBQ1EsTUFBYyxFQUNkLE1BQWlCLEVBQ0csTUFBYztRQUV0RCxPQUFNO0lBQ1IsQ0FBQztDQUNGLENBQUE7QUExRkM7SUFBQyxJQUFBLHlCQUFHLEVBQUMsR0FBRyxDQUFDO0lBQ1IsSUFBQSxpQ0FBVyxFQUFDLFVBQVUsQ0FBQztJQUN2QixJQUFBLGFBQU8sRUFBQyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFDLElBQUEsb0JBQWMsRUFBQyxpQkFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBRXpDLG1CQUFBLElBQUEsaUNBQVcsR0FBRSxDQUFBO0lBQ2IsbUJBQUEsSUFBQSxrQ0FBWSxHQUFFLENBQUE7OzZDQURTLG9CQUFvQjtRQUNsQixxQkFBcUI7O2dEQUdoRDtBQUVEO0lBQUMsSUFBQSx5QkFBRyxFQUFDLFlBQVksQ0FBQztJQUNqQixJQUFBLGFBQU8sRUFBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFFL0QsbUJBQUEsSUFBQSwyQkFBSyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBQ1gsbUJBQUEsSUFBQSxnQ0FBVSxFQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2QsbUJBQUEsSUFBQSxnQ0FBVSxFQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBOzs7O3VEQUcxQztBQUVEO0lBQUMsSUFBQSx5QkFBRyxFQUFDLFdBQVcsQ0FBQztJQUVkLG1CQUFBLElBQUEsMkJBQUssRUFBQyxRQUFRLENBQUMsQ0FBQTtJQUNmLG1CQUFBLElBQUEsaUNBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQTtJQUNmLG1CQUFBLElBQUEsaUNBQVcsRUFBQyxrQkFBa0IsQ0FBQyxDQUFBOzs7OzhDQUdqQztBQUVEO0lBQUMsSUFBQSw4QkFBUSxFQUFDLEdBQUcsQ0FBQztJQUNiLElBQUEsMEJBQUksRUFBQyxHQUFHLENBQUM7SUFDVCxJQUFBLG9CQUFjLEVBQUMsaUJBQVEsRUFBRTtRQUN4QixXQUFXLEVBQUUscUJBQXFCO1FBQ2xDLFVBQVUsRUFBRSxHQUFHO0tBQ2hCLENBQUM7SUFDVSxtQkFBQSxJQUFBLDBCQUFJLEdBQUUsQ0FBQTs7NkNBQVEsY0FBYzs7aURBRXZDO0FBRUQ7SUFBQyxJQUFBLDhCQUFRLEVBQUMsR0FBRyxDQUFDO0lBQ2IsSUFBQSwwQkFBSSxFQUFDLFdBQVcsQ0FBQztJQUNqQixJQUFBLG9CQUFjLEVBQUMsaUJBQVEsRUFBRTtRQUN4QixXQUFXLEVBQUUscUJBQXFCO1FBQ2xDLFVBQVUsRUFBRSxHQUFHO0tBQ2hCLENBQUM7SUFFQyxtQkFBQSxJQUFBLGdDQUFVLEVBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUE7Ozs7eURBRzlDO0FBRUQ7SUFBQyxJQUFBLHlCQUFHLEVBQUMsR0FBRyxDQUFDO0lBRU4sbUJBQUEsSUFBQSwwQkFBSSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQTs7OztzREFHaEQ7QUFFRDtJQUFDLElBQUEsMEJBQUksRUFBQyxTQUFTLENBQUM7SUFDRyxtQkFBQSxJQUFBLDBCQUFJLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTs7NkNBQVEsZ0JBQWdCOzt3REFFbEU7QUFFRDtJQUFDLElBQUEsMEJBQUksRUFBQyxnQkFBZ0IsQ0FBQztJQUVwQixtQkFBQSxJQUFBLDBCQUFJLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN4QixtQkFBQSxJQUFBLCtCQUFTLEVBQUMsT0FBTyxDQUFDLENBQUE7OzZDQURjLGNBQWM7O3FEQUloRDtBQUVEO0lBQUMsSUFBQSw0QkFBTSxFQUFDLHlCQUF5QixDQUFDOzs7OzJEQUdqQztBQUVEO0lBQUMsSUFBQSxhQUFPLEVBQUM7UUFDUCxVQUFVLEVBQUUsSUFBSTtRQUNoQixXQUFXLEVBQUUsdURBQXVEO1FBQ3BFLE9BQU8sRUFBRSxFQUFFO0tBQ1osQ0FBQztJQUNELElBQUEseUJBQUcsR0FBRTtJQUVILG1CQUFBLElBQUEsK0JBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQTtJQUNsQixtQkFBQSxJQUFBLCtCQUFTLEVBQUMsT0FBTyxDQUFDLENBQUE7SUFDbEIsbUJBQUEsSUFBQSwrQkFBUyxFQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBOztxREFEWCxTQUFTOztxREFJdEM7QUExRlUsZUFBZTtJQUQzQixJQUFBLG9DQUFjLEVBQUMsUUFBUSxDQUFDO0dBQ1osZUFBZSxDQTJGM0I7QUEzRlksMENBQWU7QUE4RnJCLElBQU0sbUJBQW1CLEdBQXpCLE1BQU0sbUJBQW1CO0lBRTlCLFdBQVcsQ0FDUSxPQUFlLEVBQ2YsT0FBZTtRQUVoQyxPQUFNO0lBQ1IsQ0FBQztJQUdELGFBQWEsQ0FBcUIsTUFBYztRQUM5QyxPQUFNO0lBQ1IsQ0FBQztDQUNGLENBQUE7QUFaQztJQUFDLElBQUEseUJBQUcsRUFBQyxVQUFVLENBQUM7SUFFYixtQkFBQSxJQUFBLDJCQUFLLEVBQUMsUUFBUSxDQUFDLENBQUE7SUFDZixtQkFBQSxJQUFBLDJCQUFLLEVBQUMsUUFBUSxDQUFDLENBQUE7Ozs7c0RBR2pCO0FBRUQ7SUFBQyxJQUFBLDJCQUFLLEVBQUMsVUFBVSxDQUFDO0lBQ0gsbUJBQUEsSUFBQSwrQkFBUyxFQUFDLE9BQU8sQ0FBQyxDQUFBOzs7O3dEQUVoQztBQVpVLG1CQUFtQjtJQUQvQixJQUFBLGdDQUFVLEVBQUMsc0JBQXNCLENBQUM7R0FDdEIsbUJBQW1CLENBYS9CO0FBYlksa0RBQW1CO0FBb0J6QixJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFjO0lBRXpCLGNBQWM7UUFDWixPQUFNO0lBQ1IsQ0FBQztJQUlELGFBQWE7UUFDWCxPQUFNO0lBQ1IsQ0FBQztDQUNGLENBQUE7QUFWQztJQUFDLElBQUEseUJBQUcsR0FBRTs7OztvREFHTDtBQUVEO0lBQUMsSUFBQSxhQUFPLEVBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5QyxJQUFBLHlCQUFHLEVBQUMsYUFBYSxDQUFDOzs7O21EQUdsQjtBQVZVLGNBQWM7SUFMMUIsSUFBQSxnQ0FBVSxHQUFFO0lBQ1osSUFBQSxhQUFPLEVBQUM7UUFDUCxXQUFXLEVBQUUsc0RBQXNEO1FBQ25FLFFBQVEsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDO0tBQzlCLENBQUM7R0FDVyxjQUFjLENBVzFCO0FBWFksd0NBQWMifQ==