import type { AuthObject } from "@clerk/express";

// ✅ Tell TypeScript about req.auth from Clerk middleware
declare global {
  namespace Express {
    interface Request {
      auth?: AuthObject;
    }
  }

  // ✅ Custom claims (already correct — keep this)
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin";
    };
  }
}

export {};
