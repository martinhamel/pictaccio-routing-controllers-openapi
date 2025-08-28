"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routingControllersToSpec = routingControllersToSpec;
const tslib_1 = require("tslib");
const lodash_merge_1 = tslib_1.__importDefault(require("lodash.merge"));
const generateSpec_1 = require("./generateSpec");
const parseMetadata_1 = require("./parseMetadata");
tslib_1.__exportStar(require("./decorators"), exports);
tslib_1.__exportStar(require("./generateSpec"), exports);
tslib_1.__exportStar(require("./parseMetadata"), exports);
/**
 * Convert routing-controllers metadata into an OpenAPI specification.
 *
 * @param storage routing-controllers metadata storage
 * @param routingControllerOptions routing-controllers options
 * @param additionalProperties Additional OpenAPI Spec properties
 */
function routingControllersToSpec(storage, routingControllerOptions = {}, additionalProperties = {}) {
    const routes = (0, parseMetadata_1.parseRoutes)(storage, routingControllerOptions);
    const schemas = additionalProperties.components?.schemas || {};
    const filteredSchemas = Object.fromEntries(Object.entries(schemas)
        .filter(([, schema]) => !('$ref' in schema))
        .map(([key, schema]) => [key, schema]));
    const spec = (0, generateSpec_1.getSpec)(routes, filteredSchemas);
    return (0, lodash_merge_1.default)(spec, additionalProperties);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFxQkEsNERBZUM7O0FBcENELHdFQUFpQztBQU9qQyxpREFBd0M7QUFDeEMsbURBQTZDO0FBRTdDLHVEQUE0QjtBQUM1Qix5REFBOEI7QUFDOUIsMERBQStCO0FBRS9COzs7Ozs7R0FNRztBQUNILFNBQWdCLHdCQUF3QixDQUN0QyxPQUE0QixFQUM1QiwyQkFBc0QsRUFBRSxFQUN4RCx1QkFBa0QsRUFBRTtJQUVwRCxNQUFNLE1BQU0sR0FBRyxJQUFBLDJCQUFXLEVBQUMsT0FBTyxFQUFFLHdCQUF3QixDQUFDLENBQUE7SUFDN0QsTUFBTSxPQUFPLEdBQUcsb0JBQW9CLENBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUE7SUFDOUQsTUFBTSxlQUFlLEdBQXFDLE1BQU0sQ0FBQyxXQUFXLENBQzFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQ3BCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQztTQUMzQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBeUIsQ0FBQyxDQUFDLENBQzVELENBQUE7SUFDRCxNQUFNLElBQUksR0FBRyxJQUFBLHNCQUFPLEVBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFBO0lBRTdDLE9BQU8sSUFBQSxzQkFBTSxFQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFBO0FBQzNDLENBQUMifQ==