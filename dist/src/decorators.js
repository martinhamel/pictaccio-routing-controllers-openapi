"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAPI = OpenAPI;
exports.applyOpenAPIDecorator = applyOpenAPIDecorator;
exports.getOpenAPIMetadata = getOpenAPIMetadata;
exports.setOpenAPIMetadata = setOpenAPIMetadata;
exports.ResponseSchema = ResponseSchema;
const tslib_1 = require("tslib");
const lodash_merge_1 = tslib_1.__importDefault(require("lodash.merge"));
require("reflect-metadata");
const index_1 = require("./index");
const OPEN_API_KEY = Symbol('routing-controllers-openapi:OpenAPI');
/**
 * Supplement action with additional OpenAPI Operation keywords.
 *
 * @param spec OpenAPI Operation object that is merged into the schema derived
 * from routing-controllers decorators. In case of conflicts, keywords defined
 * here overwrite the existing ones. Alternatively you can supply a function
 * that receives as parameters the existing Operation and target route,
 * returning an updated Operation.
 */
function OpenAPI(spec) {
    // tslint:disable-next-line:ban-types
    return (...args) => {
        if (args.length === 1) {
            const [target] = args;
            const currentMeta = getOpenAPIMetadata(target);
            setOpenAPIMetadata([spec, ...currentMeta], target);
        }
        else {
            const [target, key] = args;
            const currentMeta = getOpenAPIMetadata(target, key);
            setOpenAPIMetadata([spec, ...currentMeta], target, key);
        }
    };
}
/**
 * Apply the keywords defined in @OpenAPI decorator to its target route.
 */
function applyOpenAPIDecorator(originalOperation, route) {
    const { action } = route;
    const openAPIParams = [
        ...getOpenAPIMetadata(action.target),
        ...getOpenAPIMetadata(action.target.prototype, action.method),
    ];
    return openAPIParams.reduce((acc, oaParam) => {
        return typeof oaParam === 'function'
            ? oaParam(acc, route)
            : (0, lodash_merge_1.default)({}, acc, oaParam);
    }, originalOperation);
}
/**
 * Get the OpenAPI Operation object stored in given target property's metadata.
 */
function getOpenAPIMetadata(target, key) {
    return ((key
        ? Reflect.getMetadata(OPEN_API_KEY, target.constructor, key)
        : Reflect.getMetadata(OPEN_API_KEY, target)) || []);
}
/**
 * Store given OpenAPI Operation object into target property's metadata.
 */
function setOpenAPIMetadata(value, target, key) {
    return key
        ? Reflect.defineMetadata(OPEN_API_KEY, value, target.constructor, key)
        : Reflect.defineMetadata(OPEN_API_KEY, value, target);
}
/**
 * Supplement action with response body type annotation.
 */
function ResponseSchema(responseClass, // tslint:disable-line
options = {}) {
    const setResponseSchema = (source, route) => {
        const contentType = options.contentType || (0, index_1.getContentType)(route);
        const description = options.description || '';
        const isArray = options.isArray || false;
        const statusCode = (options.statusCode || (0, index_1.getStatusCode)(route)) + '';
        let responseSchemaName = '';
        if (typeof responseClass === 'function' && responseClass.name) {
            responseSchemaName = responseClass.name;
        }
        else if (typeof responseClass === 'string') {
            responseSchemaName = responseClass;
        }
        if (responseSchemaName) {
            const reference = {
                $ref: `#/components/schemas/${responseSchemaName}`,
            };
            const schema = isArray
                ? { items: reference, type: 'array' }
                : reference;
            const responses = {
                [statusCode]: {
                    content: {
                        [contentType]: {
                            schema,
                        },
                    },
                    description,
                },
            };
            const oldSchema = source.responses[statusCode]?.content[contentType].schema;
            if (oldSchema?.$ref || oldSchema?.items || oldSchema?.oneOf) {
                // case where we're adding multiple schemas under single statuscode/contentType
                const newStatusCodeResponse = (0, lodash_merge_1.default)({}, source.responses[statusCode], responses[statusCode]);
                const newSchema = oldSchema.oneOf
                    ? {
                        oneOf: [...oldSchema.oneOf, schema],
                    }
                    : { oneOf: [oldSchema, schema] };
                newStatusCodeResponse.content[contentType].schema = newSchema;
                source.responses[statusCode] = newStatusCodeResponse;
                return source;
            }
            return (0, lodash_merge_1.default)({}, source, { responses });
        }
        return source;
    };
    return OpenAPI(setResponseSchema);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBMEJBLDBCQWFDO0FBS0Qsc0RBZUM7QUFLRCxnREFTQztBQUtELGdEQVFDO0FBS0Qsd0NBb0VDOztBQS9KRCx3RUFBaUM7QUFPakMsNEJBQXlCO0FBRXpCLG1DQUErRDtBQUUvRCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMscUNBQXFDLENBQUMsQ0FBQTtBQU1sRTs7Ozs7Ozs7R0FRRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxJQUFrQjtJQUN4QyxxQ0FBcUM7SUFDckMsT0FBTyxDQUFDLEdBQUcsSUFBdUQsRUFBRSxFQUFFO1FBQ3BFLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFBO1lBQ3JCLE1BQU0sV0FBVyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzlDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDcEQsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQTtZQUMxQixNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDbkQsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDekQsQ0FBQztJQUNILENBQUMsQ0FBQTtBQUNILENBQUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLHFCQUFxQixDQUNuQyxpQkFBa0MsRUFDbEMsS0FBYTtJQUViLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUE7SUFDeEIs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