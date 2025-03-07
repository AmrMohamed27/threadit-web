import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Handles file uploads
export const { GET, POST } = createRouteHandler({ router: ourFileRouter });
