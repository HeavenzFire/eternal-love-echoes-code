import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Beta-namespace typed wrapper for supabase.auth.oauth.
type OAuthClient = { name?: string; client_name?: string; redirect_uri?: string; redirect_uris?: string[] };
type OAuthDetails = {
  client?: OAuthClient;
  scope?: string;
  scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthResult<T> = { data: T | null; error: { message: string } | null };
interface OAuthNamespace {
  getAuthorizationDetails(id: string): Promise<OAuthResult<OAuthDetails>>;
  approveAuthorization(id: string): Promise<OAuthResult<OAuthDetails>>;
  denyAuthorization(id: string): Promise<OAuthResult<OAuthDetails>>;
}
function oauth(): OAuthNamespace {
  return (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;
}

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("No redirect returned by the authorization server.");
    }
    window.location.href = target;
  }

  const clientName = details?.client?.client_name ?? details?.client?.name ?? "an app";
  const scopes = details?.scopes ?? (details?.scope ? details.scope.split(/\s+/).filter(Boolean) : []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/10 p-4">
      <Card className="w-full max-w-md p-8 backdrop-blur-xl border-primary/20">
        {error && (
          <>
            <h1 className="text-xl font-semibold mb-2">Authorization error</h1>
            <p className="text-sm text-muted-foreground">{error}</p>
          </>
        )}
        {!error && !details && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!error && details && (
          <>
            <h1 className="text-2xl font-bold mb-1">Connect {clientName} to Syntropic Reality Compiler</h1>
            <p className="text-sm text-muted-foreground mb-4">
              This lets {clientName} use this app as you. It does not bypass app permissions.
            </p>
            {scopes.length > 0 && (
              <div className="mb-6 p-3 rounded-md bg-muted/40 text-sm">
                <div className="font-medium mb-1">Requested access</div>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {scopes.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-2">
              <Button className="flex-1" disabled={busy} onClick={() => decide(true)}>
                Approve
              </Button>
              <Button className="flex-1" variant="outline" disabled={busy} onClick={() => decide(false)}>
                Deny
              </Button>
            </div>
          </>
        )}
      </Card>
    </main>
  );
}
