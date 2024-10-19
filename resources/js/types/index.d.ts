export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
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
