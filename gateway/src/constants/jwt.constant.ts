import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const JwtConstants = {
  SECRET: process.env.JWT_SECRET || 'camerajwt', // Load directly from process.env (or use ConfigService as shown in the next step)
  signOptions: {
    expiresIn: '7d', // Hardcoded for now, or load from process.env if needed
  },
};

export const skip_auth="skip_auth"

export const TOKEN_NAME = "Access Token";
export const AUTH_OPTIONS:SecuritySchemeObject = {
	type: "http",
	scheme: "bearer",
	bearerFormat: "Bearer",
};