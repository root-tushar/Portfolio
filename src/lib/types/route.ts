// Types for route parameters and query parameters
export interface RouteParams {
  slug?: string
  id?: string
}

// Types for page props
export interface PageProps<T = RouteParams> {
  params: T
  searchParams?: { [key: string]: string | string[] | undefined }
}

// Types for dynamic segments
export interface DynamicSegment {
  params: RouteParams
}
