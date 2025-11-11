declare module "jquery.ripples" {
  interface RipplesOptions {
    resolution?: number;
    perturbance?: number;
    dropRadius?: number;
    interactive?: boolean;
  }

  interface JQuery {
    ripples(options: RipplesOptions | string): JQuery;
  }
}
