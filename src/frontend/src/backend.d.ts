import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface SiteContent {
    businessHours: BusinessHours;
    aboutHeading: string;
    heroHeading: string;
    servicesDescription: string;
    servicesHeading: string;
    contactSubheading: string;
    contactHeading: string;
    heroSubheading: string;
    aboutDescription: string;
}
export interface ContactInquiry {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
}
export interface BusinessHours {
    hours: string;
    days: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createInquiry(name: string, email: string, message: string): Promise<void>;
    getAllInquiries(): Promise<Array<ContactInquiry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInquiry(id: bigint): Promise<ContactInquiry | null>;
    getSiteContent(): Promise<SiteContent>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateSiteContent(newContent: SiteContent): Promise<void>;
}
