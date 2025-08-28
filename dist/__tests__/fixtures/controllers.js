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
exports.CreateUserBody = CreateUserBody;
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], CreateUserBody.prototype, "email", void 0);
class CreateNestedBody {
}
exports.CreateNestedBody = CreateNestedBody;
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateUserBody),
    tslib_1.__metadata("design:type", Array)
], CreateNestedBody.prototype, "users", void 0);
class CreatePostBody {
}
exports.CreatePostBody = CreatePostBody;
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreatePostBody.prototype, "content", void 0);
class ListUsersQueryParams {
}
exports.ListUsersQueryParams = ListUsersQueryParams;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], ListUsersQueryParams.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], ListUsersQueryParams.prototype, "types", void 0);
class ListUsersHeaderParams {
}
exports.ListUsersHeaderParams = ListUsersHeaderParams;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ListUsersHeaderParams.prototype, "Authorization", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ListUsersHeaderParams.prototype, "X-Correlation-ID", void 0);
class UserQuery {
}
exports.UserQuery = UserQuery;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserQuery.prototype, "name", void 0);
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
exports.UsersController = UsersController;
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
exports.UsersController = UsersController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/users')
], UsersController);
let UserPostsController = class UserPostsController {
    getUserPost(_userId, _postId) {
        return;
    }
    patchUserPost(_token) {
        return;
    }
};
exports.UserPostsController = UserPostsController;
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
exports.UserPostsController = UserPostsController = tslib_1.__decorate([
    (0, routing_controllers_1.Controller)('/users/:userId/posts')
], UserPostsController);
let RootController = class RootController {
    getDefaultPath() {
        return;
    }
    getStringPath() {
        return;
    }
};
exports.RootController = RootController;
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
exports.RootController = RootController = tslib_1.__decorate([
    (0, routing_controllers_1.Controller)(),
    (0, src_1.OpenAPI)({
        description: 'Common description for all RootController operations',
        security: [{ basicAuth: [] }],
    })
], RootController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9fX3Rlc3RzX18vZml4dHVyZXMvY29udHJvbGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBDQUEwQztBQUMxQyx5REFBd0M7QUFDeEMscURBQStFO0FBQy9FLDZEQWlCNEI7QUFFNUIsbUNBQW1EO0FBQ25ELHFDQUFtQztBQUVuQyxNQUFhLGNBQWM7Q0FHMUI7QUFIRCx3Q0FHQztBQURDO0lBREMsSUFBQSx5QkFBTyxHQUFFOzs2Q0FDRztBQUdmLE1BQWEsZ0JBQWdCO0NBSTVCO0FBSkQsNENBSUM7QUFEQztJQUZDLElBQUEsZ0NBQWMsRUFBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUM5QixJQUFBLHdCQUFJLEVBQUMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDOzsrQ0FDSjtBQUd6QixNQUFhLGNBQWM7Q0FHMUI7QUFIRCx3Q0FHQztBQURDO0lBREMsSUFBQSwwQkFBUSxFQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDOzsrQ0FDUjtBQUduQixNQUFhLG9CQUFvQjtDQU9oQztBQVBELG9EQU9DO0FBSkM7SUFGQyxJQUFBLDRCQUFVLEdBQUU7SUFDWixJQUFBLHlCQUFPLEdBQUU7O21EQUNJO0FBR2Q7SUFEQyxJQUFBLDBCQUFRLEVBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUNWO0FBR2pCLE1BQWEscUJBQXFCO0NBT2pDO0FBUEQsc0RBT0M7QUFMQztJQURDLElBQUEsMEJBQVEsR0FBRTs7NERBQ1U7QUFJckI7SUFGQyxJQUFBLDRCQUFVLEdBQUU7SUFDWixJQUFBLDBCQUFRLEdBQUU7OytEQUNlO0FBRzVCLE1BQWEsU0FBUztDQUdyQjtBQUhELDhCQUdDO0FBREM7SUFEQyxJQUFBLDBCQUFRLEdBQUU7O3VDQUNDO0FBSVAsSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtJQUsxQixT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