export declare class CreateUserBody {
    email: string;
}
export declare class CreateNestedBody {
    users: CreateUserBody[];
}
export declare class CreatePostBody {
    content: string[];
}
export declare class ListUsersQueryParams {
    email?: string;
    types: string[];
}
export declare class ListUsersHeaderParams {
    Authorization: string;
    'X-Correlation-ID': string;
}
export declare class UserQuery {
    name: string;
}
export declare class UsersController {
    listUsers(_query?: ListUsersQueryParams, _header?: ListUsersHeaderParams): void;
    listUsersInRange(_to: number, _emptyQuery: string, _userId: number): void;
    getUser(_userId: number, _emptyHeader: string, _xRequestedWith: string): void;
    createUser(_body: CreateUserBody): void;
    createUserWithType(_user: string): void;
    createManyUsers(_body: CreateUserBody[]): void;
    createNestedUsers(_body: CreateNestedBody): void;
    createUserPost(_body: CreatePostBody, _token: string): void;
    deleteUsersByVersion(): void;
    putUserDefault(_limit: number, _query: UserQuery, _token: string): void;
}
export declare class UserPostsController {
    getUserPost(_userId: number, _postId: string): void;
    patchUserPost(_token: string): void;
}
export declare class RootController {
    getDefaultPath(): void;
    getStringPath(): void;
}
