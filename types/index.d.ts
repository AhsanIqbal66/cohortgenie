export type RegularPage = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
  };
  content: string;
  slug?: string;
};

export type AuthResponse = {
  data: any;
  [key: string]: any;
};

export interface Category {
  id?: string;
  name?: string;
  data?: any;
}

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    author: string;
    tags: string[];
    date?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
};

export type Author = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    social: [
      {
        name: string;
        icon: string;
        link: string;
      },
    ];
  };
  content?: string;
  slug?: string;
};

export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string;
};

export type Call_to_action = {
  enable?: boolean;
  title: string;
  description: string;
  image: string;
  button: Button;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

// this type is for input field
export type InputFieldProps = {
  type: string;
  name: string;
  placeholder?: string;
  box?: boolean;
  style?: string;
  label?: string;
  isLargeLabel?: boolean;
  disabled?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  id?: string;
  icon?: any;
  inputOuterHolderClassName?: string;
  readOnly?: boolean;
  textareaClass?: string;
  className?: any;
  passwordicon?: any;
  min?: any;
  onBlur?: (event: React.FocusEvent<any>) => void;
};

// onboarding Clients
export interface Client {
  id: string;
  clientName: string;
  storeName: string;
  storeType: string;
  status: string;
  createdAt: string;
  lastUpdate: string;
  email?: string;
  contactNo?: string;
  driverLicense?: string;
  einNo?: string;
  entityName?: string;
  onboardingStatus?: string;
  ecomRegistration?: string;
  documents?: Document[];
  comments?: Comment[];
}

export interface Document {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  icon?: any;
  inputOuterHolderClassName?: string;
}

// onboarding Clients
export interface Client {
  id: string;
  clientName: string;
  storeName: string;
  storeType: string;
  status: string;
  createdAt: string;
  lastUpdate: string;
  email?: string;
  contactNo?: string;
  driverLicense?: string;
  einNo?: string;
  entityName?: string;
  onboardingStatus?: string;
  ecomRegistration?: string;
  documents?: Document[];
  comments?: Comment[];
}

export interface Document {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}
//
export interface SlideItem {
  img: StaticImageData;
  title: string;
  desc: string;
}
export interface Stat {
  id: number;
  title: string;
  value: string;
  label: string;
  growth: string;
  icon: JSX.Element;
  fillIcon: JSX.Element;
  subLabel?: string;
}
