export type TUser = "admin" | "user";
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: TUser;
    password: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export type PaginationResponse<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{ url: string | null; label: string; active: boolean }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

export interface Notification {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: number;
    data: NotificationData;
    read_at: null;
    created_at: Date;
    updated_at: Date;
}

export interface NotificationData {
    title: string;
    message: string;
    data: DataData;
}

export interface DataData {
    feature_link: string;
}
