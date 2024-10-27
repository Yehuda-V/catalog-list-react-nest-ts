export enum Modes {
  edit = "edit",
  create = "create",
}
  

export enum Verticals {
  general = "general",
  fashion = "fashion",
  home = "home",
}

export type Dialog = {
  mode: keyof typeof Modes;
  catalog?: Catalog ;
  handleClick: (props: Request) => void;
};

export type Catalog = {
  id?: number;
  name: string;
  vertical: keyof typeof Verticals;
  is_primary: boolean;
  locales: string[];
  indexed_at: string;
  };
  

export type Request = {
  id?: number;
  name?: string;
  vertical?: keyof typeof Verticals;
  isPrimary: boolean;
  localesId: string[];
  startIndexing?: boolean;
};
