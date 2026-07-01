export interface RequestUserContext {
  id: string;
  username?: string;
  email?: string;
  fullName?: string;
  roles: string[];
  permissions: string[];
}

export interface RequestOrganizationContext {
  companyId?: string;
  branchId?: string;
}

export interface RequestMetadata {
  requestId?: string;
  correlationId?: string;
  ipAddress?: string;
  userAgent?: string;
  method?: string;
  path?: string;
}

export interface RequestContext {
  user?: RequestUserContext;
  organization: RequestOrganizationContext;
  metadata: RequestMetadata;
}

export interface RequestWithContextUser {
  user?: Partial<RequestUserContext>;
  headers: Record<string, string | string[] | undefined>;
  ip?: string;
  method?: string;
  originalUrl?: string;
  url?: string;
}
