export function sanitizeBrokerSearchParams(
  params: URLSearchParams
): URLSearchParams {
  const safeParams = new URLSearchParams();
  const allowedKeys = new Set([
    'firstName',
    'lastName',
    'brokerCompanyName',
    'email',
    'clientRef',
    'export'
  ]);

  for (const [key, value] of params.entries()) {
    if (allowedKeys.has(key) && value.trim() !== '') {
      safeParams.set(key, value);
    }
  }

  return safeParams;
}

export function buildSafeBrokerSearchPath(
  pathname: string,
  params: URLSearchParams
): string {
  const internalPath = '/admin/brokers/search';
  const safePathname = (() => {
    try {
      const candidate = new URL(pathname, 'http://localhost');
      if (
        candidate.origin === 'http://localhost' &&
        (candidate.pathname === internalPath || candidate.pathname === '/')
      ) {
        return candidate.pathname;
      }
    } catch {
      // ignore invalid pathname values
    }

    return internalPath;
  })();

  const safeParams = sanitizeBrokerSearchParams(params);
  const query = safeParams.toString();
  return query ? `${safePathname}?${query}` : safePathname;
}
