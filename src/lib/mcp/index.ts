import { auth, defineMcp } from "@lovable.dev/mcp-js";
import echoTool from "./tools/echo";
import whoamiTool from "./tools/whoami";
import syntropicScanTool from "./tools/syntropic-scan";

// Supabase project ref is inlined at build time by Vite. Fallback keeps the
// module import-safe during manifest extraction where a token never verifies.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "syntropic-reality-mcp",
  title: "Syntropic Reality Compiler MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Syntropic Reality Compiler. Use `echo` to verify connectivity, `whoami` to confirm the signed-in user, and `syntropic_scan` to run a resonance scan over an intent phrase.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [echoTool, whoamiTool, syntropicScanTool],
});
