declare module "jquery.ripples" {
  interface JQuery {
    ripples(options?: {
      resolution?: number;
      perturbance?: number;
      interactive?: boolean;
      crossOrigin?: string;
    }): JQuery;
    ripples(method: "destroy" | "drop" | "pause" | "play" | "hide" | "show" | "set", ...args: any[]): JQuery;
  }
}

declare module "jquery" {
  interface JQuery {
    ripples(options?: {
      resolution?: number;
      perturbance?: number;
      interactive?: boolean;
      crossOrigin?: string;
    }): JQuery;
    ripples(method: "destroy" | "drop" | "pause" | "play" | "hide" | "show" | "set", ...args: any[]): JQuery;
  }
}
