export interface SidedrawerProps {
  open: boolean;
  toggleDrawer: Function;
  handleFilterChange: Function;
}

export interface HeaderProps {
  handleMenuClick: (data: boolean) => void;
  handleChange: (data: string) => void;
}

export interface ArticleProps {
  source: {
    id: number;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface CardActionProps {
  data: ArticleProps | undefined;
}

export interface SearchboxProps {
  handleChange: (value: string) => void;
}

export interface NYTimesProps {
  headline: { main: string };
  lead_paragraph: string;
  snippet: string;
  web_url: string;
  pub_date: string;
}

export interface GuardianApiProps {
  webTitle: string;

  webUrl: string;
  webPublicationDate: string;
}
