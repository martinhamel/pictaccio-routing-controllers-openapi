"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRoutes = parseRoutes;
/**
 * Parse routing-controllers metadata into an IRoute objects array.
 */
function parseRoutes(storage, options = {}) {
    return storage.actions.map((action) => ({
        action,
        controller: storage.controllers.find((c) => c.target === action.target),
        options,
        params: storage
            .filterParamsWithTargetAndMethod(action.target, action.method)
            .sort((a, b) => a.index - b.index),
        responseHandlers: storage.filterResponseHandlersWithTargetAndMethod(action.target, action.method),
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VNZXRhZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZU1ldGFkYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBd0JBLGtDQWtCQztBQXJCRDs7R0FFRztBQUNILFNBQWdCLFdBQVcsQ0FDekIsT0FBNEIsRUFDNUIsVUFBcUMsRUFBRTtJQUV2QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLE1BQU07UUFDTixVQUFVLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ2xDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQ1I7UUFDM0IsT0FBTztRQUNQLE1BQU0sRUFBRSxPQUFPO2FBQ1osK0JBQStCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQzdELElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNwQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMseUNBQXlDLENBQ2pFLE1BQU0sQ0FBQyxNQUFNLEVBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FDZDtLQUNGLENBQUMsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyJ9