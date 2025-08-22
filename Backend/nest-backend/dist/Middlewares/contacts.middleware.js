"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsContactEditorType = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
class IsContactEditorType {
    use(req, res, next) {
        console.log('Inside middleware!');
        if (!req.headers.authorization)
            throw new jsonwebtoken_1.JsonWebTokenError('Token not found!');
        const token = req.headers.authorization.split(' ')[1];
        const payload = jsonwebtoken_2.default.decode(token);
        if (payload.role == 'Editor') {
            next();
        }
        throw new common_1.UnauthorizedException('You are not an editor!');
    }
}
exports.IsContactEditorType = IsContactEditorType;
//# sourceMappingURL=contacts.middleware.js.map