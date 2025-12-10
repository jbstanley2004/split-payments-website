
query_params = {"per_page": "100"}
dns_records, error_dns = proxy_execute("GET", "/zones/aaa60e1480a0ce6e76838261cfd51e6f/dns_records", "cloudflare", query_params=query_params)
print(f"DNS Records fetch error: {error_dns}")
print(f"DNS Records: {dns_records}")

ssl_setting, error_ssl = proxy_execute("PATCH", "/zones/aaa60e1480a0ce6e76838261cfd51e6f/settings/ssl", "cloudflare", body={"value": "strict"})
print(f"SSL Update error: {error_ssl}")
print(f"SSL Update Result: {ssl_setting}")

minify_setting, error_minify = proxy_execute("PATCH", "/zones/aaa60e1480a0ce6e76838261cfd51e6f/settings/minify", "cloudflare", body={"value": {"css": "on", "html": "on", "js": "on"}})
print(f"Minify Update error: {error_minify}")
print(f"Minify Update Result: {minify_setting}")

output = {
    "dns_status": "fetched" if not error_dns else "failed",
    "ssl_status": "updated" if not error_ssl else "failed",
    "minify_status": "updated" if not error_minify else "failed"
}
output
