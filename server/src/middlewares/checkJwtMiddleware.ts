import { auth } from "express-oauth2-jwt-bearer";
import config from "../config/config";

export const checkJwtMiddleware = auth({
    audience: config.auth.audience,
    issuerBaseURL: config.auth.issuer
});